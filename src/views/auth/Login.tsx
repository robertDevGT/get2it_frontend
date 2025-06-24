import ErrorMessage from "@/components/Error";
import { LoginType } from "@/types/authTypes";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const Authenticate = useStore((state) => state.authenticate);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<LoginType>();

  const { mutate, isPending } = useMutation({
    mutationFn: Authenticate,
    onError: (error) => {
      enqueueSnackbar(error.message, {
        autoHideDuration: 3000,
        variant: "error"
      })
    },
    onSuccess: () => {
      enqueueSnackbar('Sesión Iniciada Correctamente', {
        autoHideDuration: 3000,
        variant: "success"
      })
      navigate('/');
    }
  });

  const onSubmit = (formData: LoginType) => mutate(formData);
  return (
    <>
      <h1 className="font-medium capitalize text-center text-xl">Inciar Sesión</h1>
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
            placeholder="Tu email"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B463] focus:border-[#28B463] transition duration-200"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-semibold text-[#2E4053]">
            Contraseña:
          </label>
          <input
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            id="password"
            type="password"
            placeholder="Tu contraseña"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B463] focus:border-[#28B463] transition duration-200"
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <button type="submit" disabled={isPending} className=" bg-green-500 text-white font-bold p-1 rounded hover:bg-green-800 transition-colors cursor-pointer">
          {isPending ? <p>Cargando...</p> : <p>Iniciar Sesión</p>}
        </button>
      </form>
    </>
  )
}
