import { useAuth } from "@/hooks/useAuth";
import { ImageIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tabs from "@/components/Tabs";
import ModalChangeProfilePicture from "@/components/modals/ModalChangeProfilePicture";

export default function Profile() {
  const navigate = useNavigate();

  const { data } = useAuth();

  if (data) return (
    <div className="px-10">
      <Tabs />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="flex items-center space-x-6 px-8 py-10">
          <div className="flex flex-col gap-2 justify-center items-center">

            {data.profileImg ? (
              <>
                <div className="flex items-center justify-center w-24 h-24 rounded-full overflow-hidden bg-gray-100 shadow-md">
                  <img
                    src={`${import.meta.env.VITE_UPLOADS_URL}/${data.profileImg}`}
                    alt="Imagen de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            ) : <UserIcon className="w-24 h-24 " />}

            <div className="flex gap-2 items-center shadow p-2 capitalize" onClick={() => navigate(`${location.pathname}?changeProfilePic=true`)}>
              <ImageIcon className="w-4 h-4" />
              <p className="text-xs font-bold">Editar</p>
            </div>
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

      <ModalChangeProfilePicture />
    </div>
  );
}
