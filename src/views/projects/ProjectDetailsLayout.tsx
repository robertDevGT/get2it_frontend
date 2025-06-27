import { PlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectsAPI";
import ProjectTabs from "@/components/projects/ProjectTabs";

type Props = {
    children: React.ReactNode
}

export default function ProjectDetailsLayout({ children }: Props) {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const { data: project, isLoading, isError } = useQuery({
        queryKey: ["getProjectById", projectId],
        queryFn: () => getProjectById(Number(projectId)),
        enabled: !!projectId,
    });

    if (isLoading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (isError) return <p>Error al cargar el contenido</p>
    if (project) return (
        <div className="bg-white rounded-lg mt-10 space-y-6 mx-auto">
            <div className="pb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    {project.projectName}
                </h1>

                <div className="flex justify-between">
                    <p className="mt-2 text-gray-600">{project.description}</p>
                    <div className="flex gap-2">
                        <button onClick={() => navigate(location.pathname + '?newTask=true')} className="bg-green-500 p-2 text-white font-bold hover:bg-green-600 transition-colors rounded flex gap-2 cursor-pointer">
                            <PlusIcon />
                            <p>Crear Tarea</p>
                        </button>
                    </div>
                </div>
                <ProjectTabs />
            </div>

            <section>
                {children}
            </section>
        </div>
    );
}
