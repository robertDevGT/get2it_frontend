import { getAllProjects } from "@/api/ProjectsAPI";
import ModalDeleteProject from "@/components/modals/ModalDeleteProject";
import ProjectDashboardComponent from "@/components/projects/ProjectDashboardComponent";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function IndexProjects() {

    const { data: user } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects
    });

    if (isError) return <p>Error al cargar el contenido</p>
    if (isLoading) return <p>Cargando...</p>
    if (data && user) return (
        <div className="w-6/7 mx-auto">
            <h1 className="font-bold text-4xl">Mis Proyectos</h1>
            <div className="flex justify-end">
                <Link to={'/projects/create'} className="bg-green-500 p-2 text-white font-bold hover:bg-green-600 transition-colors rounded flex gap-2">
                    <PlusIcon />
                    <p>Crear Proyecto</p>
                </Link>
            </div>

            <div className="mt-10 space-y-5">
                {data.map(project => (
                    <ProjectDashboardComponent key={project.id} project={project} user={user} />
                ))}
            </div>

            <ModalDeleteProject />
        </div>
    )
}
