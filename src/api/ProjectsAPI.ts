import api from "@/lib/axios";
import { ProjectsSchema } from "@/schemas/projectSchemas";
import { isAxiosError } from "axios";

export async function getAllProjects() {
    try {
        const url = '/projects'
        const { data } = await api(url);
        const result = ProjectsSchema.safeParse(data);
        if(result.success){
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data.error);
            
        }
    }
}