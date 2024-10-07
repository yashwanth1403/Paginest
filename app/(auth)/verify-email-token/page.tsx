import VerifyEmailForm from "@/components/Auth/VerifyEmailForm";
import CardWrapper from "@/components/CardWrapper";
const VerifyEmail = () => {
  return (
    <div className="flex items-center justify-center text-center">
      <CardWrapper
        title="🚀 Confirming Your Email Address!"
        classname="w-[270px] md:w-[370px]"
      >
        <div>
          <VerifyEmailForm />
        </div>
      </CardWrapper>
    </div>
  );
};

export default VerifyEmail;
