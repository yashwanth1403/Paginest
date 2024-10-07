import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type cardtext = {
  title: string;
  description?: string;
  children: React.ReactNode;
  classname?: string;
};
const CardWrapper = ({ title, description, children, classname }: cardtext) => {
  return (
    <Card
      className={cn(
        "max-w-[350px] h-fit bg-black/10 backdrop-blur-sm dark:bg-black/70",
        classname
      )}
    >
      <CardHeader>
        <CardTitle className="text-center leading-relaxed text-md md:text-lg">
          {title}
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
