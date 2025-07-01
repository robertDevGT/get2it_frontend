import { TaskProject } from "@/types/taskTypes";
import { EyeIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";

type Props = {
    task: TaskProject;
};

const statusStyles: Record<string, string> = {
    pending: "border-l-slate-500",
    onHold: "border-l-red-500",
    InProgress: "border-l-blue-500",
    underReview: "border-l-amber-500",
    completed: "border-l-emerald-500",
};

export default function TaskItem({ task }: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
        data: {
            task,
        },
    });

    const navigate = useNavigate();

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;
        
    return (
        <div
            className={`cursor-pointer border-l-4 p-3 ${statusStyles[task.status]} rounded shadow-sm hover:shadow-md transition duration-200 bg-gray-50 flex justify-between items-center gap-2`}
        >
            <div ref={setNodeRef}
                {...listeners}
                {...attributes}
                style={style}
                className="flex-1 p-0.5 bg-gray-50">
                <p className="text-sm text-gray-800">{task.description}</p>
                <span className="text-xs text-gray-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                </span>
            </div>

            <div className="flex flex-col gap-2">
                {task.assignee?.profileImg ? (
                    <img
                        src={`${import.meta.env.VITE_UPLOADS_URL}/${task.assignee.profileImg}`}
                        alt="Imagen de perfil"
                        className="object-cover rounded-full w-6 h-6"
                    />
                ) : (
                    <UserIcon className="text-gray-400 w-5 h-5" />
                )}

                <EyeIcon className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-900" onClick={() => navigate(location.pathname + `?taskId=${task.id}`)}/>
            </div>
        </div>
    );
}
