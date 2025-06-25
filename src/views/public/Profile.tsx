import Tabs from "@/components/Tabs";
import { useAuth } from "@/hooks/useAuth";
import { UserIcon } from "lucide-react"; // Puedes usar cualquier ícono de avatar

export default function Profile() {
  const { data } = useAuth();

  if (data) return (
    <div className="px-10">
      <Tabs />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="flex items-center space-x-6 px-8 py-10">
          <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full">
            <UserIcon className="text-gray-500 w-12 h-12" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">Perfil de Usuario</h2>
            <p className="text-gray-600 mt-1">Información general de tu cuenta</p>
          </div>
        </div>

        <div className="border-t border-gray-100 px-8 py-6">
          <dl className="divide-y divide-gray-100 text-sm text-gray-700">
            <div className="flex justify-between py-3">
              <dt className="font-medium text-gray-900">Nombre</dt>
              <dd>{data.name}</dd>
            </div>

            <div className="flex justify-between py-3">
              <dt className="font-medium text-gray-900">Correo electrónico</dt>
              <dd>{data.email || "No disponible"}</dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
  );
}
