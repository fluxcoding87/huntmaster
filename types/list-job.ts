import { z } from "zod";

export const listJobSchema = z.object({
  name: z.string().min(1, "Name is required"),
  employmentType: z.string().min(1, "Employment Type is required"),
  experience: z.string(),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
  openings: z.string(),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
  skills: z.string().array().min(1, "Skills are required"),
  salary: z.string().min(1, "Salary is required"),
  aboutCompany: z.string().optional(),
  jobType: z.string().min(1, "Job Type is required"),
  imageUrl: z.string().optional(),
});
