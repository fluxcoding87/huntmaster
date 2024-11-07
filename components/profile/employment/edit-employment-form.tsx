/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { generateYears } from "@/lib/utils";
import { addEmploymentSchema } from "@/types/employments";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employment } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "../projects/add-project-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateEmployment } from "@/hooks/employments/use-update-employment";
import { useDeleteEmployment } from "@/hooks/employments/use-delete-employment";
import { useEditEmploymentModal } from "@/hooks/employments/use-edit-employment-modal";
interface EditEmploymentFormProps {
  initialData: Employment;
  onCancel: () => void;
}

export const EditEmploymentForm = ({
  initialData,
  onCancel,
}: EditEmploymentFormProps) => {
  const form = useForm<z.infer<typeof addEmploymentSchema>>({
    resolver: zodResolver(addEmploymentSchema),
    defaultValues: {
      company_name: initialData.company_name,
      designation: initialData.designation,
      workedFrom: initialData.workedFrom,
      workedTo: initialData.workedTo,
      current: initialData.current ?? false,
      description: initialData.description,
      notice_period: initialData.notice_period ?? "",
      annual_salary: initialData.annual_salary?.toString() ?? "",
    },
  });

  const { close } = useEditEmploymentModal();
  const [fromDuration, setFromDuration] = useState<string>(
    initialData.workedFrom
  );
  const [toDuration, setToDuration] = useState<string>(initialData.workedTo);
  const [checkboxValue, setCheckboxValue] = useState<boolean>(
    initialData.current ?? false
  );
  const [salary, setSalary] = useState(
    initialData.annual_salary?.toString() ?? ""
  );
  const { mutate, isPending: isEmploymentUpdating } = useUpdateEmployment(
    initialData.id
  );
  const { mutate: deleteEmployment, isPending: isDeleting } =
    useDeleteEmployment(initialData.id);

  useEffect(() => {
    form.setValue("workedFrom", fromDuration!);
    form.setValue("workedTo", toDuration!);
  }, [fromDuration, toDuration]);

  const isPending = isEmploymentUpdating || isDeleting;

  const years = generateYears();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/,/g, ""); // Remove commas
    form.setValue("annual_salary", input);
    if (!isNaN(Number(input))) {
      const formattedSalary = new Intl.NumberFormat("en-US").format(
        Number(input)
      );
      setSalary(formattedSalary);
    }
  };
  const onSubmit = (values: z.infer<typeof addEmploymentSchema>) => {
    mutate({ ...values });
  };
  const handleDelete = () => {
    deleteEmployment(
      {},
      {
        onSuccess: () => {
          close(initialData.id);
        },
      }
    );
  };
  const selectedIndex = months.indexOf(fromDuration.split("'")[0]);
  const remainingMonths = months.slice(selectedIndex + 1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-semibold text-gray-800">
                Edit Employment Details
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="size-7" variant="destructive">
                    <TrashIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">Are you sure?</span>
                    <span className="text-muted-foreground text-xs">
                      This action is permanent and changes cannot be reverted.
                    </span>
                    <div className="flex items-center gap-x-2 ml-auto">
                      <Button
                        onClick={handleDelete}
                        variant="outline"
                        className="size-min text-xs bg-black text-white hover:bg-black hover:opacity-75 hover:text-white"
                      >
                        OK
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <span className="text-sm text-muted-foreground font-semibold">
              Adding roles & companies you have worked with help employers
              understand your background
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              name="company_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter the name of the company you worked at"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="designation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter the designation you held"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-y-3 justify-center">
              <FormLabel>Working Since</FormLabel>
              <div className="flex items-center gap-x-4">
                <Select
                  defaultValue={fromDuration.split("'")[0]}
                  onValueChange={(value) => {
                    setFromDuration((prev) => {
                      if (fromDuration.split("'")[1]) {
                        return `${value}'${prev.split("'")[1]}`;
                      } else {
                        return value;
                      }
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  defaultValue={fromDuration.split("'")[1] ?? ""}
                  onValueChange={(value) => {
                    setFromDuration((prev) => `${prev.split("'")[0]}'${value}`);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select
                  defaultValue={toDuration.split("'")[0]}
                  onValueChange={(value) => {
                    setToDuration((prev) => {
                      if (toDuration.split("'")[1]) {
                        return `${value}'${prev.split("'")[1]}`;
                      } else {
                        return value;
                      }
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {+fromDuration.split("'")[1] === +toDuration.split("'")[1]
                      ? remainingMonths.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))
                      : months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
                <Select
                  defaultValue={toDuration.split("'")[1] ?? ""}
                  onValueChange={(value) => {
                    setToDuration((prev) => `${prev.split("'")[0]}'${value}`);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => {
                      if (+year >= +fromDuration.split("'")[1]) {
                        return (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </SelectContent>
                </Select>
              </div>
              <FormField
                name="current"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-x-2 ml-2">
                        <Checkbox
                          checked={checkboxValue}
                          defaultChecked={checkboxValue}
                          onCheckedChange={(value) => {
                            setCheckboxValue((prev) => !prev);
                            field.onChange(value);
                          }}
                        />
                        <span className="text-sm font-semibold text-gray-800">
                          I currently work here
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {checkboxValue && (
              <FormField
                name="notice_period"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability to work</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select notice period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15 Days or less">
                            15 Days or less
                          </SelectItem>
                          <SelectItem value="1 Month">1 Month</SelectItem>
                          <SelectItem value="2 Months">2 Months</SelectItem>
                          <SelectItem value="3 Months">3 Months</SelectItem>
                          <SelectItem value="More than 3 Months">
                            More than 3 Months
                          </SelectItem>
                          <SelectItem value="Serving Notice Period">
                            Serving Notice Period
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe what you did at work</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="placeholder:text-sm"
                      placeholder="Enter the responsibilites you held, anything you accomplished or learned while serving in your full time/part time job/internship"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {checkboxValue && (
              <FormField
                name="annual_salary"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Salary</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        value={salary}
                        onChange={handleInputChange}
                        placeholder="Enter your salary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex items-center gap-x-4 ml-auto">
              <Button
                type="button"
                variant="secondary"
                className="bg-neutral-200 border"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button disabled={isPending}>Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
