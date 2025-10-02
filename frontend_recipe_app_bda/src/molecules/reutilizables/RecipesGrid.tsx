import { Recipe } from "@/types";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { categorias } from "@/types/index";

type props = {
  data: Recipe[];
};

const RecipesGrid = ({ data }: props) => {
  return (
    <section className="grid grid-cols-12 mt-4 gap-6">
      {data?.map((recipe: Recipe) => (
        <Card
          onClick={() => {}}
          key={recipe.id}
          isPressable
          className="col-span-12 md:col-span-4"
          shadow="sm"
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={recipe.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{recipe.title}</b>
            <p className="text-default-500">
              {
                categorias.find(
                  (categoria) => categoria.id == recipe.category_id
                ).nombre
              }
            </p>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default RecipesGrid;
