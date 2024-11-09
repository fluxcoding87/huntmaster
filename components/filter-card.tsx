"use client";

import { Filter } from "./filter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { State } from "country-state-city";

const filterMap = [
  {
    label: "Work Mode",
    type: "work",
    data: ["Work from office", "Remote"],
  },
  {
    label: "Location",
    type: "location",
    data: [
      "Pune",
      "Bengaluru",
      "Delhi/NCR",
      "Chandigarh",
      "Hyderabad",
      "Mumbai (All Areas)",
      "Chennai",
      "Surat",
      "New Delhi",
      "Indore",
      "Kolkata",
      "Ahemdabad",
      "Noida",
      "Gurugram",
      "Coimbatore",
      "Jaipur",
      "Kochi",
      "Mohali",
      "Vadodara",
      "Puducherry",
      "Rajkot",
      "Kozhikode",
      "Nashik",
      "Luknow",
    ],
  },
];

export const FilterCard = () => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-base font-semibold">All filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-2 -mt-2" />
        <div className="flex flex-col justify-center">
          {filterMap.map((item) => (
            <Filter
              key={item.type}
              label={item.label}
              data={item.data}
              type={item.type}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
