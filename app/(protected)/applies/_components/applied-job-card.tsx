/* eslint-disable @typescript-eslint/ban-ts-comment */
import { textLimiter } from "@/lib/utils";
import { Applicant, Job } from "@prisma/client";
//@ts-ignore
import { formatDistanceToNow } from "date-fns";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AppliedJobCardProps {
  data: Job;
  applicant: Applicant;
}

export const AppliedJobCard = ({ data, applicant }: AppliedJobCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/jobs/${data.id}`)}
      className="relative flex items-center gap-x-2 border border-amber-600 rounded-lg col-span-1 px-4 py-6 hover:shadow-md cursor-pointer transition"
    >
      <div className="text-gray-600 text-xs absolute top-2 right-4">
        {formatDistanceToNow(applicant.createdAt)} ago
      </div>

      <div className="size-14 p-2 relative overflow-hidden border-2 rounded-md">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            height={100}
            width={100}
            alt="jobimage"
            className="object-cover"
          />
        ) : (
          <div className="size-full rounded-md bg-slate-700 text-white flex items-center justify-center font-semibold text-lg">
            {data.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-sm font-bold text-gray-700">
          {textLimiter(data.role, 4)}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">
          {data.name}
        </span>
        <div className="flex text-xs gap-x-1 tracking-tighter text-gray-500 font-medium mt-2">
          <MapPinIcon className="size-4" />
          {data.location}
        </div>
      </div>
    </div>
  );
};
