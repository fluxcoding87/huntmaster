import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAddEmploymentModal } from "@/hooks/employments/use-add-employment-modal";
import { Employment } from "@prisma/client";
import { PinIcon, PinOffIcon, PlusIcon } from "lucide-react";
import { AddEmploymentModal } from "./add-employment-modal";
import { EmploymentDetailsCard } from "./employment-details-card";
import { AiFillPinterest } from "react-icons/ai";
import { FaMapPin } from "react-icons/fa";
import { differenceInMonths, differenceInYears } from "date-fns";
import { convertMonthsToYears } from "@/lib/utils";
import { RefObject } from "react";

interface EmploymentCardProps {
  data: Employment[];
  ref: RefObject<HTMLDivElement>;
}

export const EmploymentCard = ({ data, ref }: EmploymentCardProps) => {
  const { open } = useAddEmploymentModal();
  const totalWorkExperience = data.reduce((acc, item) => {
    const workedFromMonth = item.workedFrom.split("'")[0];
    const workedFromYear = item.workedFrom.split("'")[1];
    const workedFromDate = new Date(`${workedFromMonth} ${workedFromYear}`);
    const workedToMonth = item.workedTo.split("'")[0];
    const workedToYear = item.workedTo.split("'")[1];
    const workedToDate = new Date(`${workedToMonth} ${workedToYear}`);
    return (acc += differenceInMonths(workedToDate, workedFromDate));
  }, 0);
  return (
    <Card ref={ref}>
      <AddEmploymentModal />
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800">
                Employment
              </h3>
              <div
                onClick={open}
                className="flex items-center gap-x-1 hover:opacity-75 cursor-pointer transition"
              >
                <PlusIcon className="size-4 text-amber-700" />
                <span className="text-sm font-bold text-amber-700">Add</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Talk about the company you worked at, your designation and
              describe what all you did there
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center text-muted-foreground text-sm font-semibold">
            No employment added. Add one to increase profile score.
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-y-4">
            {data.map((item) => (
              <EmploymentDetailsCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-x-2">
        <PinIcon className="size-4 text-amber-600" />
        <span className="text-sm font-bold text-gray-700">
          My total work experience is{" "}
          {totalWorkExperience >= 12
            ? convertMonthsToYears(totalWorkExperience)
            : `${totalWorkExperience} months`}{" "}
        </span>
      </CardFooter>
    </Card>
  );
};
