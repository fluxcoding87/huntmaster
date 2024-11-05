import db from "@/lib/db";

export async function getCurrentProfile(userId: string) {
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });
    if (!profile) {
      return null;
    }
    return profile;
  } catch (e) {
    return null;
  }
}
