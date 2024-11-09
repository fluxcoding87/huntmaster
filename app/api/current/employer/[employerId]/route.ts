import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { employerId: string } }
) {
  try {
    const { is_Allowed } = await req.json();
    const { employerId } = await params;

    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const employer = await db.employer.update({
      where: {
        id: employerId,
      },
      data: {
        is_Allowed,
      },
    });
    return NextResponse.json(employer);
  } catch (e) {
    console.log("EMPLOYERS_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
