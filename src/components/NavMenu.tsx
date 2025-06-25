import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useStore } from '@/store'
import { MenuIcon } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'

export default function NavMenu() {
    const logout = useStore(state => state.logout);
    const { data } = useAuth();

    const handleLogout = () => {
        logout();

        enqueueSnackbar('Sesión Cerrada Correctamente', {
            variant: "success",
            autoHideDuration: 3000
        })
    }
    if (data) return (
        <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-green-400">
                <MenuIcon className='w-8 h-8 text-white ' />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <p className='text-center'>Hola: {data.name}</p>
                        <Link
                            to='/profile'
                            className='block p-2 hover:text-purple-950 hover:bg-gray-200 transition-colors'
                        >Mi Perfil</Link>
                        <Link
                            to='/dashboard'
                            className='block w-full p-2 hover:text-purple-950 hover:bg-gray-200 transition-colors'
                        >Dashboard</Link>
                        <button
                            className='block w-full p-2 bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors mt-2'
                            type='button'
                            onClick={() => handleLogout()}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}