import z from "zod";

export const userSchema = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
});

export const AuthSchema = userSchema.pick({ email: true, name: true }).extend({
    password: z.string(),
    password_confirmation: z.string()
});