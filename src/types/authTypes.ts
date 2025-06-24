import { AuthSchema } from "schemas/authSchemas";
import { z } from "zod";

export type Auth = z.infer<typeof AuthSchema>;
export type LoginType = Pick<Auth, 'email' | 'password'>

export type Token = {
    token: string;
}