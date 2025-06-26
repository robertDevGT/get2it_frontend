import { Task } from "@/types/taskTypes";
import TaskItem from "./TaskItem";
import { statusTranslations } from "@/locales/es";

type Props = {
    status: Task['status'],
    tasks: Task[]
}

const statusStyles: Record<string, string> = {
    pending: "border-t-slate-500",
    onHold: "border-t-red-500",
    inProgress: "border-t-blue-500",
    underReview: "border-t-amber-500",
    completed: "border-t-emerald-500",
};

export default function TaskStatusColumn({ status, tasks }: Props) {
    return (
        <div className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3
                className={`capitalize font-semibold text-sm border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
            >
                {statusTranslations[status]}
            </h3>
            <ul className="mt-5 space-y-3">
                {tasks.length === 0 ? (
                    <li className="text-gray-500 text-center pt-3">No hay tareas</li>
                ) : (
                    tasks.map((task) => <TaskItem key={task.id} task={task} />)
                )}
            </ul>
        </div>
    );
}
