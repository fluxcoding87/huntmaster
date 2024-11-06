import { ResponsiveModal } from "@/components/responsive-modal";
import { AddLangForm } from "./add-lang-form";
import { useAddLangModal } from "@/hooks/languages/use-add-lang-modal";

export const AddLangModal = () => {
  const { close, isOpen, setIsOpen } = useAddLangModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <AddLangForm onCancel={close} />
    </ResponsiveModal>
  );
};
