import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FilterInputs() {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-xl border border-gray-200">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Buscar</h1>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1 left-0 size-4 -translate-y-1/2 text-gray-400 ml-3 mt-3" />
          <Input className="pl-10" placeholder="Buscar por descrição" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Tipo</h1>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="income">Receita</SelectItem>
              <SelectItem value="expense">Despesa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Categoria</h1>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="income">Receita</SelectItem>
              <SelectItem value="expense">Despesa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Periodo</h1>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="this_week">Esta semana</SelectItem>
              <SelectItem value="this_month">Este mês</SelectItem>
              <SelectItem value="this_year">Este ano</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
