import { z } from "zod";
import { userSchema } from "./authSchemas";
import { TaskSchema } from "./taskSchemas";

export const ProjectSchema = z.object({
    id: z.number(),
    projectName: z.string(),
    description: z.string(),
    createdAt: z.string(),
    managerId: z.number()
});

export const TeamMemberSchema = z.object({
    id: z.number(),
    role: z.number(),
    createdAt: z.string(),
    member: userSchema.pick({ id: true, name: true, email: true, profileImg: true })
})

export const ProjectsSchema = z.array(ProjectSchema.pick({ id: true, projectName: true, description: true, createdAt: true, managerId: true }));

export const ProjectDetailsSchema = ProjectSchema.pick({ id: true, projectName: true, description: true }).extend({
    manager: userSchema.pick({ name: true, email: true }),
});

export const ProjectTasksSchema = z.array(TaskSchema.pick({ id: true, createdAt: true, description: true, status: true, assignee:true}));

export const ProjectTeamSchema = z.array(TeamMemberSchema);