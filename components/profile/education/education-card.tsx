import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Education } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { AddEducationModal } from "./add-education-modal";
import { useAddEducationModal } from "@/hooks/education/use-add-education-modal";
import { EducationDetailCard } from "./education-detail-card";
import { EditEducationModal } from "./edit-education-modal";

interface EducationCardProps {
  data: Education[];
}

export const EducationCard = ({ data }: EducationCardProps) => {
  const { open } = useAddEducationModal();
  return (
    <Card>
      <AddEducationModal />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-800">
            Education
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
          <div className="text-sm font-semibold text-muted-foreground text-center">
            No education added. Please add atleast one to increase your profile
            score.
          </div>
        ) : (
          <div className="flex flex-col gap-y-4">
            {data.map((item) => (
              <EducationDetailCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
