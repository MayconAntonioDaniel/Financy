import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function CategoryTable() {
  return (
    <Table>
      <TableHeader className="text-gray-200">
        <TableRow>
          <TableHead className="text-gray-500 text-xs p-4">
            CATEGORIAS
          </TableHead>
          <TableHead colSpan={2} className="text-xs p-4">
            <div className="flex items-center justify-end">
              <Button variant='link' className="cursor-pointer text-brand-dark">
                Gerenciar
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="flex items-center gap-2 p-4">
            <div className="px-4 py-1 rounded-full text-blue-base font-bold bg-blue-light w-max">
              Alimentação
            </div>
          </TableCell>
          <TableCell className="text-gray-500">
            12 Itens
          </TableCell>
          <TableCell className="text-gray-800 font-bold text-base flex items-center gap-2 justify-end pr-4">
            R$ 523,00
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}