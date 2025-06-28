import { Note } from "@/types/noteTypes";
import { TrashIcon, UserIcon } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, deleteNote } from "@/api/NoteAPI";
import { enqueueSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
    notes: Note[];
};

export default function NotesComponent({ notes }: Props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId')!;

    const { data } = useAuth();

    const [message, setMessage] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: 'error',
                autoHideDuration: 3000
            });
        },

        onSuccess: (data) => {
            enqueueSnackbar(data, {
                variant: 'success',
                autoHideDuration: 3000
            });

            queryClient.invalidateQueries({ queryKey: ['getTaskById', taskId] });
            setMessage(null);
        }
    });

    const { mutate: mutateDeleteNote } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: 'error',
                autoHideDuration: 3000
            });
        },

        onSuccess: (data) => {
            enqueueSnackbar(data, {
                variant: 'success',
                autoHideDuration: 3000
            });

            queryClient.invalidateQueries({ queryKey: ['getTaskById', taskId] });
        }
    });

    const disabled = useMemo(() => message, [message]);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (message) {
            mutate({ taskId: Number(taskId), description: message });
        }
    }

    if (data) return (
        <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notas</h3>
            <div className="space-y-4">
                <div>
                    <form className="flex gap-2" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            value={message ?? ''}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            autoComplete="off"
                            placeholder="Mensaje"
                            className="flex-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                        />

                        <button disabled={!disabled} className={`${!disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-green-600 cursor-pointer'} font-bold p-2 rounded bg-green-500  text-white uppercase text-xs`}>
                            {false ? <p>Cargando...</p> : <p>Crear Nota</p>}
                        </button>
                    </form>
                </div>

                <div className="space-y-5 max-h-80 overflow-y-scroll scrollbar-hidden">
                    {notes.length === 0 ? <p className="text-center text-xs text-gray-500">No hay notas, se el primero en comentar</p> : (
                        <>
                            {notes.map((note) => (
                                <div
                                    key={note.id}
                                    className="flex gap-3 items-start bg-gray-50 rounded-lg p-3 shadow-sm"
                                >
                                    {note.author?.profileImg ? (
                                        <img
                                            src={`${import.meta.env.VITE_UPLOADS_URL}/${note.author.profileImg}`}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                            <UserIcon className="w-5 h-5 text-white" />
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold text-sm text-gray-800">
                                                {note.author?.name ?? "Usuario"}
                                            </p>
                                            <span className="text-xs text-gray-400 flex gap-1">
                                                {new Date(note.createdAt).toLocaleString()}

                                                {data.id == note.author.id && (
                                                    <TrashIcon className="w-4 h-4 cursor-pointer hover:text-red-500" onClick={() => mutateDeleteNote(note.id)} />
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                            {note.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}
