import { Employer, User } from "@prisma/client";
import { z } from "zod";

export const addEmployerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  contact_number: z.string().min(8, "Required"),
  name_of_organization: z.string().min(1, "company name is required"),
  city: z.string().min(1, "required"),
});

export type FullUser = User & { employer: Employer };
