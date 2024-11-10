/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
interface FilterProps {
  label: string;
  data?: string[];
  type?: string;
}

type ICheckedState = {
  item: string | undefined;
  value: boolean;
}[];

export const Filter = ({ label, data, type }: FilterProps) => {
  const [checkedState, setCheckedState] = useState<ICheckedState>(() => {
    if (!data) {
      return [];
    }
    const reformedData = data.map((checkboxData) => ({
      item: checkboxData,
      value: false,
    }));
    return reformedData;
  });

  const router = useRouter();
  const params = useSearchParams();
  if (!data) {
    return null;
  }
  const handleClick = (searchQuery: string, show: boolean) => {
    if (!type) {
      return;
    }
    let currentQuery: any = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const existingValues: string[] = currentQuery[type]
      ? [].concat(currentQuery[type])
      : [];
    let updatedValues = existingValues.includes(searchQuery)
      ? existingValues
      : [...existingValues, searchQuery];

    if (!show) {
      updatedValues = updatedValues.filter((item) => item !== searchQuery);
    }

    const updatedQuery = {
      ...currentQuery,
      [type]: updatedValues,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // Push the updated URL to the router
    router.push(url);
  };
  const handleCheckedQueryChange = (item: string, value: boolean) => {
    setCheckedState((prev) => {
      const previousItems = [...prev];
      const updatedItemIndex = previousItems.findIndex(
        (value) => value.item === item
      );
      if (updatedItemIndex !== -1) {
        previousItems[updatedItemIndex].value = value;
        return previousItems;
      } else {
        return previousItems;
      }
    });
  };

  console.log(checkedState);

  return (
    <Accordion type="single" className="py-2" collapsible>
      <AccordionItem value={label}>
        <AccordionTrigger>
          <span className="font-bold">{label}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-y-3">
          {data?.map((item, idx) => {
            if (idx > 3) {
              return null;
            }
            return (
              <div
                key={item}
                className="flex items-center gap-x-3 text-gray-600 font-medium"
              >
                <Checkbox
                  checked={
                    checkedState.find((value) => value.item === item)?.value ??
                    false
                  }
                  onCheckedChange={(value) =>
                    handleCheckedQueryChange(item, !!value)
                  }
                />
                <span>{item}</span>
              </div>
            );
          })}
          <Popover>
            <PopoverTrigger asChild>
              {type !== "work" && (
                <Button
                  variant="ghost"
                  className="flex justify-start px-8 w-fit hover:bg-white text-amber-700 hover:text-amber-700"
                >
                  View More
                </Button>
              )}
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-fit text-sm border-2 rounded-xl bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-8 gap-x-3 gap-y-4 overflow-auto h-96 md:h-full"
            >
              <div className="sm:col-span-2 md:col-span-3">
                <span className="font-bold text-lg">{label}</span>
              </div>
              {data?.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-x-3 gap-y-6 text-gray-600 font-medium"
                >
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleCheckedQueryChange(item, !!value)
                    }
                  />
                  <span>{item}</span>
                </div>
              ))}
              <div className="sm:col-span-2 md:col-span-3 flex items-center justify-end px-4">
                <span className="text-white bg-amber-700 py-2 px-4 rounded-xl font-semibold hover:opacity-75 transition cursor-pointer">
                  Apply
                </span>
              </div>
            </PopoverContent>
          </Popover>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
