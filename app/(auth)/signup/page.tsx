import SignupForm from "@/components/Auth/SignupForm";
import CardWrapper from "@/components/CardWrapper";

const SignupPage = () => {
  return (
    <div className="flex-1 flex justify-center">
      <CardWrapper
        title="Signup PagiNest"
        description="Join us to organize, plan, and create—all in one place!"
      >
        <SignupForm />
      </CardWrapper>
    </div>
  );
};

export default SignupPage;
