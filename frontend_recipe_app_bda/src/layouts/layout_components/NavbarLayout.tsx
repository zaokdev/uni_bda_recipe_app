import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import NotLoggedIn from "./atoms/NotLoggedIn";
import LeftSide from "./atoms/LeftSide";
import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import LoggedIn from "./atoms/LoggedIn";
import { useUser } from "@/context/userContext";
import { getUserInfo } from "@/helpers/auth";

const NavbarLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <Navbar className="bg-orange-200" onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <LeftSide />
      {user ? <LoggedIn username={user?.username} /> : <NotLoggedIn />}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="//">Inicio</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarLayout;
