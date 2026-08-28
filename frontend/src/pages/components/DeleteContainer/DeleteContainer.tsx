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
import { useMutation } from "@apollo/client/react"
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { toast } from "sonner"
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"

interface DeleteContainerProps {
  id: string
  title: string
  type: "category" | "transaction"
  onDeleted: () => void
}

export function DeleteContainer({
  id,
  title,
  type,
  onDeleted,
}: DeleteContainerProps) {
  const [openDialog, setOpenDialog] = useState(false)
  // const categories = useCategoryStore((state) => state.categories)
  // const updateCategory = useCategoryStore((state) => state.updateCategory)
  // const deleteCategory = useCategoryStore((state) => state.deleteCategory)
  // const deleteTransaction = useTransactionStore(
  //   (state) => state.deleteTransaction,
  // )
  // const deleteTransactionsByCategory = useTransactionStore(
  //   (state) => state.deleteTransactionsByCategory,
  // )

  const [deleteCategory, { loading: loadingCategory }] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      setOpenDialog(false)
      onDeleted?.()
      toast.success("Categoria excluída com sucesso!")
    },
    onError(error) {
      toast.error(error?.message || "Erro ao excluir a categoria.")
    },
  })

  const [deleteTransaction, { loading: loadingTransaction }] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => {
      setOpenDialog(false)
      onDeleted?.()
      toast.success("Transação excluída com sucesso!")
    },
    onError(error) {
      toast.error(error?.message || "Erro ao excluir a transação.")
    },
  })

  const handleDelete = async () => {
    if (type === "category") {
      await deleteCategory({ variables: { id } })
    }

    if (type === "transaction") {
      await deleteTransaction({ variables: { id } })
    }

    // if (type === "transaction") {
    //   deleteTransaction(id)

    //   if (categoryTitle) {
    //     const selectedCategory = categories.find(
    //       (category) => category.title === categoryTitle,
    //     )

    //     if (selectedCategory) {
    //       updateCategory(selectedCategory.id, {
    //         numberOfItems: Math.max(0, selectedCategory.numberOfItems - 1),
    //       })
    //     }
    //   }

    //   setOpenDialog(false)
    //   return
    // }

    // const selectedCategory = categories.find((category) => category.id === id)
    // deleteCategory(id)

    // if (selectedCategory) {
    //   deleteTransactionsByCategory(selectedCategory.title)
    // }

    // setOpenDialog(false)
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
          disabled={loadingCategory || loadingTransaction}
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
