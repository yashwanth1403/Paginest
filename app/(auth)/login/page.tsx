import CardWrapper from "@/components/CardWrapper";
import LoginForm from "@/components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex-1 flex justify-center px-2">
      <CardWrapper
        title="Login PagiNest"
        description="Welcome back! Let's turn ideas into action"
      >
        <LoginForm />
      </CardWrapper>
    </div>
  );
};

export default LoginPage;
