import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { NavbarContent, NavbarItem } from "@heroui/navbar";

const NotLoggedIn = () => {
  return (
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/register" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};

export default NotLoggedIn;
