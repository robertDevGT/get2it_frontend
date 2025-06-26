import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TasksAPI";
import { formatDate } from "@/utils/utils";
import Modal from "../Modal";
import { statusTranslations } from "@/locales/es";
import NoteComponent from "../notes/NoteComponent";

const statusStyles: Record<string, string> = {
    pending: "bg-slate-500/30",
    onHold: "bg-red-500/30",
    InProgress: "bg-blue-500/30",
    underReview: "bg-amber-500/30",
    completed: "bg-emerald-500/30",
};

export default function ModalTaskDetails() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId')!;
    const open = taskId ? true : false;


    const { data: task } = useQuery({
        queryKey: ['getTaskById', taskId],
        queryFn: () => getTaskById(Number(taskId)),
        enabled: !!taskId
    });

    const navigate = useNavigate();

    const handleCloseModal = () => {
        navigate(location.pathname, { replace: true });
    }


    if (task) return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Detalles de Tarea">
            <div className="p-8 bg-white rounded-2xl shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Detalle de la Tarea
                </h2>

                <div className="space-y-2">
                    <p>
                        <span className="font-medium text-gray-600">Descripción:</span>{" "}
                        <span className="text-gray-800">{task.description}</span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Estado:</span>{" "}
                        <span
                            className={`px-2 py-1 text-sm rounded-full text-white font-bold ${statusStyles[task.status]}`}
                        >
                            {statusTranslations[task.status]}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium text-gray-600">Creado el:</span>{" "}
                        <span className="text-gray-800">{formatDate(task.createdAt)}</span>
                    </p>
                </div>

                {task.notes.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Notas</h3>
                        <div className="space-y-4">
                            {task.notes.map((note) => (
                                <NoteComponent key={note.id} note={note} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}
