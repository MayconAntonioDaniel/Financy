import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Wallet, CircleArrowUp, CircleArrowDown, Tag, ArrowUpDown, Utensils } from "lucide-react";

interface InfoCardProps {
  type: "categories" | "dashboard" | "transactions";
}

export function InfoCard({ type }: InfoCardProps) {
  return (
    <div className="flex gap-8">
      {type === "dashboard" ? (
        <>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
                <Wallet className="size-5 text-purple-base" />
                SALDO TOTAL
              </CardTitle>
              <CardDescription className="text-3xl font-bold text-black flex items-center mt-4">
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
        </>
      ) : (
        <>
          <Card className="w-full flex-row items-center p-4">
            <CardHeader>
              <Tag className="size-8 text-gray-700" />
            </CardHeader>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-black flex items-center">
                8
              </CardTitle>
              <CardDescription className="text-xs w-screen text-gray-500 flex items-center gap-2">
                TOTAL DE CATEGORIAS
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full flex-row items-center p-4">
            <CardHeader>
              <ArrowUpDown className="size-8 text-purple-base" />
            </CardHeader>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-black">
                27
              </CardTitle>
              <CardDescription className="text-xs w-screen text-gray-500 flex items-center gap-2">
                TOTAL DE TRANSAÇÕES
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full flex-row items-center p-4">
            <CardHeader>
              <Utensils className="size-8 text-blue-base" />
            </CardHeader>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-black">
                Alimentação
              </CardTitle>
              <CardDescription className="text-xs w-screen text-gray-500 flex items-center gap-2">
                CATEGORIA MAIS UTILIZADA
              </CardDescription>
            </CardHeader>
          </Card>
        </>
      )}
    </div>
  );
}
