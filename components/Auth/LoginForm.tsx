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
import { LoginSchema } from "@/Types";
import { login } from "@/actions/route";
import { useState } from "react";
import FormError from "./FormError";

type formfield = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const form = useForm<formfield>({
    resolver: zodResolver(LoginSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function onSubmit(values: formfield) {
    try {
      setLoading(true);
      const result = await login(values);
      if (!result.success) {
        setError(result.message);
        setLoading(false);
      }
      setSuccess(result.message);
      setLoading(false);
    } catch (error) {
      setError("An unexcepted occured");
      setLoading(false);
    }
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="yourname@email.com ✉️" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password 🔒" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {success && <p className="text-green-500 text-md"></p>}
          <Button
            type="submit"
            className="w-full font-bold bg-sky-400 hover:bg-sky-700"
          >
            {loading ? "loading...⌛" : "login"}
          </Button>
        </form>
      </Form>
      <Separator className="my-3" />
      <div className="space-y-6">
        <SocialAuth />
        <FormFooter text="Don't have an account yet?" navigate="signup" />
      </div>
    </div>
  );
};

export default LoginForm;
