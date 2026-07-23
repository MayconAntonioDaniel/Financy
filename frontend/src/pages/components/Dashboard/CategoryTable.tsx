import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCategoryStore } from "@/stores/categoryStore"
import { useTransactionStore } from "@/stores/transactionStore"

export function CategoryTable() {
  const categories = useCategoryStore((state) => state.categories);
  const transactions = useTransactionStore((state) => state.transactions);

  function totalCategoryValue(categoryId: string) {
    return transactions
      .filter(transaction => transaction.category === categoryId)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  return (
    <Table>
      <TableHeader className="text-gray-200">
        <TableRow>
          <TableHead className="text-gray-500 text-xs p-4">
            CATEGORIAS
          </TableHead>
          <TableHead colSpan={2} className="text-xs p-4">
            <div className="flex items-center justify-end">
              <Link to="/categories">
                <Button variant='link' className="cursor-pointer text-brand-dark">
                  Gerenciar
                  <ChevronRight className="size-5" />
                </Button>
              </Link>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="flex items-center gap-2 p-4">
              <div className={`px-4 py-1 rounded-full text-${category.color}-base font-bold bg-${category.color}-light w-max`}>
                {category.title}
              </div>
            </TableCell>
            <TableCell className="text-gray-500">
              {category.numberOfItems} {category.numberOfItems === 1 ? "Item" : "Itens"}
            </TableCell>
            <TableCell className="text-gray-800 font-bold text-base flex items-center gap-2 justify-end pr-4">
              R$ {totalCategoryValue(category.id).toFixed(2)}
            </TableCell>
          </TableRow>
        )) }
      </TableBody>
    </Table>
  )
}