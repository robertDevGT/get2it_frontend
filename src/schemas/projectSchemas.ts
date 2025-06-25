import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.number(),
    projectName: z.string(),
    description: z.string()
});

export const ProjectsSchema = z.array(ProjectSchema.pick({id: true, projectName:true, description: true}));