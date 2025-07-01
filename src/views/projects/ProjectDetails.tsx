import { getProjectTasks } from "@/api/ProjectsAPI";
import { TaskProject } from "@/types/taskTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { changeTaskStatus } from "@/api/TasksAPI";
import { enqueueSnackbar } from "notistack";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import DropTask from "@/components/tasks/DropTask";

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
    const queryClient = useQueryClient();

    const { data: tasks, isLoading, isError } = useQuery({
        queryKey: ["getProjectTasks", projectId],
        queryFn: () => getProjectTasks(Number(projectId)),
        enabled: !!projectId,
    });

    const { mutate } = useMutation({
        mutationFn: changeTaskStatus,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: 'error',
                autoHideDuration: 3000
            })
        },
        onSuccess: (data) => {
            enqueueSnackbar(data, {
                variant: 'success',
                autoHideDuration: 3000
            });

            queryClient.invalidateQueries({ queryKey: ['getProjectTasks', projectId] });
        }
    });

    const groupedTasks = tasks?.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    const handleDragEnd = (e: DragEndEvent) => {
        if (e.over && e.over.id) {
            mutate({ taskId: Number(e.active.id), status: e.over.id.toString() });
        }
    }

    if (isLoading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (isError) return <p>Error al cargar el contenido</p>
    if (tasks && groupedTasks) return (
        <ProjectDetailsLayout>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Panel de Tareas
            </h2>
            <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 scrollbar-hidden border border-gray-200 shadow">
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                       <DropTask key={status} tasks={tasks} status={status}/>
                    ))}
                </DndContext>
            </div>
        </ProjectDetailsLayout>
    );
}
