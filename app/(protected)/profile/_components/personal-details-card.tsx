import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Achievement,
  Education,
  Employment,
  Language,
  Project,
} from "@prisma/client";
import { format } from "date-fns";
import { DnaIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { FaBirthdayCake } from "react-icons/fa";
import { PendingActionsCard } from "./pending-actions-card";

interface PersonalDetailsCardProps {
  name: string | null;
  email: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  gender?: string | null;
  birthday: Date | null;
  imageUrl?: string | null;
  education: Education | undefined;
  educationLength: number;
  projectLength: number;
  languageLength: number;
  employmentLength: number;
  achievementLength: number;
}

export const PersonalDetailsCard = ({
  name,
  email,
  location,
  phoneNumber,
  gender,
  birthday,
  imageUrl,
  education,
  educationLength,
  projectLength,
  languageLength,
  employmentLength,
  achievementLength,
}: PersonalDetailsCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-x-8">
          <div className="py-8 px-2">
            <div className="rounded-full overflow-hidden relative size-40">
              <Image
                src={imageUrl!}
                fill
                alt="profileimage"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-x-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{name}</span>
              {!education ? (
                <div className="text-muted-foreground text-sm">
                  Add education(s)
                </div>
              ) : (
                <div>
                  <span>{education.course_name}</span>
                  <span>{education.college_name}</span>
                </div>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex gap-x-8">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <MapPinIcon className="size-4" />
                  {location ?? "Not Specified"}
                </div>
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <DnaIcon className="size-4" />
                  {gender?.toUpperCase() ?? "Not Specified"}
                </div>
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <FaBirthdayCake className="size-4" />
                  {format(birthday ?? new Date(), "PPPP") ?? "not specified"}
                </div>
              </div>
              <div className="h-28 w-0.5 bg-neutral-300" />
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <PhoneIcon className="size-4" />
                  {phoneNumber ?? "not specified"}
                </div>
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <MailIcon className="size-4" />
                  {email ?? "not specified"}
                </div>
              </div>
            </div>
          </div>
          <PendingActionsCard
            educationLength={educationLength}
            achievementLength={achievementLength}
            projectLength={projectLength}
            languageLength={languageLength}
            employmentLength={employmentLength}
          />
        </div>
      </CardContent>
    </Card>
  );
};
