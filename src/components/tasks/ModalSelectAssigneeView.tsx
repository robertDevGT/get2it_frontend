import { useLocation, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjectTeam } from '@/api/ProjectsAPI';
import { assignCollaboratorToTask } from '@/api/CollaboratorAPI';
import { enqueueSnackbar } from 'notistack';
import { Assignee } from '@/types/collaboratorTypes';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { UserIcon } from 'lucide-react';

type Props = {
    assignee: Assignee | null;
}

export default function ModalSelectAssigneeView({ assignee }: Props) {
    const { projectId } = useParams<{ projectId: string }>()!!;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId')!;

    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['getProjectTeam', projectId],
        queryFn: () => getProjectTeam(Number(projectId)),
    });

    const { mutate } = useMutation({
        mutationFn: assignCollaboratorToTask,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 3000
            });
        },
        onSuccess: (data) => {
            enqueueSnackbar(data, {
                variant: "success",
                autoHideDuration: 3000
            });

            queryClient.invalidateQueries({ queryKey: ['getTaskById', taskId] });
            queryClient.invalidateQueries({ queryKey: ["getProjectTasks", projectId] });
        }
    });

    const handleAssignUser = (id: Assignee['id']) => {
        if (id != assignee?.id) {
            mutate({ taskId: Number(taskId), userId: id });
        }
    }

    if (data) return (
        <Popover className="relative">
            <Popover.Button className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-1 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
                {assignee ? (
                    <div className="flex items-center gap-2">
                        <img
                            src={`${import.meta.env.VITE_UPLOADS_URL}/${assignee.profileImg}`}
                            alt="Imagen de perfil"
                            className="w-6 h-6 object-cover rounded-full"
                        />
                        <p className="text-sm text-gray-700">{assignee.name}</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                        <UserIcon className="w-5 h-5" />
                        <p className="text-sm">Sin asignación</p>
                    </div>
                )}
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-50 mt-2 w-64 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 ">
                    <div className="rounded-lg bg-white p-4 shadow-xl ring-1 ring-gray-200 ">
                        <p className="mb-2 text-sm font-medium text-gray-700">Asignar a:</p>
                        <div className="space-y-2 max-h-32 overflow-y-scroll scrollbar-hidden">
                            {data.map(collaborator => (
                                <button
                                    key={collaborator.id}
                                    onClick={() => handleAssignUser(collaborator.member.id)}
                                    className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 transition"
                                >
                                    <img
                                        src={`${import.meta.env.VITE_UPLOADS_URL}/${collaborator.member.profileImg}`}
                                        alt="Imagen de perfil"
                                        className="w-7 h-7 rounded-full object-cover"
                                    />

                                    <div className='flex flex-col'>
                                        <span className="text-sm text-gray-800">{collaborator.member.name}</span>
                                        <span
                                            className={`mt-2 text-xs p-0.5 rounded-full ${collaborator.role === 1
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-200 text-gray-700'
                                                }`}

                                        >{collaborator.role === 1 ? 'Manager' : 'Colaborador'}</span>

                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}
