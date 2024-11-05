"use client";

import { useGetJobs } from "@/hooks/jobs/use-get-jobs";
import { Loader } from "./loader";
import { JobCard } from "./job-card";

export const JobsList = () => {
  const { data: jobs, isLoading } = useGetJobs();

  if (isLoading) {
    return <Loader />;
  }
  if (!jobs) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} data={job} />
      ))}
    </div>
  );
};
