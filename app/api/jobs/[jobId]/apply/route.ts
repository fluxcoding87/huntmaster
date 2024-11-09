import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = await params;
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentProfile = await getCurrentProfile(currentUser.id);
    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 400 });
    }
    if (currentProfile.userId !== currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const applicant = await db.applicant.create({
      data: {
        jobId,
        profileId: currentProfile.id,
      },
    });

    return NextResponse.json(applicant);
  } catch (e) {
    console.log("APPLY_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = await params;
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentProfile = await getCurrentProfile(currentUser.id);
    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 400 });
    }

    const applicant = await db.applicant.findFirst({
      where: {
        jobId,
        profileId: currentProfile.id,
      },
    });
    return NextResponse.json(applicant);
  } catch (e) {
    console.log("APPLICANT_GET", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
