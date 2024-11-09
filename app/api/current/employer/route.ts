import { getCurrentUser } from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, contact_number, name_of_organization, city } =
      await req.json();
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name || !email || !contact_number || !name_of_organization || !city) {
      return new NextResponse("Missing fields", { status: 400 });
    }
    const employer = await db.employer.create({
      data: {
        userId: user.id,
        name,
        email,
        contact_number,
        name_of_organization,
        city,
      },
    });
    return NextResponse.json(employer);
  } catch (e) {
    console.log("EMPLOYERS_POST", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const adminIds: string[] = process.env.NEXT_PUBLIC_ADMIN_IDS
      ? process.env.NEXT_PUBLIC_ADMIN_IDS.split(", ")
      : [];
    const isAdmin: boolean = !!adminIds.find((item) => item === user?.email);
    if (!isAdmin) {
      return new NextResponse("Admin not found", { status: 400 });
    }

    const employers = await db.employer.findMany();

    return NextResponse.json(employers);
  } catch (e) {
    console.log("EMPLOYERS_GET", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
