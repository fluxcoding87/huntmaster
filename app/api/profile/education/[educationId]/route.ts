import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { educationId: string } }
) {
  try {
    const { educationId } = await params;
    const body = await req.json();
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
    if (!body) {
      return new NextResponse("Missing Fields", { status: 400 });
    }
    const {
      qualification,
      college_name,
      startingTime,
      passoutTime,
      course_name,
      course_type,
      grade,
    } = body;

    const education = await db.education.update({
      where: {
        id: educationId,
        profileId: currentProfile.id,
      },
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
    });
    return NextResponse.json(education);
  } catch (e) {
    console.log("EDUCATION_PATCH", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { educationId: string } }
) {
  try {
    const { educationId } = await params;
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

    const education = await db.education.delete({
      where: {
        id: educationId,
        profileId: currentProfile.id,
      },
    });
    return NextResponse.json(education);
  } catch (e) {
    console.log("EDUCATION_DELETE", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
