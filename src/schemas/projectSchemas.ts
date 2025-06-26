import { z } from "zod";
import { userSchema } from "./authSchemas";
import { TaskSchema } from "./taskSchemas";

export const ProjectSchema = z.object({
    id: z.number(),
    projectName: z.string(),
    description: z.string(),
    createdAt: z.string()
});

export const ProjectsSchema = z.array(ProjectSchema.pick({ id: true, projectName: true, description: true, createdAt: true }));

export const ProjectDetailsSchema = ProjectSchema.pick({ id: true, projectName: true, description: true }).extend({
    manager: userSchema.pick({ name: true, email: true }),
    tasks: z.array(TaskSchema)
});