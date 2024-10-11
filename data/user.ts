import prisma from "@/lib/db";
import { string } from "zod";
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

export async function getUserById(id: string) {
  try {
    return await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}
