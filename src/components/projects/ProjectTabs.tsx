import { ListOrdered, Users } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';

export default function ProjectTabs() {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <div className='mt-10'>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <NavLink
                            to={`/projects/${projectId}`}
                            className={({ isActive }) => `border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium gap-2 ${isActive ? "text-green-500" : ""}`}
                        >
                            <ListOrdered />
                            <span>Tareas Proyecto</span>
                        </NavLink>

                        <NavLink
                            to={`/projects/team/${projectId}`}
                            className={({ isActive }) => `border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium gap-2 ${isActive ? "text-green-500" : ""}`}
                        >
                            <Users />
                            <span>Team</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    )
}