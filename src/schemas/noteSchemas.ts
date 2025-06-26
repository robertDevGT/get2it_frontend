import { z } from "zod";

export const NoteSchema = z.object({
    id: z.number(),
    description: z.string(),
    createdAt: z.string(),
    author: z.object({
        id: z.number(),
        name: z.string()
    })
});