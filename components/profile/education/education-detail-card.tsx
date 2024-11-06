import { useEditEducationModal } from "@/hooks/education/use-edit-education-modal";
import { Education } from "@prisma/client";
import { getYear } from "date-fns";
import { PencilIcon } from "lucide-react";
import { EditEducationModal } from "./edit-education-modal";

interface EducationDetailCardProps {
  data: Education;
}

export const EducationDetailCard = ({ data }: EducationDetailCardProps) => {
  const { open } = useEditEducationModal();
  const currentYear = getYear(new Date());
  const passoutYear = getYear(data.passoutTime);

  return (
    <div className="flex flex-col">
      <EditEducationModal data={data} />
      <div className="flex items-center gap-x-2">
        <div className="font-bold text-sm text-gray-900/90">
          <span>{data.course_name}</span> from <span>{data.college_name}</span>
        </div>
        <div onClick={() => open(data.id)}>
          <PencilIcon className="size-[13px] text-gray-700 hover:text-black transition cursor-pointer" />
        </div>
      </div>
      <div className="text-gray-900/80 font-light text-sm">
        {currentYear === passoutYear
          ? "Graduating"
          : currentYear < passoutYear
          ? "Graduating"
          : "Graduated"}{" "}
        in {passoutYear}, {data.course_type}
      </div>
    </div>
  );
};
