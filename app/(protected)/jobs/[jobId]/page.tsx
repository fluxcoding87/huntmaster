import { JobIdClient } from "./client";

const JobIdPage = ({ params }: { params: { jobId: string } }) => {
  return <JobIdClient id={params.jobId} />;
};

export default JobIdPage;
