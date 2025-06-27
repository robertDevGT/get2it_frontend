import { ProjectDetailsSchema, ProjectSchema, TeamMemberSchema } from "@/schemas/projectSchemas";
import { z } from "zod";

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectDetails = z.infer<typeof ProjectDetailsSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type DraftProject = Pick<Project, 'projectName' | 'description'>;