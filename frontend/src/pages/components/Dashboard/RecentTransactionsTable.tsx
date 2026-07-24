import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { ChevronRight, CircleArrowDown, CircleArrowUp, ImageOff } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCurrentMonthTransactions } from "../utils"
import { Button } from "@/components/ui/button"
import { AddContainer } from "../AddContainer/AddContainer"
import { useTransactionStore } from "@/stores/transactionStore"
import { useCategoryStore } from "@/stores/categoryStore"
import { CATEGORY_COLOR_STYLES, ICONS } from "@/constants/constants"

export function RecentTransactionsTable() {
  const transactions = useTransactionStore((state) => state.transactions);
  const categories = useCategoryStore((state) => state.categories);

  return (
    <Table>
      <TableHeader className="text-gray-200">
        <TableRow>
          <TableHead className="text-gray-500 text-xs p-4">
            TRANSAÇÕES RECENTES
          </TableHead>
          <TableHead colSpan={2} className="text-xs p-4">
            <div className="flex items-center justify-end">
              <Link to="/transactions">
                <Button variant='link' className="cursor-pointer text-brand-dark">
                  Ver todas
                  <ChevronRight className="size-5" />
                </Button>
              </Link>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { getCurrentMonthTransactions(transactions)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((transaction) => {
            const isIncome = transaction.type === "Receita";
            const formattedAmount = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Math.abs(transaction.amount));
            const displayAmount = isIncome ? formattedAmount : `- ${formattedAmount}`;
            
            const isCategory = categories.find((item) => item.title === transaction.category);
            const categoryStyles = CATEGORY_COLOR_STYLES[isCategory?.color ?? ""]
            const IconComponent = ICONS.find((item) => item.key === isCategory?.icon)?.type || ImageOff;
            
            return (
              <TableRow key={transaction.id} className="border-gray-200">
                <TableCell className="flex items-center gap-2 p-4">
                  <div className={`w-10 h-10 ${categoryStyles.bgLight} rounded-md flex items-center justify-center mr-2`}>
                    <IconComponent className={`size-4 ${categoryStyles.textBase}`}/>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-gray-800 font-bold text-base">{transaction.description}</h1>
                    <h3 className="text-gray-500 text-sm">{dayjs(transaction.date).format("DD/MM/YYYY")}</h3>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`px-4 py-1 rounded-full ${isIncome ? 'text-green-base bg-green-light' : 'text-red-base bg-red-light'} font-bold w-max`}>
                    {transaction.type}
                  </div>
                </TableCell>
                <TableCell className="text-gray-800 font-bold text-base flex items-center gap-2 justify-end pr-4">
                  {displayAmount}
                  {isIncome ? <CircleArrowUp className="size-4 text-green-base" /> : <CircleArrowDown className="size-4 text-red-base" />}
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
      { categories.length > 0 &&<TableFooter className="text-gray-200 bg-white">
        <TableRow>
          <TableCell align="center" colSpan={3}>
            <AddContainer title="" description="" typeButton="link" typeDialog='transaction' />
          </TableCell>
        </TableRow> 
      </TableFooter>
      }
    </Table>
  )
}