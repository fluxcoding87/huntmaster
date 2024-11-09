"use client";
import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
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
import { useCurrent } from "@/hooks/auth/use-current";
import { usePostEmployer } from "@/hooks/employer/use-post-employer";
import { useGetProfile } from "@/hooks/profile/use-get-profile";
import { addEmployerSchema } from "@/types/employer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const EmployerForm = () => {
  const { data: user } = useCurrent();
  const { data: profile } = useGetProfile();
  const { mutate, isPending } = usePostEmployer();
  const form = useForm<z.infer<typeof addEmployerSchema>>({
    resolver: zodResolver(addEmployerSchema),
    defaultValues: {
      name: user?.name ?? "",
      name_of_organization: "",
      email: user?.email ?? "",
      contact_number: profile?.phoneNumber ?? "",
      city: "",
    },
  });
  const onSubmit = (values: z.infer<typeof addEmployerSchema>) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          toast.success("You will be sent an email regarding your enquiry!");
        },
      }
    );
  };
  return (
    <Card className="border border-amber-600 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="text-center border p-2 rounded-xl">
          <span className="text-xl font-bold tracking-wide">Enquire Now</span>
          <div className="text-muted-foreground text-xs">
            You will be sent an email regarding to your enquiry
          </div>
        </CardTitle>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Your Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name_of_organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter name of organization"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter name of organization"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-center justify-center">
                <Button className="w-full">Enquire</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
