import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { useState } from "react";
import NewPasswordForm from "./NewPasswordForm";

export default function NewPassword() {

    const [token, setToken] = useState<string>('');
    const [isValidToken, setIsValidToken] = useState<boolean>(false);

    return (
        <>

            {!isValidToken ? (
                <>
                    <h1 className="font-medium text-center text-xl">Ingresa el token que recibiste por email: </h1>
                    <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
                </>

            ) : <NewPasswordForm token={token}/>}

        </>
    )
}
