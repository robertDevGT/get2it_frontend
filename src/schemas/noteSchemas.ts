import { z } from "zod";
import { userSchema } from "./authSchemas";

export const NoteSchema = z.object({
    id: z.number(),
    description: z.string(),
    createdAt: z.string(),
    author: userSchema.pick({id:true, name:true, profileImg:true})
});