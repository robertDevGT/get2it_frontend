import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TasksAPI";
import { formatDate } from "@/utils/utils";
import Modal from "../Modal";
import ModalSelectAssigneeView from "../tasks/ModalSelectAssigneeView";
import NotesComponent from "../tasks/NotesComponent";
import ModalStatusView from "../tasks/ModalStatusView";
import { Project } from "@/types/projectTypes";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon } from "lucide-react";

type Props = {
    managerId: Project['managerId'];
}

export default function ModalTaskDetails({ managerId }: Props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId')!;
    const open = taskId ? true : false;

    const { data: user } = useAuth();

    const { data: task } = useQuery({
        queryKey: ['getTaskById', taskId],
        queryFn: () => getTaskById(Number(taskId)),
        enabled: !!taskId
    });

    const navigate = useNavigate();

    const handleCloseModal = () => {
        navigate(location.pathname, { replace: true });
    }


    if (task && user) return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Detalles de Tarea" height="min-h-96">
            <div className="p-8 bg-white rounded-2xl space-y-6">
                <div className="border-b flex justify-between ga">
                    <h2 className="text-2xl font-bold text-gray-800 pb-2">
                        Detalle de la Tarea
                    </h2>

                    <div className="flex gap-2 items-center mb-2">
                        <span className="text-xs text-gray-500">Asignado a: </span>

                        {managerId === user.id ? (
                            <ModalSelectAssigneeView assignee={task.assignee ?? null} />
                        ) :
                            (
                                <>
                                    {task.assignee ? (
                                        <div className="flex gap-2 shadow p-2">
                                            <img
                                                src={`${import.meta.env.VITE_UPLOADS_URL}/${task.assignee.profileImg}`}
                                                alt="Imagen de perfil"
                                                className="w-6 h-6 object-cover rounded-full"
                                            />
                                            <p className="text-sm text-gray-700">{task.assignee.name}</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <UserIcon className="w-5 h-5" />
                                            <p className="text-sm">Sin asignación</p>
                                        </div>
                                    )}
                                </>
                            )

                        }
                    </div>
                </div>

                <div className="space-y-2">
                    <p>
                        <span className="font-medium text-gray-600">Descripción:</span>{" "}
                        <span className="text-gray-800">{task.description}</span>
                    </p>
                    <ModalStatusView task={task} />

                    <p>
                        <span className="font-medium text-gray-600">Creado el:</span>{" "}
                        <span className="text-gray-800">{formatDate(task.createdAt)}</span>
                    </p>
                </div>

                <NotesComponent notes={task.notes} />
            </div>
        </Modal>
    )
}
