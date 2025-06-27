import { getProjectTeam } from "@/api/ProjectsAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addCollaboratorToProject, getCollaboratorByEmail } from "@/api/CollaboratorAPI";
import { CheckIcon } from "lucide-react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import ErrorMessage from "@/components/Error";
import { enqueueSnackbar } from "notistack";

export default function ProjectTeam() {
  const { projectId } = useParams<{ projectId: string }>()!!;

  const { data, refetch } = useQuery({
    queryKey: ['getProjectTeam', projectId],
    queryFn: () => getProjectTeam(Number(projectId)),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<{ email: string }>();

  const mutation = useMutation({ mutationFn: getCollaboratorByEmail });

  const { mutate } = useMutation({
    mutationFn: addCollaboratorToProject,
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
      })
      reset();
      mutation.reset();
      refetch();
    }
  });

  const onSubmit = (data: { email: string }) => {
    mutation.mutate({ email: data.email, projectId: Number(projectId) });
  }
  if (data) return (
    <ProjectDetailsLayout>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Team
      </h2>
      <section className="mt-10 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {data && data.length > 0 ? (
            data.map((member) => (
              <div
                key={member.member.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={`${import.meta.env.VITE_UPLOADS_URL}/${member.member.profileImg}`}
                    alt={`Imagen de ${member.member.name}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{member.member.name}</h3>
                  <p className="text-sm text-gray-500">{member.member.email}</p>
                  <span
                    className={`mt-2 text-xs font-medium px-3 py-1 rounded-full ${member.role === 1
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    {member.role === 1 ? 'Manager' : 'Colaborador'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hay miembros en este equipo.
            </div>
          )}
        </div>
      </section>

      <section className="mt-10 w-2/3 mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Agregar Colaborador
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Correo del usuario:</label>
            <input
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Formato de email inválido'
                }
              })}
              type="text"
              autoComplete="off"
              placeholder="Correo Ej: correo@correo.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />

            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>

          <div className="flex justify-end">
            <button disabled={mutation.isPending} className="w-1/3 font-bold p-2 rounded bg-green-500 hover:bg-green-600 text-white uppercase cursor-pointer text-xs">
              {mutation.isPending ? <p>Cargando...</p> : <p>Buscar</p>}
            </button>
          </div>
        </form>

        <div>
          {mutation.isPending && <p>Cargando...</p>}
          {mutation.data ? (
            <div className="flex w-full gap-2 items-center shadow p-1 mt-5">
              <div className="flex w-full gap-2 items-center">
                <img
                  src={`${import.meta.env.VITE_UPLOADS_URL}/${mutation.data.profileImg}`}
                  alt={`Imagen de ${mutation.data.name}`}
                  className="w-12 h-12 rounded-full object-cover border-4 border-blue-100 shadow"
                />
                <p className="text-xs">{mutation.data.name}</p>
              </div>

              {mutation.data.flag ? (
                <div className="text-xs text-green-600 p-2">
                  <CheckIcon className="w-4 h-4" />
                </div>
              ) : (
                <button
                  className="bg-amber-500 text-xs text-white font-bold rounded p-2"
                  onClick={() => {
                    if (mutation.data?.id) {
                      mutate({ projectId: Number(projectId), userId: mutation.data.id });
                    }
                  }}
                >
                  Añadir
                </button>
              )}

            </div>
          ) : <p className="text-center mt-5">Usuario no encontrado</p>}
        </div>
      </section>
    </ProjectDetailsLayout>
  );
}
