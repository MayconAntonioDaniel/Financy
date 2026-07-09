import { Button } from "@/components/ui/button"
import logo from "../assets/logo.svg"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BriefcaseBusiness, ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Wallet } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Dashboard() {
  return (
    <>
      <div className="w-full h-16 bg-white flex justify-between items-center px-10 border-b border-gray-200">
        <img src={logo} alt="Logo" className="w-28 h-full" />
        <div>
          <Button variant='link' className={`${window.location.pathname === "/" ? "text-green-base" : "text-gray-600"} cursor-pointer font-semibold`}>
            Dashboard
          </Button>
          <Button variant='link' className="cursor-pointer text-gray-600">
            Transações
          </Button>
          <Button variant='link' className="cursor-pointer text-gray-600">
            Categorias
          </Button>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          CT
        </div>
      </div>
      <div className="flex gap-8 p-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
              <Wallet className="size-5 text-purple-base" />
              SALDO TOTAL
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-black mt-4">
              R$ 1.000,00
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
              <CircleArrowUp className="size-5 text-green-base" />
              RECEITAS DO MÊS
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-black mt-4">
              R$ 1.000,00
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
              <CircleArrowDown className="size-5 text-red-base" />
              DESPESAS DO MÊS
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-black mt-4">
              R$ 1.000,00
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex">
        <div className="pl-12 w-full">
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
            <TableFooter className="text-gray-200">
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
        </div>
        <div className="px-12 w-1/2">
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
        </div>
      </div>
    </>
  )
}