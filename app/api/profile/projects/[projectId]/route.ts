import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { name, workedFrom, workedTo, description, skills, projectUrl } =
      await req.json();
    const { projectId } = await params;
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

    const project = await db.project.update({
      where: {
        id: projectId,
        profileId: currentProfile.id,
      },
      data: {
        name,
        workedFrom,
        workedTo,
        description,
        skills,
        projectUrl,
      },
    });
    return NextResponse.json(project);
  } catch (e) {
    console.log("PROJECT_PATCH", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { projectId } = await params;
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

    const project = await db.project.delete({
      where: {
        id: projectId,
        profileId: currentProfile.id,
      },
    });
    return NextResponse.json(project);
  } catch (e) {
    console.log("PROJECT_DELETE", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
