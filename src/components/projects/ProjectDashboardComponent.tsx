import { Project } from "@/types/projectTypes";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MenuIcon } from "lucide-react";
import { formatDate } from "@/utils/utils";
import { User } from "@/types/authTypes";
import { useAuthorization } from "@/hooks/useAuthorization";

type Props = {
    project: Project;
    user: User;
}

export default function ProjectDashboardComponent({ project, user }: Props) {
    const navigate = useNavigate();

    const { data: hasPermission } = useAuthorization({projectId: project.id, userId: user.id, enabled:true});

    return (
        <div className="p-6 bg-white border-l-8 border-green-500 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between">
            <div>
                <Link to={`/projects/${project.id}`} className="text-2xl font-semibold text-gray-800 tracking-tight hover:text-indigo-500 transition-colors">
                    {project.projectName}
                </Link>
                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                    {project.description}
                </p>
                <p className="text-gray-600 mt-1 text-xs leading-relaxed">
                    Creado: <span className="font-bold">{formatDate(project.createdAt)}</span>
                </p>

                <p className={`text-gray-600 mt-1 text-xs leading-relaxed ${hasPermission ? 'bg-green-500' : 'bg-amber-500'} w-fit text-white font-bold p-2 rounded`}>
                    {hasPermission ? 'Manager' : 'Colaborador'}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <MenuIcon className="h-6 w-6" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >
                            <Menu.Item>
                                <Link to={`/projects/${project.id}`} className='px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-200 block transition-colors'>
                                    Ver Proyecto
                                </Link>
                            </Menu.Item>
                            <Menu.Item>

                                {hasPermission ? (
                                    <Link to={`/projects/${project.id}/edit`}
                                        className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-200 transition-colors'>
                                        Editar Proyecto
                                    </Link>

                                ) : <p></p>}
                            </Menu.Item>
                            <Menu.Item>
                                {hasPermission ? (
                                    <button
                                        type='button'
                                        className='w-full px-3 py-1 text-sm leading-6 text-red-500 hover:bg-red-200 transition-colors cursor-pointer'
                                        onClick={() => navigate(`${location.pathname}?projectId=${project.id}`)}
                                    >
                                        Eliminar Proyecto
                                    </button>

                                ) : <p></p>}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}
