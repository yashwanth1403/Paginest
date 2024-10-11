import { auth } from "@/auth";
const Dashboard = async () => {
  const data = await auth();
  return <div>{JSON.stringify(data?.user)}</div>;
};

export default Dashboard;
