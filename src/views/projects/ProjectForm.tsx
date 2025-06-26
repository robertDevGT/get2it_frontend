import ErrorMessage from "@/components/Error";
import { DraftProject } from "@/types/projectTypes"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type Props = {
    register: UseFormRegister<DraftProject>;
    errors: FieldErrors<DraftProject>;
}


export default function ProjectForm({ register, errors }: Props) {
    return (
        <>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
                <input
                    {...register('projectName', {
                        required: 'El nombre del proyecto es requerido'
                    })}
                    type="text"
                    placeholder="Nombre del proyecto"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                />

                {errors.projectName && <ErrorMessage>{errors.projectName.message}</ErrorMessage>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Descripción del proyecto</label>
                <input
                    {...register('description', {
                        required: 'La descripción del proyecto es requerida'
                    })}
                    type="text"
                    placeholder="Nombre del proyecto"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

        </>
    )
}
