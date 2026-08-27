import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { CATEGORY_COLOR_STYLES, ICONS } from "@/constants/constants"
import type { Category } from "@/types"
import { ImageOff } from "lucide-react"
import { DeleteContainer } from "../DeleteContainer/DeleteContainer"
import { DialogCategory } from "../AddEditContainer/components/DialogCategory"
import { useQuery } from "@apollo/client/react"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"

export function CardCategories() {
  const { data, loading, refetch } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES,
  )

  const categories = data?.listCategories || []

  console.log("categories", categories)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
      {[...categories]
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((category) => {
          const IconComponent =
            ICONS.find((item) => item.key === category.icon)?.type || ImageOff
          const color = CATEGORY_COLOR_STYLES[category.color]

          return (
            <Card className="w-full rounded-xl p-8" key={category.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
                  <div className={`${color.bgLight} rounded-md p-3`}>
                    <IconComponent className={`size-6 ${color.textBase}`} />
                  </div>
                </CardTitle>
                <CardTitle className="flex gap-2">
                  <DeleteContainer
                    id={category.id}
                    title={`${category.title}`}
                    type="category"
                    onDeleted={() => refetch()}
                  />
                  <DialogCategory
                    mode="edit"
                    edit={category}
                    title="Editar Categoria"
                  />
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
                <div
                  className={`px-4 py-1 rounded-full ${color.textBase} font-semibold ${color.bgLight} w-max`}
                >
                  {category.title}
                </div>
                <div className="text-gray-600 text-sm">
                  {category.numberOfItems}{" "}
                  {category.numberOfItems === 1 ? "Item" : "Itens"}
                </div>
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
