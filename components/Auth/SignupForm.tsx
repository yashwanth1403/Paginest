"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import SocialAuth from "./SocialAuth";
import FormFooter from "./FormFooter";
import { SignupSchema } from "@/Types";
import { OnSignup } from "@/actions/route";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { CheckCheckIcon } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
type formfield = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const [PasswordShow, setShowPassword] = useState(false);
  const ChangeTypePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [emailVerificationSent, setemailVerificationSent] = useState(false);
  const [loading, setloading] = useState(false);
  const form = useForm<formfield>({
    resolver: zodResolver(SignupSchema),
  });
  const {
    setError,
    formState: { errors },
  } = form;
  const handleSubmit = async (values: formfield) => {
    try {
      setloading(true);
      const result = await OnSignup(values);
      if (result.success) {
        setloading(false);
        setemailVerificationSent(true);
      } else {
        setloading(false);
        if (result.error) {
          setError("email", { message: result.error });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("An unknown error occurred");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <div className="text-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., John Doe 🌟"
                    className="p-1.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="yourname@email.com ✉️"
                    className="p-1.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {errors.email && <p>{errors.email.message}</p>}{" "}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Password</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      placeholder="Password 🔒"
                      className="p-1.5"
                      {...field}
                      type={PasswordShow ? "text" : "password"}
                      suffix={
                        PasswordShow ? (
                          <EyeIcon
                            className="text-xs"
                            onClick={ChangeTypePassword}
                          />
                        ) : (
                          <EyeOffIcon
                            className=" opacity-75"
                            onClick={ChangeTypePassword}
                          />
                        )
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {emailVerificationSent ? (
            <div className="text-green-500 dark:text-green-300 py-2 flex gap-2">
              <CheckCheckIcon />
              <p>Email Verification Sent! 📧</p>
            </div>
          ) : (
            ""
          )}
          <Separator className="my-2" />
          <Button
            type="submit"
            disabled={loading}
            className="w-full font-bold bg-sky-400 hover:bg-sky-700"
          >
            {loading ? "loading... ⏳ " : "Signup  🚀"}
          </Button>
        </form>
      </Form>
      <Separator className="my-2" />
      <div className="space-y-2">
        <SocialAuth />
        <FormFooter text="Already have an account?" navigate="login" />
      </div>
    </div>
  );
};

export default SignupForm;
