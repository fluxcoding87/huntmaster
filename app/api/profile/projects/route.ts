import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, workedFrom, workedTo, description, skills, projectUrl } =
      await req.json();

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
    if (!name || !workedFrom || !workedTo || !description || !skills) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const project = await db.project.create({
      data: {
        profileId: currentProfile.id,
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
    console.log("PROJECTS_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
