"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Employer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { AllowListJob } from "./allow-list-job";

export const columns: ColumnDef<Employer>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return <div>{+row.id + 1}</div>;
    },
  },
  {
    accessorKey: "name_of_organization",
    header: "Organization",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact_number",
    header: "Contact",
  },

  {
    accessorKey: "name",
    header: "Employer Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "is_Allowed",
    header: "Allow to list jobs",
    cell: ({ row }) => {
      const is_Allowed: boolean = row.getValue("is_Allowed");
      const id: string = row.getValue("id");

      return <AllowListJob isAllowed={is_Allowed} id={id} />;
    },
  },
];
