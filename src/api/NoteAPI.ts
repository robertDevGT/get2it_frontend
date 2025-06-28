import api from "@/lib/axios";
import { Note } from "@/types/noteTypes";
import { Task } from "@/types/taskTypes";
import { isAxiosError } from "axios";

export async function createNote({ description, taskId }: { description: Note['description'], taskId: Task['id'] }) {
    try {
        const url = `/notes/${taskId}`;
        const { data } = await api.post(url, { description });

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function deleteNote(id: Note['id']) {
    try {
        const url = `/notes/${id}`;
        const { data } = await api.delete(url);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}