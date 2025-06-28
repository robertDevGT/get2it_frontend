import api from "@/lib/axios";
import { CollaboratorSchema } from "@/schemas/collaboratorSchemas";
import { Assignee, Collaborator } from "@/types/collaboratorTypes";
import { ProjectDetails } from "@/types/projectTypes";
import { Task } from "@/types/taskTypes";
import { isAxiosError } from "axios";

export async function getCollaboratorByEmail({ email, projectId }: { email: string, projectId: ProjectDetails['id'] }) {
    try {
        const url = `/collaborators/${projectId}`
        const { data } = await api.post(url, {
            email
        })
        const result = CollaboratorSchema.safeParse(data);

        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function addCollaboratorToProject({ userId, projectId }: { userId: Collaborator['id'], projectId: ProjectDetails['id'] }) {
    try {
        const url = `/collaborators/${projectId}/add`;
        const { data } = await api.post(url, { userId });
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function assignCollaboratorToTask({ taskId, userId }: { taskId: Task['id'], userId: Assignee['id'] }) {
    try {
        const url = `/tasks/${taskId}/assign/${userId}`;
        const { data } = await api.patch(url);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}