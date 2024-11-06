"use client";
import { ResponsiveModal } from "@/components/responsive-modal";
import { EditSkillsForm } from "./edit-skills-form";
import { useEditSkillsModal } from "@/hooks/profile/use-edit-skills-modal";

export const EditSkillsModal = ({
  id,
  initialData,
}: {
  id: string;
  initialData: string[];
}) => {
  const { close, isOpen, setIsOpen } = useEditSkillsModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <EditSkillsForm onCancel={close} id={id} initialData={initialData} />
    </ResponsiveModal>
  );
};
