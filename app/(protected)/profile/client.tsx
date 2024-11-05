"use client";

import { useCurrent } from "@/hooks/auth/use-current";
import { useGetProfile } from "@/hooks/profile/use-get-profile";
import { redirect } from "next/navigation";
import { ProfilePageForm } from "./_components/profile-page-form";
import { ProfileMainClient } from "./_components/profile-main-client";
import { Loader } from "@/components/loader";

export const ProfilePageClient = () => {
  const { data: profile, isLoading: profileIsLoading } = useGetProfile();
  const { data: user, isLoading: userIsLoading } = useCurrent();
  const isLoading = profileIsLoading || userIsLoading;
  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    redirect("/sign-in");
  }
  if (!profile) {
    return <ProfilePageForm user={user} />;
  } else {
    return <ProfileMainClient data={profile} />;
  }
};
