import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { Token } from "types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { enqueueSnackbar } from "notistack";

export default function ConfirmAccount() {
    const navigate = useNavigate();
    const [token, setToken] = useState<Token['token']>('');

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
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

    const handleChange = (token: Token['token']) => {
        setToken(token);
    }

    const handleComplete = (token: Token['token']) => {
        mutate(token);
    }

    return (
        <>
            <div className="flex flex-col gap-2 space-y-5 w-2/4 shadow p-10 mt-2 mx-auto text-center">
                <h1 className="text-5xl font-black ">Confirma tu Cuenta</h1>
                <p className="text-2xl font-light  mt-5">
                    Ingresa el código que recibiste {''}
                    <span className=" text-green-500 font-bold"> por e-mail</span>
                </p>
                <form className="space-y-5">
                    <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>
                    <div className="flex justify-center gap-5">
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        </PinInput>
                    </div>

                </form>

                <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                        to='/auth/request-code'
                        className="text-center text-green-600 font-normal"
                    >
                        Solicitar un nuevo código
                    </Link>
                </nav>
            </div>
        </>
    )
}