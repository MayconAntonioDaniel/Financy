import { useCallback, useEffect, useState } from "react"
import { CircleArrowDown, CircleArrowUp, ImageOff } from "lucide-react"
import { format } from "date-fns"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table"
import {
  CATEGORY_COLOR_STYLES,
  ICONS,
  ITEMS_PER_PAGE,
  TABLE_HEADERS_TRANSACTIONS,
} from "@/constants/constants"
import { Pagination } from "./components/Pagination"
import { FilterInputs } from "./FilterInputs"
import { formatCurrencyBRL } from "@/utils/utils"
import { DeleteContainer } from "../DeleteContainer/DeleteContainer"
import { DialogTransaction } from "../AddEditContainer/components/DialogTransaction"
import { useQuery } from "@apollo/client/react"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import type { Category, Transaction } from "@/types"

export function DescriptionTable() {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([])
  const [currentPage, setCurrentPage] = useState(1)
  
  const { data: categoriesData, loading: loadingCategories } = useQuery<{
    listCategories: Category[]
  }>(LIST_CATEGORIES)

  const { data: transactionsData, loading: loadingTransactions } = useQuery<{
    listTransactions: Transaction[]
  }>(LIST_TRANSACTIONS)

  const transactions = transactionsData?.listTransactions ?? []
  const categories = categoriesData?.listCategories ?? []

  console.log(categories)
  console.log(transactions) 

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const dataTransactions = filteredTransactions.slice(startIndex, endIndex)

  // useEffect(() => {
  //   setFilteredTransactions(transactions)
  //   setCurrentPage(1)
  // }, [transactions])

  // const handleFilteredChange = useCallback(
  //   (nextTransactions: Transaction[]) => {
  //     setFilteredTransactions(nextTransactions)
  //     setCurrentPage(1)
  //   },
  //   [],
  // )

  if (loadingCategories || loadingTransactions) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* <FilterInputs
        transactions={transactions}
        onChange={handleFilteredChange}
      /> */}
      <Table>
        <TableHeader className="text-gray-200">
          <TableRow>
            {TABLE_HEADERS_TRANSACTIONS.map((header) => (
              <TableHead key={header.key} className="text-gray-500 text-xs p-4">
                <div className={`flex justify-${header.align}`}>
                  <h1>{header.title}</h1>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataTransactions.map((transaction) => {
            const isIncome = transaction.type === "Receita"
            const formattedAmount = formatCurrencyBRL(
              Math.abs(transaction.amount),
            )

            const isCategory = categories.find(
              (item) => item.id === transaction.categoryId,
            )
            const categoryStyles =
              CATEGORY_COLOR_STYLES[isCategory?.color ?? ""]
            const IconComponent =
              ICONS.find((item) => item.key === isCategory?.icon)?.type ||
              ImageOff

            return (
              <TableRow key={transaction.id} className="border-gray-200">
                <TableCell align="left" className="flex gap-2 items-center">
                  <div
                    className={`${categoryStyles.bgLight} w-10 h-10 rounded-md flex items-center justify-center mr-2`}
                  >
                    <IconComponent
                      className={`size-4 ${categoryStyles.textBase}`}
                    />
                  </div>
                  <h1 className="text-gray-800 font-bold text-base">
                    {transaction.description}
                  </h1>
                </TableCell>
                <TableCell align="center">
                  <div>{format(new Date(transaction.date), "dd/MM/yy")}</div>
                </TableCell>
                <TableCell align="center">
                  <div
                    className={`${categoryStyles.bgLight} ${categoryStyles.textBase} px-4 py-1 rounded-full font-bold w-max`}
                  >
                    {isCategory?.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`flex gap-2 items-center justify-center ${isIncome ? "text-green-base" : "text-red-base"} font-semibold`}
                  >
                    {isIncome ? (
                      <CircleArrowUp className="size-4" />
                    ) : (
                      <CircleArrowDown className="size-4" />
                    )}
                    {isIncome ? "Entrada" : "Saída"}
                  </div>
                </TableCell>
                <TableCell
                  align="right"
                  className="text-gray-800 font-bold text-base"
                >
                  {isIncome ? `+ ${formattedAmount}` : `- ${formattedAmount}`}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center justify-end">
                    <DeleteContainer
                      id={transaction.id}
                      type="transaction"
                      categoryTitle={transaction.category.title}
                      title={`${transaction.description}`}
                    />
                    <DialogTransaction
                      mode="edit"
                      edit={transaction}
                      title="Editar Transação"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter className="bg-white border-t border-gray-200">
          <TableRow className="hover:bg-white">
            <TableCell colSpan={6} className="px-4 py-3">
              <Pagination
                totalItems={filteredTransactions.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
