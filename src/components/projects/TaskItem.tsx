import { TaskProject } from "@/types/taskTypes";
import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
    task: TaskProject;
}

const statusStyles: Record<string, string> = {
    pending: "border-l-slate-500",
    onHold: "border-l-red-500",
    InProgress: "border-l-blue-500",
    underReview: "border-l-amber-500",
    completed: "border-l-emerald-500",
};

export default function TaskItem({ task }: Props) {
    const navigate = useNavigate();

    return (
        <li onClick={() => navigate(location.pathname + `?taskId=${task.id}`)} className={`border-l-4 p-3 ${statusStyles[task.status]} rounded shadow-sm hover:shadow-md transition duration-200 bg-gray-50 flex justify-between`}>
            <div>
                <p className="text-sm text-gray-800">{task.description} </p>
                <span className="text-xs text-gray-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                </span>

            </div>
            {task.assignee ? (
                <div className="w-6 h-6">
                    <img
                        src={`${import.meta.env.VITE_UPLOADS_URL}/${task.assignee.profileImg}`}
                        alt="Imagen de perfil"
                        className="object-cover rounded-xl"
                    />
                </div>
            ) : (
                <UserIcon />
            )}

        </li>
    );
}
