import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { employmentId: string } }
) {
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
    const { employmentId } = await params;
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

    const employment = await db.employment.update({
      where: {
        id: employmentId,
        profileId: currentProfile.id,
      },
      data: {
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
    console.log("EMPLOYMENT_PATCH", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { employmentId: string } }
) {
  try {
    const { employmentId } = await params;
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentProfile = await getCurrentProfile(currentUser.id);

    if (!currentProfile) {
      return new NextResponse("Profile Not found", { status: 400 });
    }
    if (currentProfile.userId !== currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const employment = await db.employment.delete({
      where: {
        id: employmentId,
        profileId: currentProfile.id,
      },
    });
    return NextResponse.json(employment);
  } catch (e) {
    console.log("EMPLOYMENT_DELETE", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
