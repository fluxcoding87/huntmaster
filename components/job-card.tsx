/* eslint-disable @typescript-eslint/ban-ts-comment */
import { frameworks } from "@/app/(protected)/list/_components/job-departments-list";
import { formatPrice, textLimiter } from "@/lib/utils";
import { Job } from "@prisma/client";
import { BookOpenIcon, CoinsIcon, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";
// @ts-ignore
import { formatDistanceToNow } from "date-fns";
import { Button } from "./ui/button";
import { TextLimiter } from "./text-limiter";
import { useRouter } from "next/navigation";
import { Preview } from "./preview";
interface JobCardProps {
  data: Job;
}

export const JobCard = ({ data }: JobCardProps) => {
  const router = useRouter();
  const filteredSkills = data.skills.map((skill) => {
    const filteredSkill = frameworks.find((item) => item.value === skill);
    return filteredSkill;
  });

  return (
    <div
      onClick={() => router.push(`/jobs/${data.id}`)}
      className="relative bg-white rounded-lg flex flex-col space-y-6 mt-8 px-4 py-6 border shadow-sm hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex flex-col justify-center gap-y-1">
        <h2 className="font-semibold text-lg">{data.role}</h2>
        <p className="text-sm text-neutral-600 font-medium">{data.name}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-1 font-medium">
            <TrendingUp className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {data.experience} Yrs
            </span>
          </div>
          <div className="flex items-center gap-x-1 font-medium">
            <CoinsIcon className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {formatPrice(data.salary)}
            </span>
          </div>
          <div className="flex items-center gap-x-1 font-medium">
            <MapPin className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {data.location}
            </span>
          </div>
        </div>
        {data.description && (
          <div
            id="description"
            className="text-[14.5px] font-medium text-pretty text-muted-foreground flex items-center gap-x-2 truncate w-full"
          >
            <BookOpenIcon className="size-4 text-muted-foreground z-10" />
            <div className="-ml-4">
              <Preview value={textLimiter(data.description, 10)} />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        {filteredSkills.map((item, idx) => (
          <div
            key={item?.value}
            className="text-muted-foreground text-xs font-bold flex items-center gap-x-2"
          >
            {item?.label}
            {idx < filteredSkills.length - 1 && (
              <div className="rounded-full size-[3px] bg-neutral-600" />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full items-center">
        <span className="text-xs text-neutral-500">
          {formatDistanceToNow(data.createdAt)} ago
        </span>
      </div>
      <div className="absolute z-40 right-6 -top-2 rounded-full size-8 overflow-hidden">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            fill
            alt="jobimage"
            className="object-center"
          />
        ) : (
          <div className="size-full bg-slate-700 text-white flex items-center justify-center font-semibold text-lg">
            {data.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};
