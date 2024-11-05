import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await db.job.findMany();

    return NextResponse.json(jobs);
  } catch (e) {
    console.log("GET_JOBS", e);

    return new NextResponse("Intenal Error", { status: 500 });
  }
}
