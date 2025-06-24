import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/Sidebar";

export default function AuthLayout() {
  const { data, isLoading } = useAuth();

  if (isLoading) return <p className="text-center py-10">Cargando...</p>;

  if (data) return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden lg:flex w-auto bg-gray-800 text-white flex-shrink-0 h-screen">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white scrollbar-hide">
          <div className="container mx-auto px-4">
            <div className="mt-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
