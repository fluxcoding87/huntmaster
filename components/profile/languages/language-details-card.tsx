import { Language } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { EditLangModal } from "./edit-lang-modal";
import { useEditLangModal } from "@/hooks/languages/use-edit-lang-modal";

interface LanguageDetailsCardProps {
  data: Language;
}

export const LanguageDetailsCard = ({ data }: LanguageDetailsCardProps) => {
  const { open } = useEditLangModal();
  return (
    <div className="flex flex-col gap-y-1">
      <EditLangModal initialData={data} />
      <div className="flex items-center gap-x-2">
        <span className="text-sm font-semibold text-gray-800">{data.name}</span>
        <PencilIcon
          onClick={() => open(data.id)}
          className="size-[13px] text-gray-700 hover:text-black transition cursor-pointer"
        />
      </div>
      <span className="text-xs text-gray-700 font-medium">
        {data.comfortableIn === "Both"
          ? "Can speak, read and write"
          : data.comfortableIn === "Read/Write"
          ? "Can read and write"
          : "Can speak only"}
      </span>
    </div>
  );
};
