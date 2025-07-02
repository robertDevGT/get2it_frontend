import { updatePasswordWithToken } from "@/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/Error";

type Props = {
    token: string;
}

export default function NewPasswordForm({ token }: Props) {
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm<{ password: string, password_confirmation: string }>();

    const { mutate, isPending } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                autoHideDuration: 3000,
                variant: "error"
            })
        },
        onSuccess: (data) => {
            enqueueSnackbar(data, {
                autoHideDuration: 3000,
                variant: "success"
            })
            navigate('/login');
        }
    });

    const password = watch('password');

    const onSubmit = (formData: { password: string, password_confirmation: string }) => mutate({ token, password: formData.password, password_confirmation: formData.password_confirmation });

    return (
        <>
            <h1 className="font-medium text-center text-xl mt-5">Recupera tu contraseña</h1>
            <form className="flex flex-col gap-2 space-y-5 w-2/4 shadow p-10 mt-2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
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

                <div className="flex flex-col gap-1">
                    <label htmlFor="nombre" className="text-sm font-semibold text-[#2E4053]">
                        Confirma tu Contraseña:
                    </label>
                    <input
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Las contraseñas no son iguales'
                        })}
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirmación de contraseña"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B463] focus:border-[#28B463] transition duration-200"
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>


                <button type="submit" disabled={isPending} className=" bg-green-500 text-white font-bold p-1 rounded hover:bg-green-800 transition-colors cursor-pointer">
                    {isPending ? <p>Cargando...</p> : <p>Cambiar contraseña</p>}
                </button>
            </form>
        </>
    )
}
