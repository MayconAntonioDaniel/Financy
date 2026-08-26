import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCategoryStore } from "@/stores/categoryStore"
import { useTransactionStore } from "@/stores/transactionStore"

type DeleteContainerProps = {
  id: string
  title: string
  type: "category" | "transaction"
  categoryTitle?: string
}

export function DeleteContainer({
  id,
  title,
  type,
  categoryTitle,
}: DeleteContainerProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const categories = useCategoryStore((state) => state.categories)
  const updateCategory = useCategoryStore((state) => state.updateCategory)
  const deleteCategory = useCategoryStore((state) => state.deleteCategory)
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  )
  const deleteTransactionsByCategory = useTransactionStore(
    (state) => state.deleteTransactionsByCategory,
  )

  const handleDelete = () => {
    if (type === "transaction") {
      deleteTransaction(id)

      if (categoryTitle) {
        const selectedCategory = categories.find(
          (category) => category.title === categoryTitle,
        )

        if (selectedCategory) {
          updateCategory(selectedCategory.id, {
            numberOfItems: Math.max(0, selectedCategory.numberOfItems - 1),
          })
        }
      }

      setOpenDialog(false)
      return
    }

    const selectedCategory = categories.find((category) => category.id === id)
    deleteCategory(id)

    if (selectedCategory) {
      deleteTransactionsByCategory(selectedCategory.title)
    }

    setOpenDialog(false)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="text-red-base cursor-pointer p-2"
          >
            <Trash className="size-4" />
          </Button>
        }
      />
      <DialogContent className="p-5">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-base text-gray-800 font-semibold mb-2">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Tem certeza que deseja excluir este item?
          </DialogDescription>
          <DialogDescription>
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="h-10 mt-2 bg-red-dark text-white hover:bg-red-base cursor-pointer"
          type="button"
          onClick={handleDelete}
        >
          Excluir
        </Button>
      </DialogContent>
    </Dialog>
  )
}
