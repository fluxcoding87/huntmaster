import { Achievement, Education } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { EditAchievementModal } from "./edit-achievement-modal";
import { useEditAchievementModal } from "@/hooks/achievements/use-edit-achievement-modal";

interface AchievementDetailsCardProps {
  data: Achievement;
  educationsData: Education[];
}

export const AchievementDetailsCard = ({
  data,
  educationsData,
}: AchievementDetailsCardProps) => {
  const { open } = useEditAchievementModal();
  return (
    <div>
      <div className="flex flex-col">
        <EditAchievementModal data={data} educationsData={educationsData} />
        <div className="flex items-center gap-x-2">
          <div className="font-bold text-sm text-gray-900/90">
            <span>During {data.title}</span>
          </div>
          <div onClick={() => open(data.id)}>
            <PencilIcon className="size-[13px] text-gray-700 hover:text-black transition cursor-pointer" />
          </div>
        </div>
        <div className="text-gray-900/80 font-medium text-sm">
          {data.description}
        </div>
      </div>
    </div>
  );
};
