import { auth } from "@/lib/auth";
import NavbarItem from "./NavbarItem";
import { fetchSetting } from "@/lib/data";

const Navbar = async () => {
  const session = await auth();
  const _id = "661a894e2c902060a3e28ed9";
  const setting = await fetchSetting(_id);

  return (
    <NavbarItem
      session={session}
      imgLogo={setting.imgLogo}
      title={setting.title}
    />
  );
};

export default Navbar;
