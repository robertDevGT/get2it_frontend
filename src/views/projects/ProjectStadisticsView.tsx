import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectTeamStadistics } from "@/api/ProjectsAPI";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ProjectDetailsLayout from "./ProjectDetailsLayout";

export default function ProjectStadisticsView() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    const { data: stadistics, isLoading, isError } = useQuery({
        queryKey: ['getProjectTeamStadistics', projectId],
        queryFn: () => getProjectTeamStadistics(Number(projectId))
    });

    if (isError) {
        navigate('/404');
        return;
    }
    if (isLoading) return <p>Cargando...</p>;
    if (stadistics) return (
        <ProjectDetailsLayout>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Estadisticas del Equipo

                <div className="mt-10">
                    <BarChart
                        width={1200}
                        height={300}
                        data={stadistics}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tasksCompleted" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    </BarChart>
                </div>
            </h2>
        </ProjectDetailsLayout>
    )
}
