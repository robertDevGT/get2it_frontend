import api from "@/lib/axios";
import { ProjectDetailsSchema, ProjectsSchema, ProjectTasksSchema, ProjectTeamSchema, ProjectTeamStadisticsSchema } from "@/schemas/projectSchemas";
import { Collaborator } from "@/types/collaboratorTypes";
import { DraftProject, Project } from "@/types/projectTypes";
import { isAxiosError } from "axios";

export async function getAllProjects({ projectName }: { projectName: string }) {
    try {
        const url = `/projects?projectName=${projectName}`
        const { data } = await api(url);
        const result = ProjectsSchema.safeParse(data);
        if (result.success) {
            return result.data
        } else {
            throw new Error('Información no válida');
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function getProjectById(id: Project['id']) {
    try {
        const url = `/projects/${id}`
        const { data } = await api(url);
        const result = ProjectDetailsSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function getProjectTeam(id: Project['id']) {
    try {
        const url = `/projects/${id}/team`
        const { data } = await api(url);
        const result = ProjectTeamSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function getProjectTasks(id: Project['id']) {
    try {
        const url = `/projects/${id}/tasks`
        const { data } = await api(url);
        const result = ProjectTasksSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function createProject(formData: DraftProject) {
    try {
        const url = '/projects';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function updateProject({ formData, projectId }: { formData: DraftProject, projectId: Project['id'] }) {
    try {
        const url = `/projects/${projectId}`;
        const { data } = await api.patch<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}

export async function deleteProject({ projectId }: { projectId: Project['id'] }) {
    try {
        const url = `/projects/${projectId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}


export async function checkProjectManager({ projectId, userId }: { projectId: Project['id'], userId: Collaborator['id'] }) {
    try {
        const url = `/projects/${projectId}/check/${userId}`;
        const { data } = await api<boolean>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}

export async function getProjectTeamStadistics(id: Project['id']) {
    try {
        const url = `/projects/${id}/stadistics`;
        const { data } = await api(url);
        const result = ProjectTeamStadisticsSchema.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}