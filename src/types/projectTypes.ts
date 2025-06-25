import { ProjectSchema } from "@/schemas/projectSchemas";
import { z } from "zod";

export type Project = z.infer<typeof ProjectSchema>;