import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const {
      qualification,
      college_name,
      startingTime,
      passoutTime,
      course_name,
      course_type,
      grade,
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

    const education = await db.education.create({
      data: {
        profileId: currentProfile.id,
        qualification,
        college_name,
        startingTime: new Date(startingTime),
        passoutTime: new Date(passoutTime),
        course_name,
        course_type,
        grade: +grade,
      },
      include: {
        profile: true,
      },
    });
    return NextResponse.json(education);
  } catch (e) {
    console.log("EDUCATION_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
