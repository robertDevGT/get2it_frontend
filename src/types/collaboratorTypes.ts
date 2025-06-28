import { CollaboratorSchema } from "@/schemas/collaboratorSchemas";
import { z } from "zod";

export type Collaborator = z.infer<typeof CollaboratorSchema>;
export type Assignee = Pick<Collaborator, 'id' |'name' | 'profileImg'>;