/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  DnaIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
} from "lucide-react";
import Image from "next/image";
import { FaBirthdayCake } from "react-icons/fa";
import { PendingActionsCard } from "./pending-actions-card";
import { useEditProfileModal } from "@/hooks/profile/use-edit-profile-modal";
import { CompleteProfile } from "@/types/profile";
import { EditPersonalDetailsModal } from "./edit-personal-details-modal";
import { CldUploadWidget } from "next-cloudinary";
import { useUpdateUser } from "@/hooks/user/use-update-user";
import { toast } from "sonner";

interface PersonalDetailsCardProps {
  data: CompleteProfile;
  educationLength: number;
  projectLength: number;
  languageLength: number;
  employmentLength: number;
  achievementLength: number;
}

export const PersonalDetailsCard = ({
  data,
  educationLength,
  projectLength,
  languageLength,
  employmentLength,
  achievementLength,
}: PersonalDetailsCardProps) => {
  const { open } = useEditProfileModal();
  const { mutate, isPending } = useUpdateUser();
  const handleImageUpload = (result: any) => {
    mutate(
      {
        image: result.info?.secure_url,
      },
      {
        onSuccess: () => {
          toast.success("Image Updated Successfully!");
        },
      }
    );
  };
  return (
    <Card>
      <CardContent className="p-4">
        <EditPersonalDetailsModal data={data} />
        <div className="flex items-center gap-x-8">
          <div className="py-8 px-2">
            <div className="rounded-full overflow-hidden relative size-40 group">
              {data.imageUrl || data.user.image ? (
                <Image
                  src={data?.user.image || data.imageUrl!}
                  fill
                  alt="profileimage"
                  className="object-cover"
                />
              ) : (
                <div className="size-full bg-neutral-500 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">
                    {data.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <CldUploadWidget
                uploadPreset="qkowczba"
                options={{ maxFiles: 1 }}
                onSuccess={handleImageUpload}
              >
                {({ open }) => (
                  <div
                    aria-disabled={isPending}
                    onClick={() => open()}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer"
                  >
                    <div className="flex items-center justify-center p-2 bg-white rounded-full">
                      <PencilIcon className="size-6 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </CldUploadWidget>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-x-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <span className="text-2xl font-bold">{data.user.name}</span>
                <div
                  onClick={open}
                  className="hover:text-black/70 text-muted-foreground transition cursor-pointer"
                >
                  <PencilIcon className="size-[18px]" />
                </div>
              </div>
              {data.educations.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                  Add education(s)
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-gray-600 font-semibold">
                    {data.educations[0].course_name}
                  </span>
                  <span className="text-gray-600 font-semibold text-sm">
                    {data.educations[0].college_name}
                  </span>
                </div>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex gap-x-8">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <MapPinIcon className="size-4" />
                  {data.location ?? "Not Specified"}
                </div>
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <DnaIcon className="size-4" />
                  {data.gender === "male"
                    ? "Male"
                    : data.gender === "female"
                    ? "Female"
                    : data.gender === "transgender"
                    ? "Transgender"
                    : "Did Not Specify"}
                </div>
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <FaBirthdayCake className="size-4" />
                  {format(data.birthday ?? new Date(), "PPPP") ??
                    "not specified"}
                </div>
              </div>
              <div className="h-28 w-0.5 bg-neutral-300" />
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <PhoneIcon className="size-4" />
                  {data.phoneNumber ?? "not specified"}
                </div>
                <div className="flex items-center gap-x-2 text-muted-foreground text-sm font-medium">
                  <MailIcon className="size-4" />
                  {data.user.email ?? "not specified"}
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
