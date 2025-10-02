import FetchedAllRecipes from "@/molecules/index/FetchedAllRecipes";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Search } from "lucide-react";
import { categorias } from "@/types/index";

const IndexOrganism = () => {
  return (
    <>
      {/*<div className="grid md:grid-cols-12">
      <Input
        placeholder="Buscar receta..."
        endContent={
          <Button className="bg-orange-300">
            <Search />
          </Button>
        }
        className="col-span-12"
      />
      <Select className="col-span-2 md:mt-4" placeholder="Categorias">
        {categorias.map((categoria) => (
          <SelectItem key={categoria.id}>{categoria.nombre}</SelectItem>
        ))}
      </Select>
    </div> */}
      <FetchedAllRecipes />
    </>
  );
};

export default IndexOrganism;
