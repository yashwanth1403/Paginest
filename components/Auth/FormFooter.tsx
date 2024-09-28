import Link from "next/link";

const FormFooter = ({
  text,
  navigate,
}: {
  text: string;
  navigate: "signup" | "login";
}) => {
  return (
    <div className="text-center">
      <p className=" inline-block mr-2 font-light text-sm">{text}</p>
      <Link href={`/${navigate}`} className="underline">
        {navigate}
      </Link>
    </div>
  );
};

export default FormFooter;
