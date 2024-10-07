"use server";
import { z } from "zod";
import { LoginSchema, SignupSchema } from "@/Types";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { generatetoken } from "@/lib/token";
import { sendVerification } from "@/lib/send";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
type formSignup = z.infer<typeof SignupSchema>;
type formLogin = z.infer<typeof LoginSchema>;
export async function OnSignup(values: formSignup) {
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
        const verificationToken = await generatetoken(payload.data.email);
        await sendVerification(payload.data.email, verificationToken.token);
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

export async function login(values: formLogin) {
  const { data, success } = LoginSchema.safeParse(values);
  if (!success) {
    return { success: false, message: "Invalid Credentails Format" };
  }
  const { email, password } = data;
  const userExists = await getUserByEmail(email);
  if (!userExists || !userExists.email || !userExists.password) {
    return { success: false, message: "User does not exist" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return {
            success: false,
            message: "Please confirm yours email address",
          };
      }
    }

    throw error;
  }

  return { success: true, message: "User logged in" };
}

//verifies Email
export async function newVerifyEmail(token: string) {
  try {
    const existingToken = await prisma.verificationToken.findFirst({
      where: {
        token: token,
      },
    });

    if (!existingToken) {
      return { error: "Invalid token" };
    }
    if (new Date() > existingToken.expires) {
      await prisma.user.delete({
        where: {
          email: existingToken.email,
        },
      });
      return { error: "Token expired,please signup again" };
    }
    const user = await prisma.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });

    if (!user) {
      return { error: "User not Found" };
    }

    const updateUser = await prisma.user.update({
      where: {
        email: existingToken.email,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return {
      success: " Your email is now verified",
    };
  } catch (err) {
    console.error(err);
    return { error: "An unexpected error occured" };
  }
}
