import { ResponsiveModal } from "@/components/responsive-modal";
import { useAddAchievementModal } from "@/hooks/achievements/use-add-achievement-modal";
import { AddAchievementForm } from "./add-achievement-form";
import { Education } from "@prisma/client";

interface AddAchievementsModalProps {
  educationsData: Education[];
}

export const AddAchievementModal = ({
  educationsData,
}: AddAchievementsModalProps) => {
  const { close, isOpen, setIsOpen } = useAddAchievementModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <AddAchievementForm onCancel={close} educationsData={educationsData} />
    </ResponsiveModal>
  );
};
