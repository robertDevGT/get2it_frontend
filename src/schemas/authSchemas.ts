import z from "zod";

export const userSchema = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    profileImg: z.string().nullable()
});

export const AuthSchema = userSchema.pick({ email: true, name: true }).extend({
    password: z.string(),
    password_confirmation: z.string()
});