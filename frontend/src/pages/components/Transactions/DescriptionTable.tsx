import { useState } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { CircleArrowDown, CircleArrowUp, Trash, SquarePen, ImageOff } from "lucide-react";
import { format } from "date-fns";
import { CATEGORY_COLOR_STYLES, ICONS, TABLE_HEADERS_TRANSACTIONS } from "@/constants/constants";
import { useCategoryStore } from "@/stores/categoryStore";
import type { Transaction } from "@/stores/transactionStore";
import { Pagination } from "./components/Pagination";

export function DescriptionTable() {
  const categories = useCategoryStore((state) => state.categories);
  const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([]);

  console.log(paginatedTransactions);

  return (
    <Table>
      <TableHeader className="text-gray-200">
        <TableRow>
          { TABLE_HEADERS_TRANSACTIONS.map((header) => (
            <TableHead key={header.key} className="text-gray-500 text-xs p-4">
              <div className={`flex justify-${header.align}`}>
                <h1>{header.title}</h1>
              </div>
            </TableHead>
          )) }
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedTransactions.map((transaction) => {
          const isIncome = transaction.type === "Receita";
          const formattedAmount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Math.abs(transaction.amount));

          const isCategory = categories.find((item) => item.title === transaction.category);
          const categoryStyles = CATEGORY_COLOR_STYLES[isCategory?.color ?? ""]
          const IconComponent = ICONS.find((item) => item.key === isCategory?.icon)?.type || ImageOff;

          return (
            <TableRow key={transaction.id} className="border-gray-200">
              <TableCell align="left" className="flex gap-2 items-center">
                <div className={`${categoryStyles.bgLight} w-10 h-10 rounded-md flex items-center justify-center mr-2`}>
                  <IconComponent className={`size-4 ${categoryStyles.textBase}`}/>
                </div>
                <h1 className="text-gray-800 font-bold text-base">{transaction.description}</h1>
              </TableCell>
              <TableCell align="center">
                <div>{format(new Date(transaction.date), "dd/MM/yy")}</div>
              </TableCell>
              <TableCell align="center">
                <div className={`${categoryStyles.bgLight} ${categoryStyles.textBase} px-4 py-1 rounded-full font-bold w-max`}>
                  {isCategory?.title}
                </div>
              </TableCell>
              <TableCell>
                <div className={`flex gap-2 items-center justify-center ${isIncome ? "text-green-base" : "text-red-base"} font-semibold`}>
                  {isIncome ? <CircleArrowUp className="size-4" /> : <CircleArrowDown className="size-4" />}
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
                  <div className="border border-gray-300 rounded-md p-2">
                    <Trash className="size-4 text-red-500 cursor-pointer" />
                  </div>
                  <div className="border border-gray-300 rounded-md p-2">
                    <SquarePen className="size-4 text-gray-700 cursor-pointer" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter className="bg-white border-t border-gray-200">
        <TableRow className="hover:bg-white">
          <TableCell colSpan={6} className="px-4 py-3">
            <Pagination onPageChange={setPaginatedTransactions} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
