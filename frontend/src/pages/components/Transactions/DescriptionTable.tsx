import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { CircleArrowDown, CircleArrowUp, Trash, SquarePen, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { format } from "date-fns";
import { useTransactionStore } from "@/stores/transactionStore";
import { CATEGORY_COLOR_STYLES, ICONS } from "@/constants/constants";
import { useCategoryStore } from "@/stores/categoryStore";

export function DescriptionTable() {
  const transactions = useTransactionStore((state) => state.transactions);
  const categories = useCategoryStore((state) => state.categories);

  return (
    <Table>
      <TableHeader className="text-gray-200">
        <TableRow>
          <TableHead className="text-gray-500 text-xs p-4">DESCRIÇÃO</TableHead>
          <TableHead className="text-gray-500 text-xs p-4">
            <div className="flex justify-center">
              <h1>DATA</h1>
            </div>
          </TableHead>
          <TableHead align="center" className="text-gray-500 text-xs p-4">
            <div className="flex justify-center">
              <h1>CATEGORIA</h1>
            </div>
          </TableHead>
          <TableHead className="text-gray-500 text-xs p-4">
            <div className="flex justify-center">
              <h1>TIPO</h1>
            </div>
          </TableHead>
          <TableHead className="text-gray-500 text-xs p-4">
            <div className="flex justify-end">
              <h1>VALOR</h1>
            </div>
          </TableHead>
          <TableHead className="text-gray-500 text-xs p-4">
            <div className="flex justify-end">
              <h1>AÇÕES</h1>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
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
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">1 a {transactions.length} | {transactions.length} resultados</p>
              <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      aria-label="Página anterior"
                      className="size-8 rounded-md border border-gray-200 p-0 text-gray-500 hover:bg-gray-50"
                    >
                      <ChevronLeft className="size-4" />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="size-8 rounded-md border border-gray-200 p-0 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      className="size-8 rounded-md bg-brand p-0 text-sm text-white hover:bg-brand-dark hover:text-white"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="size-8 rounded-md border border-gray-200 p-0 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      aria-label="Próxima página"
                      className="size-8 rounded-md border border-gray-200 p-0 text-gray-500 hover:bg-gray-50"
                    >
                      <ChevronRight className="size-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
