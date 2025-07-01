import { ClipboardIcon, UserIcon } from "lucide-react";
import { useStore } from "@/store";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import NavLinkComponent from "./NavLinkComponent";

export default function AppHeader() {
    const logout = useStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        enqueueSnackbar('Sesión Cerrada Correctamente', {
            variant: "success",
            autoHideDuration: 3000
        });

        navigate('/login');
    }
    return (
        <div className="p-2 flex justify-between items-center shadow sticky top-0 bg-white z-[100]">
            <div className="flex">
                <Logo width={120} height={50} />

                <nav className="flex">
                    <NavLinkComponent url="/projects" text="">
                        <ClipboardIcon />
                    </NavLinkComponent>

                    <NavLinkComponent url="/profile" text="">
                        <UserIcon />
                    </NavLinkComponent>
                </nav>
            </div>

            <button className="bg-green-500 text-white p-2 font-bold rounded hover:bg-green-600 cursor-pointer" onClick={() => handleLogout()}>
                Cerrar Sesión
            </button>

        </div>
    )
}
