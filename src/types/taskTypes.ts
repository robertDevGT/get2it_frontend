import { TaskSchema } from "@/schemas/taskSchemas";
import { z } from "zod";

export type Task = z.infer<typeof TaskSchema>;
export type TaskProject = Pick<Task, 'description' | 'createdAt' | 'status' | 'id' | 'assignee'>;
export type DraftTask = Pick<Task, 'description'>;