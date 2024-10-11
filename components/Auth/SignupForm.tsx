"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/CardWrapper";
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
import { resendEmailSchema, SignupSchema } from "@/Types";
import { OnResendEmail, OnSignup } from "@/actions/route";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

type formfield = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const [PasswordShow, setShowPassword] = useState(false);
  const [emailVerificationSent, setemailVerificationSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, seterror] = useState<string | null>(null);
  const [resendPage, setResendPage] = useState(false);
  const [loading, setloading] = useState(false);
  const ChangeTypePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const form = useForm<formfield>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const {
    setError,
    formState: { errors },
  } = form;

  const handleSubmit = async (values: formfield) => {
    try {
      setloading(true);
      const result = await OnSignup(values);
      setloading(false);
      if (result.success) {
        setemailVerificationSent(true);
        setSuccess(true);
      } else {
        if (result?.isEmailSent) {
          setemailVerificationSent(true);
          seterror(result.error);
        } else {
          setError("email", { message: result.error });
        }
      }
    } catch (error) {
      toast.error("An unknown error occurred");
    }
  };

  const resendForm = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resendEmailSchema),
  });

  async function handleResend(value: { email: string }) {
    try {
      setloading(true);
      const result = await OnResendEmail(value);
      console.log(result);
      if (result?.success) {
        toast.success(result.message, {
          className: "text-xs",
        });
        setloading(false);
      } else {
        toast.error(result?.message);
        setloading(false);
      }
    } catch (err) {
      toast.error("An unexcepted error occured");
    }
  }
  return (
    <div className="flex-1 flex justify-center p-2">
      <div className="relative">
        {resendPage && (
          <div className="flex justify-center items-center">
            <div className=" bg-slate-200 dark:bg-white p-5 rounded shadow-lg space-y-3">
              <div className="text-lg font-bold text-black">
                Resend Verification Email
              </div>
              <div className="text-sm font-light">
                Check your spam folder if you dont see our email.
              </div>
              <Form {...resendForm}>
                <form
                  onSubmit={resendForm.handleSubmit(handleResend)}
                  className="space-y-3"
                >
                  <FormField
                    name="email"
                    control={resendForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-black text-md">
                            Email address
                          </FormLabel>
                          <FormControl>
                            <input
                              placeholder="yourname@email.com ✉️"
                              {...field}
                              className="p-2 outline-none rounded w-full dark:bg-slate-300 text-black"
                            ></input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  ></FormField>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full dark:font-bold bg-sky-400 hover:bg-sky-700"
                  >
                    Resend Email 🚀
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}
        {!resendPage && (
          <div>
            <CardWrapper
              title="Signup PagiNest"
              description="Join us to organize, plan, and create—all in one place!"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-1"
                >
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
                          {errors.email && <p>{errors.email.message}</p>}
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
                          <div className="relative">
                            <Input
                              placeholder="Password 🔒"
                              className="p-1.5"
                              {...field}
                              type={PasswordShow ? "text" : "password"}
                            />
                            {PasswordShow ? (
                              <EyeIcon
                                className="absolute right-2 top-2 cursor-pointer"
                                onClick={ChangeTypePassword}
                              />
                            ) : (
                              <EyeOffIcon
                                className="absolute right-2 top-2 cursor-pointer"
                                onClick={ChangeTypePassword}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator className="my-2" />
                  {success && (
                    <FormSuccess message="Email sent. Check spam folder if not found."></FormSuccess>
                  )}
                  {error && !success && <FormError message={error}></FormError>}

                  {!emailVerificationSent && (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full font-bold bg-sky-400 hover:bg-sky-700"
                    >
                      {loading ? "loading... ⏳ " : "Signup  🚀"}
                    </Button>
                  )}
                  {emailVerificationSent && (
                    <Button
                      onClick={() => {
                        setResendPage((resendPage) => !resendPage);
                      }}
                      variant={"default"}
                      className="w-full font-bold"
                    >
                      {loading ? "loading... ⏳ " : "Resend Email"}
                    </Button>
                  )}
                </form>
              </Form>
              <Separator className="my-2" />
              <div className="space-y-2">
                <SocialAuth />
                <FormFooter text="Already have an account?" navigate="login" />
              </div>
            </CardWrapper>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
