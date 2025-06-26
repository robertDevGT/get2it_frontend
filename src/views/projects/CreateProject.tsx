import { useForm } from "react-hook-form"
import { DraftProject } from "@/types/projectTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/api/ProjectsAPI";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm"

export default function CreateProject() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<DraftProject>();

  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
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
      navigate('/projects');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const onSubmit = (formData: DraftProject) => mutate(formData);
  return (
    <>
      <h1 className="font-bold text-3xl">Crear Proyecto</h1>

      <form className="w-4/5 mx-auto space-y-5 shadow p-10 mt-10" onSubmit={handleSubmit(onSubmit)}>

        <ProjectForm register={register} errors={errors} />

        <div className="flex justify-end">
          <button disabled={isPending} className="w-1/3 font-bold p-2 rounded bg-green-500 hover:bg-green-600 text-white uppercase cursor-pointer text-xs">
            {isPending ? <p>Cargando...</p> : <p>Crear Proyecto</p>}
          </button>
        </div>
      </form>
    </>
  )
}
