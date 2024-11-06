import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile";
import { SkillCombobox } from "../../list/_components/skill-combobox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetProfile } from "@/hooks/profile/use-get-profile";
import { Loader } from "@/components/loader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface EditSummaryFormProps {
  onCancel: () => void;
  id: string;
  initialData: string | null;
}

const formSchema = z.object({
  description: z.string().optional(),
});

export const EditSummaryForm = ({
  onCancel,
  id,
  initialData,
}: EditSummaryFormProps) => {
  const { mutate } = useUpdateProfile(id);
  const { data: profile, isLoading } = useGetProfile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData ?? "",
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      description: values.description,
      skills: profile?.skills,
      birthday: profile?.birthday.toString(),
      experienceYears: profile?.experienceYears.toString(),
      resumeUrl: profile?.resumeUrl,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            Key Skills
          </span>
          <span className="text-sm text-muted-foreground font-semibold">
            Recruiters look for candidates with specific keyskills. Add them
            here to appear in searches.
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="focus-visible:ring-amber-600"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mt-4 flex items-center gap-x-2 justify-end">
              <Button
                variant="secondary"
                className="border border-black/40 rounded-3xl"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-3xl">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
