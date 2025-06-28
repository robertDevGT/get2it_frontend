import api from "@/lib/axios";
import { TaskSchema } from "@/schemas/taskSchemas";
import { Project } from "@/types/projectTypes";
import { DraftTask, Task } from "@/types/taskTypes";
import { isAxiosError } from "axios";

export async function createTask({ formData, projectId }: { formData: DraftTask, projectId: Project['id'] }) {
    try {
        const url = `/tasks/${projectId}`;
        const { data } = await api.post<string>(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function getTaskById(id: Task['id']) {
    try {
        const url = `/tasks/task/${id}`;

        const { data } = await api(url);

        const result = TaskSchema.safeParse(data);

        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function changeTaskStatus({ taskId, status }: { taskId: Task['id'], status: string }) {
    try {
        const url = `/tasks/task/${taskId}`;
        const { data } = await api.patch(url, { status });

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}