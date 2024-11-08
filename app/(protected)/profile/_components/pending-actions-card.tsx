import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  Briefcase,
  FolderIcon,
  FullscreenIcon,
  Languages,
  LanguagesIcon,
  PlaySquare,
  School2Icon,
  ThumbsUpIcon,
  TrophyIcon,
} from "lucide-react";
import { FaSuitcase, FaThumbsUp } from "react-icons/fa";

interface PendingActionsCardProps {
  educationLength: number;
  projectLength: number;
  languageLength: number;
  employmentLength: number;
  achievementLength: number;
}

export const PendingActionsCard = ({
  educationLength,
  projectLength,
  languageLength,
  employmentLength,
  achievementLength,
}: PendingActionsCardProps) => {
  // Dynamically calculate the number of missing details
  const missingDetailsCount =
    (educationLength === 0 ? 1 : 0) +
    (projectLength === 0 ? 1 : 0) +
    (languageLength === 0 ? 1 : 0) +
    (employmentLength === 0 ? 1 : 0) +
    (achievementLength === 0 ? 1 : 0);

  return (
    <Card className="flex-1 rounded-xl relative min-h-52 ">
      {missingDetailsCount === 0 && (
        <div className="absolute inset-0 bg-green-200/75 border-green-600 border backdrop-blur rounded-xl flex items-center justify-center">
          <div className="font-bold text-xl tracking-tight rounded-xl flex items-center gap-x-4 p-2">
            <div className="bg-white border border-black/30 rounded-full p-2">
              <ThumbsUpIcon className="text-green-600 size-8" />
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-xl font-bold text-gray-800">
                Your profile is 100% complete
              </span>
            </div>
          </div>
        </div>
      )}
      <CardContent>
        <div
          className={cn(
            missingDetailsCount === 0 ? "bg-white" : "bg-amber-600/20"
          )}
        >
          <div className="flex flex-col gap-y-4 py-4">
            {educationLength === 0 && (
              <div className="flex items-center justify-between w-[70%] mx-auto">
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <School2Icon className="size-4 text-neutral-500" />
                </div>
                <span className="text-sm tracking-tight font-semibold text-neutral-600 pl-4 flex-1">
                  Add Education
                </span>
                <div className="flex items-center gap-x-2 bg-white rounded-2xl text-green-500 px-2">
                  <ArrowUpIcon className="size-4" />
                  <span className="text-sm tracking-tight">10%</span>
                </div>
              </div>
            )}
            {projectLength === 0 && (
              <div className="flex items-center justify-between w-[70%] mx-auto">
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <FolderIcon className="size-4 text-neutral-500" />
                </div>
                <span className="text-sm tracking-tight font-semibold text-neutral-600 pl-4 flex-1">
                  Add Projects
                </span>
                <div className="flex items-center gap-x-2 bg-white rounded-2xl text-green-500 px-2">
                  <ArrowUpIcon className="size-4" />
                  <span className="text-sm tracking-tight">30%</span>
                </div>
              </div>
            )}
            {achievementLength === 0 && (
              <div className="flex items-center justify-between w-[70%] mx-auto">
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <TrophyIcon className="size-4 text-neutral-500" />
                </div>
                <span className="text-sm tracking-tight font-semibold text-neutral-600 pl-4 flex-1">
                  Add Acedemic Achievements
                </span>
                <div className="flex items-center gap-x-2 bg-white rounded-2xl text-green-500 px-2">
                  <ArrowUpIcon className="size-4" />
                  <span className="text-sm tracking-tight">10%</span>
                </div>
              </div>
            )}
            {employmentLength === 0 && (
              <div className="flex items-center justify-between w-[70%] mx-auto">
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <Briefcase className="size-4 text-neutral-500" />
                </div>
                <span className="text-sm tracking-tight font-semibold text-neutral-600 pl-4 flex-1">
                  Add Employments
                </span>
                <div className="flex items-center gap-x-2 bg-white rounded-2xl text-green-500 px-2">
                  <ArrowUpIcon className="size-4" />
                  <span className="text-sm tracking-tight">20%</span>
                </div>
              </div>
            )}
            {languageLength === 0 && (
              <div className="flex items-center justify-between w-[70%] mx-auto">
                <div className="bg-white rounded-full p-2 flex items-center justify-center">
                  <LanguagesIcon className="size-4 text-neutral-500" />
                </div>
                <span className="text-sm tracking-tight font-semibold text-neutral-600 pl-4 flex-1">
                  Add Languages
                </span>
                <div className="flex items-center gap-x-2 bg-white rounded-2xl text-green-500 px-2">
                  <ArrowUpIcon className="size-4" />
                  <span className="text-sm tracking-tight">10%</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mt-2">
            {missingDetailsCount === 0 ? (
              <div></div>
            ) : (
              <Button className="bg-amber-700 tracking-wide px-10 text-sm font-semibold rounded-2xl w-fit mx-auto hover:shadow-md hover:bg-amber-700 transition">
                Add {missingDetailsCount} Missing Detail
                {missingDetailsCount > 1 ? "s" : ""}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
