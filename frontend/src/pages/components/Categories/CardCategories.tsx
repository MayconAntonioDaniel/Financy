import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CATEGORY_COLOR_STYLES, ICONS } from "@/constants/constants";
import { useCategoryStore } from "@/stores/categoryStore";
import { ImageOff, SquarePen, Trash } from "lucide-react";

export function CardCategories() {
  const categories = useCategoryStore((state) => state.categories);

  return (
    <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
      { categories.map((category) => {
        const IconComponent = ICONS.find(item => item.key === category.icon)?.type || ImageOff
        const categoryStyles = CATEGORY_COLOR_STYLES[category.color ?? ""]
        
        return (
          <Card className="w-full rounded-xl p-8" key={category.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
                <div className={`${categoryStyles.bgLight} rounded-md p-3`}>
                  <IconComponent className={`size-6 ${categoryStyles.textBase}`} />
                </div>
              </CardTitle>
              <CardTitle className="flex gap-2">
                <div className="border border-gray-300 rounded-md p-2">
                  <Trash className="size-4 text-red-500 cursor-pointer" />
                </div>
                <div className="border border-gray-300 rounded-md p-2">
                  <SquarePen className="size-4 text-gray-700 cursor-pointer" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <CardTitle className="text-base text-gray-900 font-bold">
                {category.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {category.description}
              </CardDescription>
            </CardContent>
            <CardContent className="flex items-center justify-between mt-4">
              <div className={`px-4 py-1 rounded-full ${categoryStyles.textBase} font-semibold ${categoryStyles.bgLight} w-max`}>
                {category.title}
              </div>
              <div className="text-gray-600 text-sm">{category.numberOfItems} {category.numberOfItems === 1 ? "Item" : "Itens"}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
