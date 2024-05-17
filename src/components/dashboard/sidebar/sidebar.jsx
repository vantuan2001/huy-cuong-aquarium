import { auth } from "@/lib/auth";
import SidebarContainer from "./sidebarContainer";

const Sidebar = async () => {
  const { user } = await auth();
  return <SidebarContainer user={user} />;
};

export default Sidebar;
