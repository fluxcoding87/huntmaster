import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;
    const user = getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      name,
      employmentType,
      experience,
      location,
      description,
      openings,
      department,
      role,
      jobType,
      salary,
      aboutCompany,
      skills,
      imageUrl,
    } = await req.json();

    if (
      !name ||
      !employmentType ||
      !experience ||
      !location ||
      !openings ||
      !department ||
      !role ||
      !jobType ||
      !skills ||
      !salary
    ) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const job = await db.job.create({
      data: {
        userId,
        name,
        employmentType,
        experience: +experience,
        description,
        openings: +openings,
        department,
        role,
        skills,
        jobType,
        location,
        salary: +salary,
        aboutCompany,
        imageUrl,
      },
    });
    return NextResponse.json(job);
  } catch (e) {
    console.log("JOBS_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
