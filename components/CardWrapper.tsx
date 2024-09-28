import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type cardtext = {
  title: string;
  description: string;
  children: React.ReactNode;
};
const CardWrapper = ({ title, description, children }: cardtext) => {
  return (
    <Card className="max-w-[350px] h-fit bg-black/10 backdrop-blur-sm dark:bg-black/70 ">
      <CardHeader className="space-y-3">
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
