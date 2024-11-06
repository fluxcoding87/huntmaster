import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, comfortableIn } = await req.json();

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
    if (!name || !comfortableIn) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const lang = await db.language.create({
      data: {
        profileId: currentProfile.id,
        name,
        comfortableIn,
      },
    });
    return NextResponse.json(lang);
  } catch (e) {
    console.log("LANGUAGES_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
