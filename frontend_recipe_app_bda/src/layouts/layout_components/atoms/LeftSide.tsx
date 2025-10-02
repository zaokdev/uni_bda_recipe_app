import { Link } from "@heroui/link";
import { NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

const LeftSide = () => {
  return (
    <NavbarContent justify="start">
      <NavbarBrand className="mr-4">
        <p className="hidden sm:block font-bold text-inherit">App de recetas</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-3">
        <NavbarItem>
          <Link color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NavbarContent>
  );
};

export default LeftSide;
