import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { statusTranslations } from '@/locales/es';
import { Task } from '@/types/taskTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeTaskStatus } from '@/api/TasksAPI';
import { enqueueSnackbar } from 'notistack';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type Props = {
    task: Task;
}

const statusStyles: Record<string, string> = {
    pending: "bg-slate-500",
    onHold: "bg-red-500",
    InProgress: "bg-blue-500",
    underReview: "bg-amber-500",
    completed: "bg-emerald-500",
};

const statuses: string[] = [
    'pending',
    'onHold',
    'InProgress',
    'underReview',
    'completed',
]


export default function ModalStatusView({ task }: Props) {
    const { projectId } = useParams<{ projectId: string }>();
    const { data: user } = useAuth();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId')!;

    const querClient = useQueryClient();

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

            querClient.invalidateQueries({ queryKey: ['getTaskById', taskId] });
            querClient.invalidateQueries({ queryKey: ['getProjectTasks', projectId] });
        }
    });
    if (user) return (
        <Popover className="relative">
            <Popover.Button>
                <div>
                    <span className="font-medium text-gray-600">Estado:</span>{" "}
                    <span
                        className={`px-2 py-1 text-sm text-white font-bold ${statusStyles[task.status]} cursor-pointer opacity-75`}
                    >
                        {statusTranslations[task.status]}
                    </span>
                </div>
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
                <Popover.Panel className="absolute z-50 mt-2 w-64">
                    <div className="rounded-lg bg-white p-4 shadow-xl ring-1 ring-gray-200 flex flex-col gap-2">
                        {statuses.map(status => (
                            <div key={status} className={`px-2 py-1 text-sm  text-white font-bold ${statusStyles[status]} cursor-pointer hover:opacity-75`} onClick={() => mutate({ taskId: Number(taskId), status })}>
                                <span>
                                    {statusTranslations[status]}
                                </span>
                            </div>
                        ))}
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
