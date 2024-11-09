import { Applicant, Job } from "@prisma/client";

export type FullApplicant = Applicant & { job: Job };
