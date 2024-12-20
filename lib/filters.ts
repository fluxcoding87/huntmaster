import { jobDepartments } from "@/app/(protected)/list/_components/job-departments-list";

export const filterMap = [
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
      "International",
    ],
  },
  {
    label: "Department",
    type: "department",
    data: [...jobDepartments.map((item) => item.label)],
  },
  {
    label: "Salary",
    type: "salary",
    data: [
      "0-3 Lakhs",
      "3-6 Lakhs",
      "6-10 Lakhs",
      "10-15 Lakhs",
      "15-25 Lakhs",
      "25-50 Lakhs",
    ],
  },
  {
    label: "Role",
    type: "role",
    data: [
      "Software Development",
      "Quality Assurance and Testing",
      "Other Design",
      "Data Science & ML",
      "UI / UX",
      "DevOps",
      "BD / Pre Sales",
      "Non Voice",
      "DBA / Data warehousing",
      "Enterprise & B2B Sales",
      "Content, Editorial",
      "Corporate Training",
      "Other",
      "Customer Success",
      "Operations",
      "IT Network",
      "Accounting & Taxation",
      "IT Security",
      "Digital Marketing",
      "Marketing",
      "Technology / IT",
      "Teaching & Training - Other",
    ],
  },
];
