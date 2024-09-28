import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      PagiNest App
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default Dashboard;
