"use client";
import Image from "next/image";
import { FcBriefcase, FcFactory, FcOrganization } from "react-icons/fc";
import { EmployerForm } from "./_components/employer-form";
import { useCurrent } from "@/hooks/auth/use-current";
import { Loader } from "@/components/loader";
import { redirect } from "next/navigation";

const EmployerPage = () => {
  const { data: user, isLoading } = useCurrent();
  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    redirect("/sign-in");
  }
  if (user.employer) {
    if (user?.employer.is_Allowed) {
      return redirect("/employer/dashboard");
    } else {
      return (
        <div className="w-full mt-20">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold tracking-tighter">
              You have already applied to become an employer on{" "}
              <span className="text-amber-600">Huntmaster.</span>
            </h3>
            <p className="text-muted-foreground text-xl mt-1 tracking-wide">
              Please wait till we review your application it usually takes upto
              72 hours.
            </p>
            <div className="relative overflow-hidden size-80">
              <Image fill src="/already.png" alt="already" />
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="grid grid-cols-12 gap-x-4 mt-6">
      <div className="col-span-7 px-2">
        <div className="flex flex-col justify-center gap-y-8">
          <div className="text-3xl font-semibold text-center">
            <span className="tracking-wide">
              One stop solution for{" "}
              <span className="text-amber-600">end-to-end</span> hiring.
            </span>
            <div className="text-sm font-semibold flex items-center gap-x-1 text-muted-foreground justify-center">
              <span className="text-center">
                Unparalleled reach with students from Engineering, MBA & Other
                Graduate campuses across India.
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-x-2 ml-3">
              <div className="bg-white border p-2 rounded-full">
                <FcBriefcase className="size-8 font-thin text-amber-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold">3000 +</span>
                <span className="text-xs font-medium">
                  Students placed last year.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="bg-white border p-2 rounded-full">
                <FcFactory className="size-8 font-thin text-amber-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold">1000 +</span>
                <span className="text-xs font-medium">Campus Network</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="bg-white border p-2 rounded-full">
                <FcOrganization className="size-8 font-thin text-amber-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold">2500 +</span>
                <span className="text-xs font-medium">Employers Reach</span>
              </div>
            </div>
          </div>
        </div>
        <div className="size-full flex justify-center">
          <div className="size-[500px] object-center overflow-hidden relative mr-10">
            <Image src="/employer.png" fill alt="employer" />
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <EmployerForm />
      </div>
    </div>
  );
};

export default EmployerPage;
