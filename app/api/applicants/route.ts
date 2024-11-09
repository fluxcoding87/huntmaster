import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentProfile = await getCurrentProfile(currentUser.id);
    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 400 });
    }

    const applicants = await db.applicant.findMany({
      where: {
        profileId: currentProfile.id,
      },
      include: {
        job: true,
      },
    });

    return NextResponse.json(applicants);
  } catch (e) {
    console.log("APPLICANTS_GET", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
