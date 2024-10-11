import { v4 as uuidv4 } from "uuid";
import prisma from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
export async function generatetoken(email: string) {
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 3600 * 1;
  const verificationToken = await getVerificationTokenByEmail(email);
  if (verificationToken) {
    await prisma.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });
  }

  const newVerificationToken = await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires: new Date(expires),
    },
  });

  return newVerificationToken;
}
