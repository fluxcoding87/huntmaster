import { Employment } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { EditEmploymentModal } from "./edit-employment-modal";
import { useEditEmploymentModal } from "@/hooks/employments/use-edit-employment-modal";

interface EmploymentDetailsCardProps {
  data: Employment;
}

export const EmploymentDetailsCard = ({ data }: EmploymentDetailsCardProps) => {
  const { open } = useEditEmploymentModal();
  return (
    <div className="flex flex-col">
      <EditEmploymentModal initialData={data} />
      <div className="flex items-center gap-x-2">
        <div className="font-bold text-sm text-gray-900/90 flex flex-col">
          <div className="flex items-center gap-x-2">
            <span>{data.company_name}</span>
            <div onClick={() => open(data.id)}>
              <PencilIcon className="size-[13px] text-gray-700 hover:text-black transition cursor-pointer" />
            </div>
          </div>

          <span className="font-light text-gray-700">{data.designation}</span>
          <span className="text-gray-700 text-sm mt-1 tracking-tight font-medium">
            {data.workedFrom} to {data.workedTo}
          </span>
        </div>
      </div>
      <div className="text-gray-900/80 font-medium text-sm mt-2">
        {data.description}
      </div>
    </div>
  );
};
