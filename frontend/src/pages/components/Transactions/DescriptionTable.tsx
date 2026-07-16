import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { BriefcaseBusiness, CircleArrowUp, Trash, SquarePen, ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export function DescriptionTable() {
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
        <TableRow>
          <TableCell align="left" className="flex gap-2 items-center">
            <div className="w-10 h-10 bg-green-light rounded-md flex items-center justify-center mr-2">
              <BriefcaseBusiness className="size-4 text-green-base" />
            </div>
            <div>
              <h1 className="text-gray-800 font-bold text-base">Freelance</h1>
            </div>
          </TableCell>
          <TableCell align="center">
            <div>30/11/25</div>
          </TableCell>
          <TableCell align="center">
            <div className="px-4 py-1 rounded-full text-green-base font-bold bg-green-light w-max">
              Salário
            </div>
          </TableCell>
          <TableCell>
            <div className="flex gap-2 items-center justify-center text-green-base font-semibold">
              <CircleArrowUp className="size-4 text-green-base" />
              Entrada
            </div>
          </TableCell>
          <TableCell
            align="right"
            className="text-gray-800 font-bold text-base"
          >
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
      <TableFooter className="bg-white border-t border-gray-200">
        <TableRow className="hover:bg-white">
          <TableCell colSpan={6} className="px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">1 a 10 | 27 resultados</p>
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
