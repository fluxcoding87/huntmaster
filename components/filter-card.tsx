"use client";

import { jobDepartments } from "@/app/(protected)/list/_components/job-departments-list";
import { Filter } from "./filter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { filterMap } from "@/lib/filters";

export const FilterCard = () => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-base font-semibold">All filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-2 -mt-2" />
        <div className="flex flex-col justify-center">
          {filterMap.map((item) => (
            <Filter
              key={item.type}
              label={item.label}
              data={item.data}
              type={item.type}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
