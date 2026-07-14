import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BriefcaseBusiness, ChevronRight, CircleArrowUp, Plus } from "lucide-react"

export function RecentTransactionsTable() {
  return (
    <Table>
      <TableHeader className="text-gray-200">
        <TableRow>
          <TableHead className="text-gray-500 text-xs p-4">
            TRANSAÇÕES RECENTES
          </TableHead>
          <TableHead colSpan={2} className="text-xs p-4">
            <div className="flex items-center justify-end">
              <Button variant='link' className="cursor-pointer text-brand-dark">
                Ver todas
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="flex items-center gap-2 p-4">
            <div className="w-10 h-10 bg-green-light rounded-md flex items-center justify-center mr-2">
              <BriefcaseBusiness className="size-4 text-green-base" />
            </div>
            <div>
              <h1 className="text-gray-800 font-bold text-base">Pagamento de Salário</h1>
              <h3 className="text-gray-500 text-sm">01/01/2024</h3>
            </div>
          </TableCell>
          <TableCell>
            <div className="px-4 py-1 rounded-full text-green-base font-bold bg-green-light w-max">
              Receita
            </div>
          </TableCell>
          <TableCell className="text-gray-800 font-bold text-base flex items-center gap-2 justify-end pr-4">
            + R$ 1.000,00
            <CircleArrowUp className="size-4 text-green-base" />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter className="text-gray-200 bg-white">
        <TableRow>
          <TableCell align="center" colSpan={3} className="text-brand-dark text-xs p-4">
            <Button variant='link' className="cursor-pointer text-brand-dark">
              <Plus className="size-5" />
              Nova transação
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}