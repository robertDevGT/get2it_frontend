import { statusTranslations } from "@/locales/es";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "../projects/TaskItem";
import { TaskProject } from "@/types/taskTypes";


type Props = {
    status: TaskProject['status'],
    tasks: TaskProject[]
}


export const statusStyles: Record<string, string> = {
    pending: "border-t-slate-500",
    onHold: "border-t-red-500",
    InProgress: "border-t-blue-500",
    underReview: "border-t-amber-500",
    completed: "border-t-emerald-500",
};


export default function DropTask({ status, tasks }: Props) {

    const { isOver, setNodeRef } = useDroppable({
        id: status
    });

    const style = {
        opacity: isOver ? 0.4 : undefined
    }

    return (
        <div style={style} ref={setNodeRef} key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]} `}
            >{statusTranslations[status]}</h3>

            <div className="mt-5 space-y-3 p-3">
                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center pt-3">No hay tareas</p>
                ) : (
                    tasks.map((task) => <TaskItem key={task.id} task={task} />)
                )}
            </div>
        </div>
    )
}
