/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addEmploymentSchema } from "@/types/employments";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { months } from "../projects/add-project-form";
import { generateYears } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostEmployment } from "@/hooks/employments/use-post-employment";
import { useAddEmploymentModal } from "@/hooks/employments/use-add-employment-modal";

interface AddEmploymentFormProps {
  onCancel: () => void;
}

export const AddEmploymentForm = ({ onCancel }: AddEmploymentFormProps) => {
  const [fromDuration, setFromDuration] = useState<string>("");
  const [toDuration, setToDuration] = useState<string>("");
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [salary, setSalary] = useState("");

  const { mutate, isPending } = usePostEmployment();
  const { close } = useAddEmploymentModal();

  useEffect(() => {
    form.setValue("workedFrom", fromDuration!);
    form.setValue("workedTo", toDuration!);
  }, [fromDuration, toDuration]);

  const years = generateYears();
  const form = useForm<z.infer<typeof addEmploymentSchema>>({
    resolver: zodResolver(addEmploymentSchema),
    defaultValues: {
      company_name: "",
      designation: "",
      workedFrom: "",
      workedTo: "",
      current: false,
      description: "",
      notice_period: "",
      annual_salary: "",
    },
  });
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
    mutate(
      { ...values },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };
  const selectedIndex = months.indexOf(
    fromDuration.split("'")[0] === ""
      ? fromDuration
      : fromDuration.split("'")[0]
  );
  const remainingMonths = months.slice(selectedIndex + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-1">
            <span className="text-lg font-semibold text-gray-800">
              Employment details
            </span>
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
                      : !fromDuration.split("'")[1]
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
