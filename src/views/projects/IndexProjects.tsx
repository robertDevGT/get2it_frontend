import { getAllProjects } from "@/api/ProjectsAPI";
import ProjectDashboardComponent from "@/components/projects/ProjectDashboardComponent";
import { useQuery } from "@tanstack/react-query"

export default function IndexProjects() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects
    });

    if (isError) return <p>Error al cargar el contenido</p>
    if (isLoading) return <p>Cargando...</p>
    if (data) return (
        <div>
            <h1 className="font-bold text-4xl">Mis Proyectos</h1>

            <div className="mt-10">
                {data.map(project => (
                    <ProjectDashboardComponent project={project} />
                ))}
            </div>
        </div>
    )
}
