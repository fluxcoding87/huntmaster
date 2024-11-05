import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, "Name should be greater than 1 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Passoword should be greater than 6 characters"),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
