import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      company_name,
      designation,
      workedFrom,
      workedTo,
      current,
      notice_period,
      annual_salary,
      description,
    } = await req.json();

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentProfile = await getCurrentProfile(currentUser.id);

    if (!currentProfile) {
      return new NextResponse("Profile Not Found", { status: 400 });
    }
    if (currentProfile.userId !== currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (
      !company_name ||
      !designation ||
      !workedTo ||
      !workedFrom ||
      !description
    ) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const employment = await db.employment.create({
      data: {
        profileId: currentProfile.id,
        company_name,
        description,
        designation,
        workedFrom,
        workedTo,
        current,
        notice_period,
        annual_salary: +annual_salary,
      },
    });
    return NextResponse.json(employment);
  } catch (e) {
    console.log("PROJECTS_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
