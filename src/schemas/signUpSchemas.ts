import z from "zod";

 export const verifySignupSchema = z.object({
   email: z.string().email(),
   password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be less than 20 characters long"),
   username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be less than 20 characters long"),
});
