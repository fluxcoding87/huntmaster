import { ResponsiveModal } from "@/components/responsive-modal";
import { useAddEmploymentModal } from "@/hooks/employments/use-add-employment-modal";
import { AddEmploymentForm } from "./add-employment-form";

export const AddEmploymentModal = () => {
  const { close, isOpen, setIsOpen } = useAddEmploymentModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <AddEmploymentForm onCancel={close} />
    </ResponsiveModal>
  );
};
