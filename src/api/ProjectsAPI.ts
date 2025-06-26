import api from "@/lib/axios";
import { ProjectDetailsSchema, ProjectsSchema } from "@/schemas/projectSchemas";
import { DraftProject, Project } from "@/types/projectTypes";
import { isAxiosError } from "axios";

export async function getAllProjects() {
    try {
        const url = '/projects'
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

export async function createProject(formData: DraftProject) {
    try {
        const url = '/projects';
        const { data } = await api.post<string>(url,formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);

        }
    }
}