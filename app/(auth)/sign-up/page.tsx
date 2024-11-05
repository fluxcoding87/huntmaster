import { getCurrentUser } from "@/actions/get-current-user";
import { SignUpCard } from "../_components/sign-up-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return <SignUpCard />;
};

export default SignInPage;
