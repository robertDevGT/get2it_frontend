import { useForm } from "react-hook-form";
import { Auth } from "types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/Error";

export default function Register() {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors }
  } = useForm<Auth>();

  const password = watch('password');

  const { mutate, isPending } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      enqueueSnackbar(error.message, {
        autoHideDuration: 3000,
        variant: "error"
      })
    },
    onSuccess: (data) => {
      enqueueSnackbar(data, {
        autoHideDuration: 3000,
        variant: "info"
      })
      reset();
    }
  });

  const onSubmit = (formData: Auth) => mutate(formData);

  return (
    <>
      <h1 className="font-medium capitalize text-center text-xl">Crea Tu Cuenta</h1>
      <form className="flex flex-col gap-2 space-y-5 w-2/4 shadow p-10 mt-2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-semibold text-[#2E4053]">
            Nombre:
          </label>
          <input
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
            id="name"
            type="text"
            placeholder="Tu nombre"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B463] focus:border-[#28B463] transition duration-200"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-semibold text-[#2E4053]">
            Email:
          </label>
          <input
            {...register("email", {
              required: "El Email de registro es obligatorio",
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
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe tener al menos 8 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                message:
                  "El Password debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
              },
            })}

            id="password"
            type="password"
            placeholder="Tu contraseña"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B463] focus:border-[#28B463] transition duration-200"
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-semibold text-[#2E4053]">
            Confirma tu Contraseña:
          </label>
          <input
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
            id="password_confirmation"
            type="password"
            placeholder="Tu contraseña"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B463] focus:border-[#28B463] transition duration-200"
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>


        <button type="submit" disabled={isPending} className=" bg-green-500 text-white font-bold p-1 rounded hover:bg-green-800 transition-colors cursor-pointer">
          {isPending ? <p>Cargando...</p> : <p>Crear Cuenta</p>}
        </button>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/login'}
          className="text-center  font-normal"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link
          to={'/forgot-password'}
          className="text-center  font-normal"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}
