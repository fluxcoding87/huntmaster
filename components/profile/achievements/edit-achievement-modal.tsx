import { ResponsiveModal } from "@/components/responsive-modal";
import { AddAchievementForm } from "./add-achievement-form";
import { Achievement, Education } from "@prisma/client";
import { useEditAchievementModal } from "@/hooks/achievements/use-edit-achievement-modal";
import { EditAchievementForm } from "./edit-achievement-form";

interface EditAchievementsModalProps {
  educationsData: Education[];
  data: Achievement;
}

export const EditAchievementModal = ({
  educationsData,
  data,
}: EditAchievementsModalProps) => {
  const { close, modals, setIsOpen } = useEditAchievementModal();

  return (
    <ResponsiveModal
      open={modals[data.id]}
      onOpenChange={(value) => setIsOpen(data.id, value)}
    >
      <EditAchievementForm
        initialData={data}
        onCancel={() => close(data.id)}
        educationsData={educationsData}
      />
    </ResponsiveModal>
  );
};
