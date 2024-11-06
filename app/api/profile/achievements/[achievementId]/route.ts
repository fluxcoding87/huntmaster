import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { achievementId: string } }
) {
  try {
    const { title, description, educationId } = await req.json();
    const { achievementId } = await params;
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
    if (!title || !description || !educationId) {
      return new NextResponse("Missing Fields", { status: 400 });
    }
    const achievement = await db.achievement.update({
      where: {
        id: achievementId,
        profileId: currentProfile.id,
      },
      data: {
        title,
        description,
        educationId,
      },
    });
    return NextResponse.json(achievement);
  } catch (e) {
    console.log("ACHIEVEMENT_PATCH", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { achievementId: string } }
) {
  try {
    const { achievementId } = await params;
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

    const achievement = await db.achievement.delete({
      where: {
        id: achievementId,
        profileId: currentProfile.id,
      },
    });
    return NextResponse.json(achievement);
  } catch (e) {
    console.log("ACHIEVEMENT_DELETE", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
