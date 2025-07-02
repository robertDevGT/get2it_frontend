import { requestConfirmationCode } from "@/api/AuthAPI";
import ErrorMessage from "@/components/Error";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function RequestCode() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<{ email: string }>();

  const { mutate, isPending } = useMutation({
    mutationFn: requestConfirmationCode,
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
    }
  });

  const onSubmit = (data: { email: string }) => mutate({ email: data.email });
  return (
    <>
      <h1 className="font-medium capitalize text-center text-xl">Solicitar nuevo código</h1>
      <form className="flex flex-col gap-2 space-y-5 w-2/4 shadow p-10 mt-2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-semibold text-[#2E4053]">
            Email:
          </label>
          <input
            {...register("email", {
              required: "El Email obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
            id="email"
            type="text"
            placeholder="Dirección de email"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B463] focus:border-[#28B463] transition duration-200"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <button type="submit" disabled={isPending} className=" bg-green-500 text-white font-bold p-1 rounded hover:bg-green-800 transition-colors cursor-pointer">
          {isPending ? <p>Cargando...</p> : <p>Enviar instrucciones</p>}
        </button>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/register'}
          className="text-center  font-normal"
        >
          ¿Aún no tienes una cuenta? Crea Una
        </Link>

        <Link
          to={'/login'}
          className="text-center  font-normal"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  )
}
