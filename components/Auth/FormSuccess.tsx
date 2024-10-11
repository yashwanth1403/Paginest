import { CheckCheckIcon } from "lucide-react";
const FormSuccess = ({ message }: { message: string }) => {
  return (
    <div className="flex text-green-500 text-md gap-2 font-medium">
      <CheckCheckIcon></CheckCheckIcon>
      {message}
    </div>
  );
};

export default FormSuccess;
