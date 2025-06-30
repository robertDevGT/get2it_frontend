import { getAllProjects } from "@/api/ProjectsAPI";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, SearchIcon, TrashIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ChangeEvent, FormEvent, useState } from "react";
import ModalDeleteProject from "@/components/modals/ModalDeleteProject";
import ProjectDashboardComponent from "@/components/projects/ProjectDashboardComponent";

type ProjectFilters = {
    projectName: string;
}

const initialValues: ProjectFilters = {
    projectName: ''
}

export default function IndexProjects() {

    const { data: user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams(initialValues);
    const [inputValue, setInputValue] = useState<string>(searchParams.get("projectName") ?? "");

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projects', searchParams.get('projectName')],
        queryFn: () => getAllProjects({ projectName: searchParams.get('projectName') ?? '' })
    });

    const handleSearchProject = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleSetFilters = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchParams(inputValue ? { projectName: inputValue } : {});
    };

    const handleClearFilters = () => {
        setSearchParams({});
        setInputValue('');
    }

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

            <div className="mt-5 flex gap-5">
                <form className="w-full flex gap-2" onSubmit={handleSetFilters}>
                    <input
                        type="text"
                        onChange={handleSearchProject}
                        value={inputValue}
                        placeholder="Nombre del proyecto"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                    />

                    <button className="bg-green-500 rounded p-2 cursor-pointer hover:bg-green-600 transition-colors" type="submit">
                        <SearchIcon className="text-white" />
                    </button>

                </form>
                <button className="bg-red-500 rounded p-2 cursor-pointer hover:bg-red-600 transition-colors" onClick={() => handleClearFilters()}>
                    <TrashIcon className="text-white" />
                </button>
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
