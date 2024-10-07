"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FormError from "./FormError";
import { newVerifyEmail } from "@/actions/route";
import { Button } from "../ui/button";

const VerifyEmailForm = () => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      if (success || error || isSubmitting) return; // Skip if already submitting
      if (!token) {
        setError("Token required");
        return;
      }

      setIsSubmitting(true);
      const result = await newVerifyEmail(token);
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess(result.success);
      }
      setIsSubmitting(false);
    };

    verifyEmail();
  }, [token, isSubmitting, error, success]); // Depend only on token and isSubmitting

  return (
    <div className="flex flex-col gap-5 text-center">
      {!success && !error && <p>Loading...</p>}
      {!success && error && <FormError message={error} />}
      {success && (
        <div className="text-green-500 text-lg font-bold bg-green-50/34 rounded-lg p-2">
          {success}
        </div>
      )}

      <Button
        className="bg-sky-400 hover:bg-sky-700 font-bold"
        onClick={() => {
          router.push("/login");
        }}
      >
        Back to login
      </Button>
    </div>
  );
};

const VerifyEmailWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerifyEmailForm />
  </Suspense>
);

export default VerifyEmailWrapper;
