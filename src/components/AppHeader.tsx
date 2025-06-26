import { ClipboardIcon, UserIcon } from "lucide-react";
import Logo from "./Logo";
import NavLinkComponent from "./NavLinkComponent";

export default function AppHeader() {
    return (
        <div className="p-2 flex justify-between items-center shadow sticky top-0 bg-white z-20">
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
    )
}
