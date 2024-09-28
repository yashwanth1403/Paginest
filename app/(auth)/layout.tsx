import Authbanner from "@/components/Auth/Authbanner";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "300"],
});
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("flex flex-col min-h-screen", poppins.className)}>
      <ToastContainer position="top-center" />
      <Authbanner />
      {children}
    </div>
  );
};

export default AuthLayout;
