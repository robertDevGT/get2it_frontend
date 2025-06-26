import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Footer from "@/components/Footer";
import AppHeader from "@/components/AppHeader";

export default function AuthLayout() {
  const { data, isLoading } = useAuth();

  if (isLoading) return <p className="text-center py-10">Cargando...</p>;

  if (data) return (
    <div className="min-h-screen flex flex-col justify-between">
      <AppHeader />
      <div className="mx-auto w-full p-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
