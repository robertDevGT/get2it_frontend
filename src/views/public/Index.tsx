import MainCard from "@/components/MainCard";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="text-center space-y-5 p-10">
      <section>
        <div className="mb-5">
          <h1 className="text-4xl font-extrabold">Haz tus proyectos realidad</h1>
          <p>Organizate y empieza a hacer tus proyectos realidad, con equipos y roles</p>
        </div>

        <Link to={'/register'} className=" bg-green-500 text-white font-bold p-2 rounded hover:bg-green-800 transition-colors cursor-pointer">
          Crea tu cuenta para empezar
        </Link>
      </section>

      <main className="p-10 flex gap-5">
        <MainCard title="Titulo Presentación" content="Descripcion de titulo"/>
        <MainCard title="Titulo Presentación" content="Descripcion de titulo"/>
        <MainCard title="Titulo Presentación" content="Descripcion de titulo"/>
      </main>
    </div>
  )
}
