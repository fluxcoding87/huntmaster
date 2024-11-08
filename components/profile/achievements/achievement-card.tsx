import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddAchievementModal } from "@/hooks/achievements/use-add-achievement-modal";
import { Achievement, Education } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { AddAchievementModal } from "./add-achievement-modal";
import { AchievementDetailsCard } from "./achievement-details-card";
import { RefObject } from "react";

interface AchievementCardProps {
  data: Achievement[];
  educationsData: Education[];
  ref: RefObject<HTMLDivElement>;
}

export const AchievementCard = ({
  data,
  educationsData,
  ref,
}: AchievementCardProps) => {
  const { open } = useAddAchievementModal();
  return (
    <Card ref={ref}>
      <AddAchievementModal educationsData={educationsData} />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-800">
            Acedemic Achievements
          </span>
          <div
            onClick={open}
            className="flex items-center gap-x-1 hover:opacity-75 cursor-pointer transition"
          >
            <PlusIcon className="size-4 text-amber-700" />
            <span className="text-sm font-bold text-amber-700">Add</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center text-sm text-muted-foreground font-semibold">
            No acedemic achievements added. Add one to increase profile score.
          </div>
        ) : (
          <div className="flex flex-col-reverse justify-center gap-y-4">
            {data.map((item) => (
              <AchievementDetailsCard
                key={item.id}
                data={item}
                educationsData={educationsData}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
