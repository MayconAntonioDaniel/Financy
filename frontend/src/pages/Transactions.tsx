import { Button } from "@/components/ui/button";
import { Header } from "./components/Header/Header";
import {
  Plus,
  BriefcaseBusiness,
  CircleArrowUp,
  Trash,
  SquarePen,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export function Transactions() {
  return (
    <>
      <Header />
      <div className="p-12">
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Transações</h1>
            <p className="text-base text-gray-600">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <Button variant="default" className="cursor-pointer p-5">
            <Plus className="size-5 " />
            Nova Transação
          </Button>
        </div>
        <Table>
          <TableHeader className="text-gray-200">
            <TableRow>
              <TableHead className="text-gray-500 text-xs p-4">
                DESCRIÇÃO
              </TableHead>
              <TableHead className="text-gray-500 text-xs p-4">DATA</TableHead>
              <TableHead className="text-gray-500 text-xs p-4">
                CATEGORIA
              </TableHead>
              <TableHead className="text-gray-500 text-xs p-4">TIPO</TableHead>
              <TableHead className="text-gray-500 text-xs p-4">VALOR</TableHead>
              <TableHead className="text-gray-500 text-xs p-4 flex justify-end">
                AÇÕES
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell align="left" className="flex gap-2 items-center">
                <div className="w-10 h-10 bg-green-light rounded-md flex items-center justify-center mr-2">
                  <BriefcaseBusiness className="size-4 text-green-base" />
                </div>
                <div>
                  <h1 className="text-gray-800 font-bold text-base">
                    Freelance
                  </h1>
                </div>
              </TableCell>
              <TableCell>
                <div>30/11/25</div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-1 rounded-full text-green-base font-bold bg-green-light w-max">
                  Salário
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 items-center text-green-base font-semibold">
                  <CircleArrowUp className="size-4 text-green-base" />
                  Entrada
                </div>
              </TableCell>
              <TableCell className="text-gray-800 font-bold text-base">
                + R$ 2.500,00
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
          </TableBody>
          <TableFooter className="bg-white text-gray-200">
            <TableCell colSpan={6}>
              <Pagination className="p-2 text-gray-800">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
