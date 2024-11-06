import { ResponsiveModal } from "@/components/responsive-modal";
import { useAddEducationModal } from "@/hooks/education/use-add-education-modal";

import { CompleteProfile } from "@/types/profile";
import { AddEducationForm } from "./add-education-form";

export const AddEducationModal = () => {
  const { close, isOpen, setIsOpen } = useAddEducationModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <AddEducationForm onCancel={close} />
    </ResponsiveModal>
  );
};
