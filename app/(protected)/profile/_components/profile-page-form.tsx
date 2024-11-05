import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";
import { profileSchema } from "@/types/profile";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResumeUploadWidget } from "./resume-upload-widget";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountryStateCitySelect from "../../list/_components/country-state-city-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SkillCombobox } from "../../list/_components/skill-combobox";
import { usePostProfile } from "@/hooks/profile/use-post-profile";
interface ProfilePageFormProps {
  user: User;
}

export const ProfilePageForm = ({ user }: ProfilePageFormProps) => {
  const { mutate, isPending } = usePostProfile();

  const [resumeName, setResumeName] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      imageUrl: "",
      phoneNumber: "",
      gender: "",
      location: "",
      birthday: "",
      experienceYears: "",
      skills: [""],
      role: "",
      resumeUrl: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    mutate(values);
  };
  const handleResumeUpload = (url: string, name: string) => {
    form.setValue("resumeUrl", url);
    setResumeName(name);
    setResumeUrl(url);
  };
  const onLocationChange = useCallback(
    (location: string) => {
      form.setValue("location", location);
    },
    [form]
  );
  const handleSkillChange = useCallback(
    (skills: string[]) => {
      form.setValue("skills", skills);
    },
    [form]
  );
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col">
            <h3 className="font-semibold text-xl text-neutral-800">
              Create your profile
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              Fill out the basic fields to create your profile on Huntmaster.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              name="resumeUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-y-4 rounded-xl border p-4 shadow">
                    <h3 className="text-base font-semibold">Resume</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Your resume is the first impression you make on potential
                      employers. Craft it carefully to secure your desired job
                      or internship.
                    </p>
                    {resumeName && (
                      <div className="flex items-center gap-x-2">
                        <span className="text-sm font-semibold tracking-tight text-amber-700 ">
                          Uploaded Resume:
                        </span>
                        <Link
                          href={resumeUrl!}
                          target="_blank"
                          className="text-sm font-semibold tracking-tight hover:underline cursor-pointer"
                        >
                          {resumeName}.pdf
                        </Link>
                      </div>
                    )}
                    <ResumeUploadWidget onUpload={handleResumeUpload} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl border p-4 shadow gap-x-8">
              <div className="col-span-2 flex flex-col gap-y-4">
                <span className="text-base font-semibold">About Yourself</span>
                <span className="text-sm font-medium text-muted-foreground">
                  Fill out the basic details about yourself.
                </span>
              </div>
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                      Enter phone number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                      Location
                    </FormLabel>
                    <FormControl>
                      <CountryStateCitySelect
                        onLocationChange={onLocationChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-4 justify-between">
                <FormField
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-4 w-full">
                      <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="py-5 border-2">
                            <SelectValue placeholder="Choose a gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="transgender">
                              Transgender
                            </SelectItem>
                            <SelectItem value="do_not_specify">
                              Do not specify
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="birthday"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-4 w-full">
                      <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                        Birthday
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <FormField
                  name="experienceYears"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-4 w-full">
                      <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                        Enter your experience
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="role"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-4 w-full">
                      <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                        Enter your desired role
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4 w-full">
                    <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                      Profile Summary
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write about yourself"
                        className="placeholder:text-sm placeholder:font-medium placeholder:tracking-tight tracking-tight"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="skills"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4 w-full">
                    <FormLabel className="text-muted-foreground text-sm font-medium ml-1">
                      Your Skills
                    </FormLabel>
                    <FormControl>
                      <SkillCombobox onSkillChange={handleSkillChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="text-base font-semibold tracking-wide"
              disabled={isPending}
            >
              Create Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
