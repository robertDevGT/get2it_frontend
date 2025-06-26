import { Note } from "@/types/noteTypes"
import { formatDate } from "@/utils/utils"

type Props = {
    note: Note
}

export default function NoteComponent({ note }: Props) {
    return (
        <div
            className="border border-gray-200 p-4 rounded-lg"
        >
            <p className="text-gray-800">{note.description}</p>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 mt-2">
                    Autor: {note.author.name}
                </p>
                <p className="text-xs bg-amber-500 text-white p-1 rounded">{formatDate(note.createdAt)}</p>
            </div>
        </div>
    )
}
