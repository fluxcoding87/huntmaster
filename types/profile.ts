import {
  Achievement,
  Education,
  Employment,
  Language,
  Profile,
  Project,
  User,
} from "@prisma/client";
import { z } from "zod";

export const profileSchema = z.object({
  imageUrl: z.string().optional(),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
  birthday: z.string().min(1, "Date is required"),
  experienceYears: z.string().min(1, "Experience is required"),
  skills: z.string().array().min(1, "Minimum 1 skill is required"),
  role: z.string().optional(),
  resumeUrl: z.string().min(1, "Upload a resume so that you can apply."),
  description: z.string().optional(),
});

export type CompleteProfile = Profile & {
  user: User;
} & { educations: Education[] } & { projects: Project[] } & {
  employments: Employment[];
} & { achievements: Achievement[] } & { languages: Language[] };
