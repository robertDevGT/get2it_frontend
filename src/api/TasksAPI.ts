import api from "@/lib/axios";
import { Project } from "@/types/projectTypes";
import { DraftTask } from "@/types/taskTypes";
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