import { NavButton } from "./NavButton";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import LogoWrapper from "./LogoWrapper";

const Appbar = () => {
  return (
    <div className="p-2 md:p-8 flex items-center h-[4rem] justify-between w-full md:px-6 shadow-lg border border-b-2 fixed bg-white dark:bg-black z-30">
      <Link href={"/"} passHref>
        <div className="flex items-center justify-center gap-1">
          <LogoWrapper styleImage="w-[35px] h-[35px] md:w-[60px] md:h-[60px]" />
          <h1 className=" font-semibold text-lg md:text-2xl">PagiNest</h1>
        </div>
      </Link>

      <div className="flex gap-1.5 md:gap-2">
        <NavButton type="signin" variant={"navlogin"} />
        <NavButton type="signup" variant={"default"} />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Appbar;
