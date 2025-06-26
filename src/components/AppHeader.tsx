import { ClipboardIcon, HouseIcon } from "lucide-react";
import Logo from "./Logo";
import NavLinkComponent from "./NavLinkComponent";

export default function AppHeader() {
    return (
        <div className="p-2 flex justify-between items-center shadow">
            <Logo width={120} height={50} />

            <nav className="flex">
                <NavLinkComponent url="/dashboard" text="">
                    <HouseIcon />
                </NavLinkComponent>

                <NavLinkComponent url="/projects" text="">
                    <ClipboardIcon />
                </NavLinkComponent>
            </nav>
        </div>
    )
}
