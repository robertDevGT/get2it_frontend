import { z } from "zod";
import { NoteSchema } from "./noteSchemas";
import { userSchema } from "./authSchemas";

export const TaskSchema = z.object({
    id: z.number(),
    description: z.string(),
    status: z.string(),
    createdAt: z.string(),
    assignee: userSchema.pick({id: true, name: true, profileImg: true}).optional().nullable(),
    notes: z.array(NoteSchema)
});