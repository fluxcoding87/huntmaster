import { z } from "zod";

export const addProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  workedFrom: z.string().min(1, "worked from is required"),
  workedTo: z.string().min(1, "worked to is required"),
  description: z.string().min(1, "Description is required"),
  skills: z.string().array().min(1, "At least one skill is required"),
  projectUrl: z.string().optional(),
});
