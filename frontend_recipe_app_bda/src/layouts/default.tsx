import { childrenNode } from "@/config/props";
import NavbarLayout from "./layout_components/NavbarLayout";

const DefaultLayout = ({ children }: childrenNode) => {
  return (
    <>
      <NavbarLayout />
      <main className="bg-amber-50 flex flex-col px-12 md:px-24 pt-12">
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
