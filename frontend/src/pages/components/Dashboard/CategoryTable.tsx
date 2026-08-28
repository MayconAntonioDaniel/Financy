import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { formatCentsToCurrencyBRL } from "@/utils/utils"
import { totalCategoryItems, totalCategoryValue } from "../utils"
import type { Category, Transaction } from "@/types"

interface CategoryTableProps {
  categories: Category[]
  transactions: Transaction[]
}

export function CategoryTable({ categories, transactions }: CategoryTableProps) {
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
                <Button
                  variant="link"
                  className="cursor-pointer text-brand-dark"
                >
                  Gerenciar
                  <ChevronRight className="size-5" />
                </Button>
              </Link>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id} className="border-gray-200">
            <TableCell className="flex items-center gap-2 p-4">
              <div
                className={`px-4 py-1 rounded-full text-${category.color}-base font-bold bg-${category.color}-light w-max`}
              >
                {category.title}
              </div>
            </TableCell>
            <TableCell className="text-gray-500">
              {totalCategoryItems(transactions, category.id)}{" "}
              {totalCategoryItems(transactions, category.id) === 1
                ? "Item"
                : "Itens"}
            </TableCell>
            <TableCell className="text-gray-800 font-bold text-base flex items-center gap-2 justify-end pr-4">
              {formatCentsToCurrencyBRL(totalCategoryValue(transactions, category.id))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
