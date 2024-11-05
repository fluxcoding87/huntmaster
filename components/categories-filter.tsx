"use client";

import {
  BanknoteIcon,
  BriefcaseIcon,
  GlobeIcon,
  HomeIcon,
  NetworkIcon,
  User2Icon,
} from "lucide-react";
import {
  MdAccountBalance,
  MdAccountCircle,
  MdDesignServices,
} from "react-icons/md";

const categoriesMap = [
  {
    icon: BanknoteIcon,
    label: "Banking",
  },
  {
    icon: HomeIcon,
    label: "Work from Home",
  },
  {
    icon: User2Icon,
    label: "HR",
  },
  {
    icon: BriefcaseIcon,
    label: "Sales",
  },
  {
    icon: MdAccountBalance,
    label: "Accounting",
  },
  {
    icon: GlobeIcon,
    label: "IT",
  },
  {
    icon: MdDesignServices,
    label: "UI/UX",
  },
  {
    icon: NetworkIcon,
    label: "Networking",
  },
];

export const CategoriesFilter = () => {
  return (
    <div className="space-y-2 w-full mb-10">
      <div className="text-lg font-medium">Popular categories</div>
      <div className="flex items-center gap-x-2">
        {categoriesMap.map((item) => (
          <div
            key={item.label}
            className="flex flex-auto items-center justify-center bg-amber-600/30 px-4 py-2 text-sm font-medium gap-x-2 rounded-lg cursor-pointer hover:opacity-75 transition"
          >
            <item.icon className="size-4" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
