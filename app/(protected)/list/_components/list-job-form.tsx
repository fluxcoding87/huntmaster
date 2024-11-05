/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { listJobSchema } from "@/types/list-job";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CountryStateCitySelect from "./country-state-city-select";
import { Textarea } from "@/components/ui/textarea";
import { jobDepartments } from "./job-departments-list";
import { SkillCombobox } from "./skill-combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useListJob } from "@/hooks/jobs/use-list-job";
import { CldUploadButton } from "next-cloudinary";
import { ImageIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { RichTextEditor } from "./rich-text-editor";

export const ListJobForm = ({ userId }: { userId: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { mutate, isPending } = useListJob(userId);
  const form = useForm<z.infer<typeof listJobSchema>>({
    resolver: zodResolver(listJobSchema),
    defaultValues: {
      name: "",
      employmentType: "",
      experience: "",
      location: "",
      description: "",
      openings: "",
      department: "",
      salary: "",
      aboutCompany: "",
      role: "",
      jobType: "",
      skills: [""],
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof listJobSchema>) => {
    console.log(values);
    mutate(values);
  };
  const handleLocationChange = (location: string) => {
    form.setValue("location", location); // Update form value with location
  };
  const handleSkillChange = useCallback(
    (skills: string[]) => {
      form.setValue("skills", skills);
    },
    [form]
  );
  const onImageUpload = (result: any) => {
    form.setValue("imageUrl", result.info?.secure_url);
    setImageUrl(result.info?.secure_url);
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              List a Job
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              List a job with your personalized prefrences.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="absolute right-4 top-4">
          <CldUploadButton
            uploadPreset="mzhndydz"
            onSuccess={onImageUpload}
            options={{ maxFiles: 1 }}
          >
            <div className="flex items-center gap-x-4 border rounded-lg p-2 border-dashed border-amber-600">
              <span className="text-sm text-muted-foreground">
                Upload Image
              </span>
              <div className="relative size-14 rounded-full flex items-center justify-center bg-neutral-100 overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={form.getValues("imageUrl")!}
                    fill
                    className="object-center"
                    alt="uploaded image"
                  />
                ) : (
                  <UploadIcon className="size-4 text-neutral-600" />
                )}
              </div>
            </div>
          </CldUploadButton>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter company name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Job Type
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Job Type"
                          className="text-muted-foreground"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job">Job</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Employment Type
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="partTime">Part Time</SelectItem>
                        <SelectItem value="fullTime">Full Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Experience Needed
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Number of Openings for the Job
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Job Role
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Job Department
                  </FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobDepartments.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <div className="flex items-center gap-x-2">
                              <item.icon className="size-4" />
                              {item.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Required Skills
                  </FormLabel>
                  <FormControl className="w-full">
                    <SkillCombobox onSkillChange={handleSkillChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="md:col-span-2 w-full">
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="hidden"
                      {...field}
                      {...form.register("location")}
                    />
                  </FormControl>
                  <CountryStateCitySelect
                    onLocationChange={handleLocationChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Salary for the Job
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full md:col-span-2 lg:col-span-3">
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    Job Description
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aboutCompany"
              render={({ field }) => (
                <FormItem className="w-full md:col-span-2 lg:col-span-3 mt-8">
                  <FormLabel className="font-medium text-neutral-600 pl-1">
                    About Company
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="col-span-1 md:col-span-2 lg:col-span-3 mt-8"
              disabled={isPending}
            >
              List Job
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
