import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DraftTask } from "@/types/taskTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/TasksAPI";
import { enqueueSnackbar } from "notistack";
import Modal from "../Modal";
import ErrorMessage from "../Error";

export default function ModalCreateTask() {
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId!!;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modal = queryParams.get('newTask');
    const open = modal ? true : false;


    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: createTask,
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

            queryClient.invalidateQueries({ queryKey: ["getProjectById", projectId] });
            navigate(location.pathname, { replace: true });
        }
    });

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<DraftTask>();



    const handleCloseModal = () => {
        navigate(location.pathname, { replace: true });
    }

    const onSubmit = (formData: DraftTask) => mutate({ formData, projectId: Number(projectId) });

    return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Crear Tarea">
            <div className="p-10">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <input
                            {...register('description', {
                                required: 'La descripción de la tarea es requerida'
                            })}
                            type="text"
                            placeholder="Descripción de la tarea"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                        />

                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </div>

                    <div className="flex justify-end">
                        <button disabled={isPending} className="w-1/3 font-bold p-2 rounded bg-green-500 hover:bg-green-600 text-white uppercase cursor-pointer text-xs">
                            {isPending ? <p>Cargando...</p> : <p>Crear Tarea</p>}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>

    );
}
