import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { textLimiter } from "@/lib/utils";
import { PencilIcon, PlusIcon } from "lucide-react";
import { EditSummaryModal } from "./edit-summary-modal";
import { useEditDescriptionModal } from "@/hooks/profile/use-edit-description-modal";

interface ProfileSummaryCardProps {
  initialData: string | null;
  id: string;
}

export const ProfileSummaryCard = ({
  initialData,
  id,
}: ProfileSummaryCardProps) => {
  const { open } = useEditDescriptionModal();
  return (
    <Card>
      <EditSummaryModal initialData={initialData} id={id} />
      <CardHeader>
        <CardTitle className="">
          <div className="flex flex-col gap-y-4">
            <div className="text-base font-semibold text-gray-800 flex items-center justify-between">
              {!initialData ? (
                <>
                  <span> Profile Summary </span>
                  <div className="flex items-center gap-x-1 hover:opacity-75 cursor-pointer transition">
                    <PlusIcon className="size-4 text-amber-700" />
                    <span className="text-sm font-bold text-amber-700">
                      Add
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-x-2">
                  <span>Profile Summary</span>
                  <PencilIcon
                    onClick={open}
                    className="size-4 text-muted-foreground cursor-pointer hover:text-black hover:opacity-75 transition"
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Your resume is the first impression you make on potential
              employers. Craft it carefully to secure your desired job or
              internship.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      {initialData && (
        <CardContent className="text-sm font-medium text-neutral-700">
          {textLimiter(initialData, 50)}
        </CardContent>
      )}
    </Card>
  );
};
