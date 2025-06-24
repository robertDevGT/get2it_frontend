import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
    return (
        <div className="p-2 flex justify-between items-center shadow">
            <Logo />

            <nav className="p-2 flex gap-2">
                <Link to={'/login'} className="border p-2 border-gray-300 rounded shadow">
                    <p className="font-medium">Iniciar Sesión</p>
                </Link>

                <Link to={'/register'} className="border p-2 border-gray-300 rounded shadow">
                    <p className="font-medium">Crear Cuenta</p>
                </Link>
            </nav>
        </div>
    )
}
