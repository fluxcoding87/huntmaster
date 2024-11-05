import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const { resumeUrl } = await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentProfile = await getCurrentProfile(user.id);

    if (!currentProfile) {
      return new NextResponse("Profile not found", { status: 400 });
    }
    if (currentProfile.userId !== user.id) {
      return new NextResponse("Invalid User", { status: 401 });
    }
    const profile = await db.profile.update({
      where: {
        userId: user.id,
        id: params.profileId,
      },
      data: {
        resumeUrl,
      },
    });
    return NextResponse.json(profile);
  } catch (e) {
    console.log("PROFILE_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
