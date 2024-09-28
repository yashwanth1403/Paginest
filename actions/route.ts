"use server";
import { z } from "zod";
import { SignupSchema } from "@/Types";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
type formfield = z.infer<typeof SignupSchema>;
export async function OnSignup(values: formfield) {
  try {
    const payload = SignupSchema.safeParse(values);

    if (payload.success) {
      const ExistUser = await prisma.user.findFirst({
        where: {
          email: payload.data.email,
        },
      });
      if (ExistUser) {
        return {
          success: false,
          error: "Email already exists",
          statusCode: 400,
        };
      } else {
        const hashedPassword = await bcrypt.hash(payload.data.password, 10);
        const lowerCaseEmail = payload.data.email.toLowerCase();
        await prisma.user.create({
          data: {
            name: payload.data.username,
            email: lowerCaseEmail,
            password: hashedPassword,
          },
        });
        await prisma.user.deleteMany({});
        return { success: true, statusCode: 200 };
      }
    } else {
      return {
        success: false,
        error: "Invalid User Inputs",
        statusCode: 400,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "An unexpected error occurred",
      statusCode: 500,
    };
  }
}
