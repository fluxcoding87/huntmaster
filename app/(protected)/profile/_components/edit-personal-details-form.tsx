"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompleteProfile, editProfileSchema } from "@/types/profile";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CountryStateCitySelect from "../../list/_components/country-state-city-select";
import { useCallback } from "react";
import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/hooks/user/use-update-user";

interface EditPersonalDetailsFormProps {
  data: CompleteProfile;
  onCancel: () => void;
}

export const EditPersonalDetailsForm = ({
  data: initialData,
  onCancel,
}: EditPersonalDetailsFormProps) => {
  const { mutate: updateProfile, isPending: isProfilePending } =
    useUpdateProfile(initialData.id);
  const { mutate: updateUser, isPending: isUserPending } = useUpdateUser();

  const isPending = isProfilePending || isUserPending;

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      phoneNumber: initialData?.phoneNumber ?? "",
      gender: initialData?.gender ?? "",
      location: initialData?.location ?? "",
      birthday: initialData?.birthday.toString().split("T")[0] ?? "",
      experienceYears: initialData?.experienceYears.toString() ?? "",
      role: initialData?.role ?? "",
      name: initialData?.user.name ?? "",
    },
  });
  const onSubmit = (values: z.infer<typeof editProfileSchema>) => {
    updateProfile({
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      location: values.location,
      birthday: values.birthday,
      experienceYears: values.experienceYears,
      role: values.role,
    });
    updateUser({
      name: values.name,
    });
  };
  const onLocationChange = useCallback(
    (location: string) => {
      form.setValue("location", location);
    },
    [form]
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>All about you</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="transgender">Transgender</SelectItem>
                        <SelectItem value="do_not_specify">
                          Do Not Specify
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
                <FormItem>
                  <FormLabel>Date of Birth (MM/DD/YYYY)</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Location</FormLabel>
                  <FormControl>
                    <CountryStateCitySelect
                      onLocationChange={onLocationChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value || ""} // Ensure value is empty string if undefined
                      onChange={(value) => {
                        // Handle clearing the value properly
                        field.onChange(value || ""); // If value is null/undefined, set to ""
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="experienceYears"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
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
                <FormItem>
                  <FormLabel>Desired Role</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 ml-auto">
              <Button
                type="button"
                variant="secondary"
                className="border border-black/40"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
