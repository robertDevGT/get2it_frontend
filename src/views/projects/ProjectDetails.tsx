import { getProjectTasks } from "@/api/ProjectsAPI";
import { TaskProject } from "@/types/taskTypes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TaskStatusColumn from "@/components/projects/TaskStatusColumn";
import ProjectDetailsLayout from "./ProjectDetailsLayout";

type GroupedTasks = Record<string, TaskProject[]>;

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    InProgress: [],
    underReview: [],
    completed: [],
};

export default function ProjectDetails() {
    const { projectId } = useParams<{ projectId: string }>();

    const { data: tasks, isLoading, isError } = useQuery({
        queryKey: ["getProjectTasks", projectId],
        queryFn: () => getProjectTasks(Number(projectId)),
        enabled: !!projectId,
    });

    const groupedTasks = tasks?.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);


    if (isLoading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (isError) return <p>Error al cargar el contenido</p>
    if (tasks && groupedTasks) return (
        <ProjectDetailsLayout>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Panel de Tareas
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hidden 2xl:overflow-visible pb-10">
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <TaskStatusColumn key={status} status={status} tasks={tasks} />
                ))}
            </div>
        </ProjectDetailsLayout>
    );
}
