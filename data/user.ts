import prisma from "@/lib/db";
export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}
