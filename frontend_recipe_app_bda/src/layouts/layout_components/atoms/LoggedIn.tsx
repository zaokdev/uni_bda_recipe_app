import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@heroui/link";
import { removeAccessToken } from "@/helpers/auth";

const LoggedIn = ({ username }: any) => {
  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <Link href="/new_recipe">Crear</Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/new_recipe" onClick={removeAccessToken}>
          Cerrar sesion
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Avatar showFallback name={username} />
      </NavbarItem>
    </NavbarContent>
  );
};

export default LoggedIn;
