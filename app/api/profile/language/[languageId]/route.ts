import { getCurrentProfile } from "@/actions/get-current-profile";
import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { languageId: string } }
) {
  try {
    const { name, comfortableIn } = await req.json();
    const { languageId } = await params;
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

    const lang = await db.language.update({
      where: {
        id: languageId,
        profileId: currentProfile.id,
      },
      data: {
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

export async function DELETE(
  req: Request,
  { params }: { params: { languageId: string } }
) {
  try {
    const { languageId } = await params;
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

    const language = await db.language.delete({
      where: {
        id: languageId,
        profileId: currentProfile.id,
      },
    });
    return NextResponse.json(language);
  } catch (e) {
    console.log("LANGUAGE_DELETE", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
