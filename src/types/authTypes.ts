import { AuthSchema } from "schemas/authSchemas";
import { z } from "zod";

export type Auth = z.infer<typeof AuthSchema>;