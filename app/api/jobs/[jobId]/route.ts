import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!jobId) {
      return new NextResponse("Job Id Required", { status: 400 });
    }

    const job = await db.job.findUnique({
      where: {
        id: jobId,
      },
    });

    return NextResponse.json(job);
  } catch (e) {
    console.log("JOB_ID_GET", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
