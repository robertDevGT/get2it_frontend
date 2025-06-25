import { ClipboardList, HouseIcon } from "lucide-react";
import Logo from "./Logo";
import NavLinkComponent from "./NavLinkComponent";

export default function Sidebar() {
  return (

    <div className="h-screen w-56">
      <div className="space-y-4 max-h-screen  overflow-y-auto scrollbar-hide">
        <div>
          <h2 className="mb-2 p-5 text-xl font-semibold tracking-tight">
            Menu
          </h2>
          <nav className="gap-2 flex flex-col w-full">
            <NavLinkComponent url="/dashboard" text="Dashboard">
              <HouseIcon />
            </NavLinkComponent>

            <NavLinkComponent url="/projects" text="Mis Proyectos">
              <ClipboardList />
            </NavLinkComponent>
          </nav>
        </div>
      </div>

      <Logo width={120} height={50} />
    </div>

  );
}
