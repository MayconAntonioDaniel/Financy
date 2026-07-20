import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { SquarePen, Trash, Utensils } from "lucide-react";

export function CardCategories() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Card className="w-full rounded-xl p-8">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
            <div className="bg-blue-light rounded-md p-3">
              <Utensils className="size-6 text-blue-base" />
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
            Alimentação
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Restaurantes, delivery e refeições
          </CardDescription>
        </CardContent>
        <CardContent className="flex items-center justify-between mt-4">
          <div className="px-4 py-1 rounded-full text-blue-base font-semibold bg-blue-light w-max">
            Alimentação
          </div>
          <div className="text-gray-600 text-sm">12 Itens</div>
        </CardContent>
      </Card>
    </div>
  );
}
