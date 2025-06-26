import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changeProfilePic } from "@/api/AuthAPI";
import { enqueueSnackbar } from "notistack";
import Modal from "../Modal";

export type DraftChangeProfile = {
    profileImg: FileList;
}

export default function ModalChangeProfilePicture() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modal = queryParams.get('changeProfilePic')!;
    const open = modal ? true : false;
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<DraftChangeProfile>();

    const handleCloseModal = () => {
        navigate(location.pathname, { replace: true });
        setPreviewUrl(null);
        reset();
    }

    const { mutate, isPending } = useMutation({
        mutationFn: changeProfilePic,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 3000
            });
        },
        onSuccess: () => {
            handleCloseModal();
            window.location.reload();
        }

    });

    const onSubmit = (formData: DraftChangeProfile) => mutate(formData.profileImg[0]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };
    return (
        <Modal modal={open} closeModal={() => handleCloseModal()} title="Cambiar Foto de Perfil">
            <div className="p-10">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Imagen de Perfil
                        </label>
                        <input
                            {...register("profileImg", {
                                required: "La imagen es requerida",
                                validate: {
                                    size: (files) =>
                                        files[0]?.size < 2 * 1024 * 1024 || "El archivo debe ser menor a 2MB",
                                },
                            })}
                            onChange={handleImageChange}
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                transition duration-150"
                        />
                        {errors.profileImg && (
                            <p className="text-red-500 text-xs italic">
                                {errors.profileImg.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white font-semibold text-sm rounded-lg hover:bg-green-700 transition"
                        >
                            {isPending ? "Cargando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>

                {previewUrl && (
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <img
                            src={previewUrl}
                            alt="Previsualización"
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
                        />
                        <p className="text-sm text-gray-600">Previsualización</p>
                    </div>
                )}
            </div>

        </Modal>
    )
}
