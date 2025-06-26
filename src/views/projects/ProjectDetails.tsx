import { getProjectById } from "@/api/ProjectsAPI";
import { Task } from "@/types/taskTypes";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { PlusIcon } from "lucide-react";
import TaskStatusColumn from "@/components/projects/TaskStatusColumn";
import ModalCreateTask from "@/components/modals/ModalCreateTask";

type GroupedTasks = Record<string, Task[]>;

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
};

export default function ProjectDetails() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const { data: project, isLoading, isError } = useQuery({
        queryKey: ["getProjectById", projectId],
        queryFn: () => getProjectById(Number(projectId)),
        enabled: !!projectId,
    });

   const groupedTasks = project?.tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);


    if (isLoading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (isError) return <p>Error al cargar el contenido</p>
    if (project && groupedTasks) return (
        <>
            <div className="bg-white rounded-lg mt-10 space-y-6 mx-auto">
                <div className="border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {project.projectName}
                    </h1>


                    <div className="flex justify-between">
                        <p className="mt-2 text-gray-600">{project.description}</p>

                        <button onClick={() => navigate(location.pathname + '?newTask=true')} className="bg-green-500 p-2 text-white font-bold hover:bg-green-600 transition-colors rounded flex gap-2 cursor-pointer">
                            <PlusIcon />
                            <p>Crear Tarea</p>
                        </button>
                    </div>
                </div>

                <section>
                    <h2 className="text-xl font-semibold text-gray-700">Manager</h2>
                    <p className="text-gray-800">{project.manager.name}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Panel de Tareas
                    </h2>
                    <div className="flex gap-4 overflow-x-auto 2xl:overflow-visible pb-10">
                        {Object.entries(groupedTasks).map(([status, tasks]) => (
                            <TaskStatusColumn key={status} status={status} tasks={tasks} />
                        ))}
                    </div>
                </section>

            </div>
            <ModalCreateTask />
        </>
    );
}
