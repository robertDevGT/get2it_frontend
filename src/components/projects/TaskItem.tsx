import { Task } from "@/types/taskTypes";

type Props = {
    task: Task
}

export default function TaskItem({task} : Props) {
    return (
        <li className="border p-3 rounded shadow-sm hover:shadow-md transition duration-200 bg-gray-50">
            <p className="text-sm text-gray-800">{task.description}</p>
            <span className="text-xs text-gray-400">
                {new Date(task.createdAt).toLocaleDateString()}
            </span>
        </li>
    );
}
