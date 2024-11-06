import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { profileSchema } from "@/types/profile";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        educations: true,
        projects: true,
        employments: true,
        achievements: true,
        languages: true,
      },
    });

    if (!profile) {
      return NextResponse.json(undefined);
    }

    return NextResponse.json(profile);
  } catch (e) {
    console.log("PROFILE_GET", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const {
      imageUrl,
      phoneNumber,
      gender,
      location,
      birthday,
      experienceYears,
      skills,
      role,
      resumeUrl,
      description,
    }: z.infer<typeof profileSchema> = await req.json();

    if (!birthday || !experienceYears || !skills || !resumeUrl) {
      return new NextResponse("Missing Important fields", { status: 400 });
    }

    const birthDate = new Date(birthday);
    let newLocation = location;

    if (!location) {
      newLocation = "Remote";
    }

    const profile = await db.profile.create({
      data: {
        userId: user.id,
        imageUrl,
        phoneNumber,
        gender,
        location: newLocation,
        birthday: birthDate,
        experienceYears: +experienceYears,
        skills,
        role,
        resumeUrl,
        description,
      },
    });
    return NextResponse.json(profile);
  } catch (e) {
    console.log("PROFILE_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
