import { Link } from "react-router-dom";
import { useStore } from "@/store";
import { enqueueSnackbar } from "notistack";
import Logo from "./Logo";
import Tabs from "./Tabs";

export default function Header() {
    const logedIn = useStore((state) => state.logedIn);
    const logout = useStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        enqueueSnackbar('Sesión cerrada correctamente', {
            autoHideDuration: 3000,
            variant: "success"
        })
    }

    return (
        <div className="p-2 flex justify-between items-center shadow">
            <Logo />

            <nav className="p-2 flex gap-2">
                {logedIn ? (
                    <>
                        <Link to={'/login'} className="border p-2 border-gray-300 rounded shadow" onClick={() => handleLogout()}>
                            <p className="font-medium">Cerrar Sesión</p>
                        </Link>
                        <Tabs />
                    </>
                ) : (
                    <>
                        <Link to={'/login'} className="border p-2 border-gray-300 rounded shadow">
                            <p className="font-medium">Iniciar Sesión</p>
                        </Link>

                        <Link to={'/register'} className="border p-2 border-gray-300 rounded shadow">
                            <p className="font-medium">Crear Cuenta</p>
                        </Link>
                    </>
                )}

            </nav>
        </div>
    )
}
