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

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type formfield = z.infer<typeof schema>;

const LoginForm = () => {
  const form = useForm<formfield>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: formfield) {
    console.log(values);
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <Button
            type="submit"
            className="w-full font-bold bg-sky-400 hover:bg-sky-700"
          >
            login
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
