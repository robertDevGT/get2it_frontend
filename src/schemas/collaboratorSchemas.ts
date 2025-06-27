import { z } from "zod";
import { userSchema } from "./authSchemas";

export const CollaboratorSchema = userSchema.pick({id:true,name:true,email:true,profileImg:true}).extend({
    flag: z.boolean()
});