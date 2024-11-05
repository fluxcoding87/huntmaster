"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "@/types/auth";
import { useRegister } from "@/hooks/auth/use-register";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import { signIn } from "next-auth/react";
export const SignUpCard = () => {
  const { mutate, isPending } = useRegister();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerFormSchema>> = (
    values: z.infer<typeof registerFormSchema>
  ) => {
    mutate(values);
  };

  return (
    <Card className="mt-10 max-w-[520px] mx-auto shadow-none px-8">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-xl md:text-2xl">
          Sign Up to{" "}
          <span className="text-amber-600 font-bold">Huntmaster</span>
        </CardTitle>
        <div className="text-sm text-center text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href={"/terms"} className="text-amber-600">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href={"/terms"} className="text-amber-600">
            Terms of Service
          </Link>
        </div>
      </CardHeader>
      <div className="my-2">
        <Separator className="bg-neutral-300" />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      className="px-4 focus-visible:ring-transparent"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter new email"
                      type="email"
                      className="px-4 focus-visible:ring-transparent"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter new password"
                      type="password"
                      className="px-4 focus-visible:ring-transparent"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="my-2">
        <Separator className="bg-neutral-300" />
      </div>
      <div className="flex flex-col gap-y-4 justify-center my-4">
        <div className="rounded-lg bg-white flex items-center justify-center p-2 gap-x-2 border-2 hover:opacity-75 transition cursor-pointer">
          <FcGoogle className="size-5" />
          <span>Continue with Google</span>
        </div>
        <div
          onClick={() => signIn("github")}
          className="rounded-lg bg-white flex items-center justify-center p-2 gap-x-2 border-2 hover:opacity-75 transition cursor-pointer"
        >
          <AiFillGithub className="size-5" />
          <span>Continue with Github</span>
        </div>
      </div>
      <div className="w-full text-center my-6">
        Already have an account with us?{" "}
        <Link href="/sign-in" className="text-amber-600">
          Sign In
        </Link>
      </div>
    </Card>
  );
};
