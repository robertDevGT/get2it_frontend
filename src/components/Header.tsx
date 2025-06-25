import { Link } from "react-router-dom";
import { useStore } from "@/store";
import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
    const logedIn = useStore((state) => state.logedIn);

    return (
        <div className="p-2 flex justify-between items-center shadow">
            <Logo />

            <nav className="p-2 flex gap-2">
                {logedIn ? (
                    <NavMenu />
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
