import { useForm } from "react-hook-form"
import { DraftProject } from "@/types/projectTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProject } from "@/api/ProjectsAPI";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import ProjectForm from "./ProjectForm";

export default function EditProject() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: project, isLoading, isError } = useQuery({
        queryKey: ["getProjectById", projectId],
        queryFn: () => getProjectById(Number(projectId)),
        enabled: !!projectId,
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm<DraftProject>();

    const { mutate, isPending } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 3000
            })
        },
        onSuccess: (data) => {
            enqueueSnackbar(data, {
                variant: "success",
                autoHideDuration: 3000
            });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            navigate('/projects');
        }

    });

    useEffect(() => {
        if (project) {
            setValue('description', project.description);
            setValue('projectName', project.projectName);
        }
    }, [project]);

    const onSubmit = (data: DraftProject) => mutate({ formData: data, projectId: Number(projectId) });

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Hubo un error al cargar el contenido...</p>
    if (project) return (
        <>
            <h1 className="font-bold text-3xl">Editar Proyecto</h1>

            <form className="w-4/5 mx-auto space-y-5 shadow p-10 mt-10" onSubmit={handleSubmit(onSubmit)}>

                <ProjectForm register={register} errors={errors} />

                <div className="flex justify-end">
                    <button disabled={isPending} className="w-1/3 font-bold p-2 rounded bg-green-500 hover:bg-green-600 text-white uppercase cursor-pointer text-xs">
                        {isPending ? <p>Cargando...</p> : <p>Guardar Cambios</p>}
                    </button>
                </div>
            </form>
        </>
    )
}
