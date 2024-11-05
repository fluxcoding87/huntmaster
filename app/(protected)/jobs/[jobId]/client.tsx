"use client";
import { Loader } from "@/components/loader";
import { Preview } from "@/components/preview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetJob } from "@/hooks/jobs/use-get-job";
import {
  Building2Icon,
  CoinsIcon,
  IndianRupeeIcon,
  MapPinIcon,
  TrendingUpIcon,
} from "lucide-react";
import Image from "next/image";
import { frameworks } from "../../list/_components/job-departments-list";
import { formatPrice } from "@/lib/utils";
import { jobDepartments } from "../../list/_components/job-departments-list";
import { MdWorkOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FaPaperPlane, FaRegBookmark } from "react-icons/fa";
import { useCurrent } from "@/hooks/auth/use-current";
import { redirect, useRouter } from "next/navigation";

export const JobIdClient = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: job, isLoading: jobIsLoading } = useGetJob(id);
  const { data: user, isLoading: userIsLoading } = useCurrent();
  const isLoading = userIsLoading || jobIsLoading;
  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    redirect("/sign-in");
  }
  if (!job) {
    return null;
  }
  const filteredSkills = job.skills.map((skill) => {
    const filteredSkill = frameworks.find((item) => item.value === skill);
    return filteredSkill;
  });
  const filteredDepartment = jobDepartments.find(
    (item) => item.value === job.department
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-x-4">
          <div className="size-14 overflow-hidden relative rounded-full">
            {job.imageUrl ? (
              <Image
                fill
                src={job.imageUrl}
                alt="jobimage"
                className="object-cover"
              />
            ) : (
              <div className="rounded-full size-full bg-gray-800 flex items-center justify-center text-white font-semibold text-2xl">
                {job.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-y-1">
            <span className="font-bold text-2xl text-neutral-800">
              {job.role}
            </span>
            <div className="font-semibold text-base text-muted-foreground flex items-center gap-x-2">
              <span>{job.name}</span>
              <div className="h-6 font-thin w-[1px] rounded-full bg-neutral-400" />
              <div className="flex items-center gap-x-1">
                <MapPinIcon className="size-4" />
                {job.location}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="w-full flex flex-col gap-y-2">
          <div className="sm:text-xl md:text-2xl tracking-tight flex flex-col">
            <h2 className="text-neutral-800 font-semibold">About Company</h2>
            <span className="text-sm text-muted-foreground">
              Company description
            </span>
          </div>
          <div className="text-neutral-800 -ml-4 -mt-2">
            <Preview value={job.aboutCompany!} />
          </div>
          <Separator className="my-2" />
          <div className="sm:text-xl md:text-2xl tracking-tight flex flex-col">
            <h2 className="text-neutral-800 font-semibold">Job Description</h2>
            <span className="text-sm text-muted-foreground">
              About this Job
            </span>
          </div>
          <div className="text-neutral-800 -ml-4 -mt-2">
            <Preview value={job.description!} />
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-y-2 justify-center">
            <h3 className="font-semibold text-lg text-neutral-800">
              Skills Required
            </h3>
            <div className="flex items-center gap-x-2">
              {filteredSkills.map((item) => (
                <div
                  key={item?.value}
                  className="rounded-lg px-4 py-2 bg-amber-600/40 text-sm font-medium flex-wrap"
                >
                  {item?.label}
                </div>
              ))}
            </div>
          </div>
          <Separator className="mt-4 mb-2" />
          <div className="flex items-center gap-x-8">
            <div className="flex flex-col gap-y-1 justify-center">
              <div className="font-semibold text-base text-neutral-800 flex items-center gap-x-2">
                <TrendingUpIcon className="size-5" />
                Experience Required
              </div>
              <p className="font-medium text-muted-foreground">
                {job.experience} years
              </p>
            </div>
            <div className="h-10 font-thin w-[1px] rounded-full bg-neutral-400" />
            <div className="flex flex-col gap-y-1 justify-center">
              <div className="font-semibold text-base text-neutral-800 flex items-center gap-x-2">
                <CoinsIcon className="size-5" />
                Salary
              </div>
              <div className="font-medium text-muted-foreground flex items-center">
                <IndianRupeeIcon className="size-4" />
                {formatPrice(job.salary)}
              </div>
            </div>
            <div className="h-10 font-thin w-[1px] rounded-full bg-neutral-400" />
            <div className="flex flex-col gap-y-1 justify-center">
              <div className="font-semibold text-base text-neutral-800 flex items-center gap-x-2">
                <Building2Icon className="size-5" />
                Department
              </div>
              <div className="font-medium text-muted-foreground flex items-center gap-x-2">
                {filteredDepartment?.label}
              </div>
            </div>
            <div className="h-10 font-thin w-[1px] rounded-full bg-neutral-400" />
            <div className="flex flex-col gap-y-1 justify-center">
              <div className="font-semibold text-base text-neutral-800 flex items-center gap-x-2">
                <MdWorkOutline className="size-5" />
                Employment Type
              </div>
              <div className="font-medium text-muted-foreground flex items-center gap-x-2">
                {job.employmentType === "fullTime" ? "Full Time" : "Part Time"}
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-sm font-bold  text-muted-foreground">
              {job.openings} Openings
            </h2>
            <div className="flex items-center gap-x-4">
              <Button variant="secondary" className="flex items-center gap-x-2">
                Save
                <FaRegBookmark />
              </Button>
              <Button
                className="flex items-center gap-x-2"
                onClick={() => router.push(`/jobs/${job.id}/apply`)}
              >
                Apply for this Job
                <FaPaperPlane />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
