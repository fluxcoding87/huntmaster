import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { educationId, title, description } = await req.json();
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

    const achievement = await db.achievement.create({
      data: {
        profileId: currentProfile.id,
        educationId,
        title,
        description,
      },
    });
    return NextResponse.json(achievement);
  } catch (e) {
    console.log("ACHIEVEMENTS_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
