import prisma from "@/lib/db";
export async function getVerificationTokenByEmail(email: string) {
  try {
    return await prisma.verificationToken.findFirst({
      where: {
        email: email,
      },
    });
  } catch (err) {
    return null;
  }
}
