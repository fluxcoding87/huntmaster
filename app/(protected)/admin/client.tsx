"use client";
import { DataTable } from "@/components/data-table";
import { Loader } from "@/components/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrent } from "@/hooks/auth/use-current";
import { useGetEmployers } from "@/hooks/employer/use-get-employers";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
export const AdminPanelClient = () => {
  const { data: user, isLoading: isUserLoading } = useCurrent();
  const { data: employers, isLoading: isEmployersLoading } = useGetEmployers();
  const adminIds: string[] = process.env.NEXT_PUBLIC_ADMIN_IDS
    ? process.env.NEXT_PUBLIC_ADMIN_IDS.split(", ")
    : [];
  const isAdmin: boolean = !!adminIds.find((item) => item === user?.email);
  const isLoading = isUserLoading || isEmployersLoading;
  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    return redirect("/sign-in");
  }
  if (!isAdmin) {
    return redirect("/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">
          <span className="text-amber-600">Huntmaster </span> Admin Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <div className="felx flex-col justify-center">
            <h3 className="font-semibold">Enquires for Employers</h3>
            <p className="text-sm text-muted-foreground font-semibold">
              All the people who want to be an employer.
            </p>
          </div>
          <div>
            <DataTable columns={columns} data={employers ?? []} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
