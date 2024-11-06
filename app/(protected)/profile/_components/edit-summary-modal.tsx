"use client";
import { ResponsiveModal } from "@/components/responsive-modal";
import { EditSkillsForm } from "./edit-skills-form";

import { useEditDescriptionModal } from "@/hooks/profile/use-edit-description-modal";
import { EditSummaryForm } from "./edit-summary-form";

export const EditSummaryModal = ({
  id,
  initialData,
}: {
  id: string;
  initialData: string | null;
}) => {
  const { close, isOpen, setIsOpen } = useEditDescriptionModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <EditSummaryForm onCancel={close} id={id} initialData={initialData} />
    </ResponsiveModal>
  );
};
