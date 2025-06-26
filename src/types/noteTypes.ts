import { NoteSchema } from "@/schemas/noteSchemas";
import { z } from "zod";

export type Note = z.infer<typeof NoteSchema>;