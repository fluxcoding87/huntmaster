import { getCurrentUser } from "@/actions/get-current-user";
import { SignInCard } from "../_components/sign-in-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return <SignInCard />;
};

export default SignInPage;
