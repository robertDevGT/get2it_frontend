import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/api/ProjectsAPI";
import { enqueueSnackbar } from "notistack";
import Modal from "../Modal";


export default function ModalDeleteProject() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = queryParams.get('projectId')!;
    const open = projectId ? true : false;

    const [word, setWord] = useState<string>('');

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const disabled = useMemo(() => word !== 'DELETE', [word]);

    const { mutate, isPending } = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: 'error',
                autoHideDuration: 3000
            });
        },
        onSuccess: (data) => {
            enqueueSnackbar(data, {
                variant: 'success',
                autoHideDuration: 3000
            });

            queryClient.invalidateQueries({ queryKey: ['projects'] });
            navigate('/projects', { replace: true });

        }
    });

    const handleCloseModal = () => {
        navigate(location.pathname, { replace: true });
    }

    const handleDeleteProject = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (word === 'DELETE') {
            mutate({ projectId: Number(projectId) });
        }
    }
    return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Eliminar Proyecto" color="bg-red-600">
            <div className="p-8 bg-white rounded-2xl space-y-6">
                <h2 className="text-center">Si quieres eliminar el proyecto escribe la palabra <span className="text-red-500 font-extrabold">DELETE</span></h2>
                <p className="text-xs text-center font-bold text-gray-500">Todos los registros relacionados al proyecto serán eliminados (colaboradores, tareas y estadisticas) </p>
                <form className="space-y-5" onSubmit={(e) => handleDeleteProject(e)}>
                    <input
                        onChange={(e) => setWord(e.target.value)}
                        type="text"
                        placeholder="Ingresa palabra"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:red-blue-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
                    />
                    <button disabled={disabled} type="submit" className={`${disabled ? 'cursor-not-allowed bg-red-600/30' : 'bg-red-500  hover:bg-red-600 cursor-pointer'} w-full font-bold p-2 rounded  text-white uppercase text-xs`}>
                        {isPending ? <p>Eliminando...</p> : <p>Eliminar Proyecto</p>}
                    </button>
                </form>
            </div>
        </Modal>
    )
}
