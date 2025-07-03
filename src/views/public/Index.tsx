import MainCard from "@/components/MainCard";
import { useStore } from "@/store";
import { Link } from "react-router-dom";

export default function Index() {
  const logedIn = useStore(state => state.logedIn);

  return (
    <div className="text-center space-y-5 p-10">
      <section>
        <div className="mb-5">
          <h1 className="text-4xl font-extrabold">Haz tus proyectos realidad</h1>
          <p>Organízate y gestiona tus tareas de forma eficiente con equipos, roles y seguimiento de progreso.</p>
        </div>

        {logedIn ? (
          <Link
            to="/dashboard"
            className="bg-green-500 text-white font-bold p-2 rounded hover:bg-green-800 transition-colors cursor-pointer"
          >
            ¡Empieza creando un proyecto!
          </Link>
        ) : (
          <Link
            to="/register"
            className="bg-green-500 text-white font-bold p-2 rounded hover:bg-green-800 transition-colors cursor-pointer"
          >
            Crea tu cuenta para empezar o inicia sesión
          </Link>
        )}
      </section>

      <main className="lg:p-10 flex gap-5 flex-col lg:flex-row">
        <MainCard
          title="Gestiona tus proyectos"
          content="Crea proyectos, define objetivos y mantén a tu equipo alineado en cada etapa del desarrollo."
        />
        <MainCard
          title="Organiza tus tareas"
          content="Divide tu trabajo en tareas, asigna responsables y establece fechas de vencimiento."
        />
        <MainCard
          title="Colabora en equipo"
          content="Invita a tu equipo, asigna roles y colabora en tiempo real con actualizaciones automáticas."
        />
      </main>
    </div>
  );
}
