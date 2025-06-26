import { TaskSchema } from "@/schemas/taskSchemas";
import { z } from "zod";

export type Task = z.infer<typeof TaskSchema>;
export type DraftTask = Pick<Task, 'description'>;