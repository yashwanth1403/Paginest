"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, MenuIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserNav from "./UserNav";
import { ModeToggle } from "@/components/mode-toggle";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const isMobile = useMediaQuery("(max-width:786px)");
  const SidebarRef = useRef<HTMLDivElement>(null);
  const NavbarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isMenuBar, setIsMenuBar] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);
  const [isCursorNearLeft, setIsCursorNearLeft] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const trackCursor = (e: MouseEvent) => {
    if (!isResizing && e.clientX <= 300) {
      setIsCursorNearLeft(true);
    } else {
      setIsCursorNearLeft(false);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 300 && isCollapse) newWidth = 299;
    if (newWidth > 480) newWidth = 480;

    if (SidebarRef.current && NavbarRef.current) {
      SidebarRef.current.style.width = `${newWidth}px`;
      if (!isCollapse) {
        NavbarRef.current.style.setProperty("left", `${newWidth}px`);
        NavbarRef.current.style.setProperty(
          "width",
          `calc(100% - ${newWidth}px)`
        );
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleCollapse = () => {
    setIsCollapse(true);
    if (NavbarRef.current) {
      NavbarRef.current.style.removeProperty("left");
      NavbarRef.current.style.removeProperty("width");
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      isMobile &&
      isMenuBar &&
      SidebarRef.current &&
      !SidebarRef.current.contains(e.target as Node) &&
      !NavbarRef.current?.contains(e.target as Node)
    ) {
      setIsMenuBar(false);
    }
  };

  useEffect(() => {
    setHasMounted(true);
    if (isMobile) {
      document.addEventListener("click", handleOutsideClick);
    }
    document.addEventListener("mousemove", trackCursor);
    console.log("isMobile:", isMobile);
    console.log("isMenubar:", isMenuBar);

    return () => {
      document.removeEventListener("mousemove", trackCursor);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, isMenuBar]);

  if (!hasMounted) return null;

  return (
    <>
      <aside
        ref={SidebarRef}
        className={cn(
          "group/sidebar bg-[#f7f7f5] dark:bg-[#202020] h-full w-60 overflow-y-auto flex flex-col z-[999999] relative transition-all ease-in-out p-2",
          isMobile && "hidden p-3",
          isCollapse &&
            "h-[80%] translate-y-[10%] rounded-lg shadow-lg -translate-x-full transition-all ease-in-out duration-500",
          isCollapse && isCursorNearLeft && "translate-x-0",
          isMenuBar && "w-[90%] block",
          isResizing && "transition-none"
        )}
      >
        <div>
          <UserNav />
        </div>
        <div className="mt-4">documents</div>
        <div
          onMouseDown={handleMouseDown}
          className="opacity-0 group-hover/sidebar:opacity-100 cursor-ew-resize h-full w-1 bg-primary/15 absolute top-0 right-0"
        ></div>
        <div
          onClick={handleCollapse}
          role="button"
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 absolute top-2 right-2 hover:bg-slate-100 dark:hover:bg-[#191919] transition duration-300 cursor-pointer",
            (isCollapse || isMobile) && "hidden"
          )}
        >
          <ChevronsLeft className="font-light" size={24} />
        </div>
      </aside>
      <div
        ref={NavbarRef}
        className={cn(
          "absolute z-[99999] transition ease-in-out top-0 left-60 w-[calc(100%-248px)]",
          (isMobile || isCollapse) && "w-full left-0"
        )}
      >
        <div
          role="button"
          onClick={() => {
            console.log("button clicked");
            if (!isMobile) setIsCollapse(false);
            else setIsMenuBar(!isMenuBar);
          }}
          className={cn(
            "absolute top-0 left-1 hidden transition",
            (isMobile || isCollapse) && "block",
            isMenuBar && "hidden"
          )}
        >
          {isCursorNearLeft && !isMobile ? <ChevronsRight /> : <MenuIcon />}
        </div>
        <nav className=" ml-20">This is a Document page of paginest</nav>
        <ModeToggle />
        <Button
          onClick={async () => {
            await signOut();
          }}
        >
          signout
        </Button>
      </div>
    </>
  );
};

export default Navigation;
