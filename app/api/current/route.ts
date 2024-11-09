import { getSession } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return new NextResponse("User not found", { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        employer: true,
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    console.log("USER_GET", e);
  }
}
