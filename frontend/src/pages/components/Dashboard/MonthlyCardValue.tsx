import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, CircleArrowUp, CircleArrowDown } from "lucide-react";

export function MonthlyCardValue() {
  return (
    <div className="flex gap-8">
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
  );
}