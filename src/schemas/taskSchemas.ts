import { z } from "zod";

export const TaskSchema = z.object({
    id: z.number(),
    description: z.string(),
    status: z.string(),
    createdAt: z.string()
});