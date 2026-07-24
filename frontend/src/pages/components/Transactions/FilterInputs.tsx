import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INPUT_MENU_TYPE } from "@/constants/constants";
import { getMonthYearItems } from "@/utils/utils";
import { useCategoryStore } from "@/stores/categoryStore";
import type { Transaction } from "@/stores/transactionStore";

export function FilterInputs({ transactions, onChange }: { transactions: Transaction[]; onChange: (transactions: Transaction[]) => void }) {
  const categories = useCategoryStore((state) => state.categories);
  
  function handleFilterCategory(category: string) {
    onChange(category === "Todas" 
      ? transactions 
      : transactions.filter(transaction => transaction.category === category));
  }

  function handleFilterType(type: string) {
    onChange(type === "Todos" 
      ? transactions 
      : transactions.filter(transaction => transaction.type === type));
  }

  function handleFilterPeriod(period: string) {
    console.log(period)
    const [month, year] = period.split(" ");
    onChange(transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      console.log(transactionDate);
      return transactionDate.getMonth() === getMonthYearItems().find(item => item.label === period)?.month &&
        transactionDate.getFullYear() === parseInt(year);
    }));
  }


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
        <Select onValueChange={(value) => handleFilterType(String(value ?? "Todos"))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="all" value="Todos">
                Todos
              </SelectItem>
              { INPUT_MENU_TYPE.map(item => (
                <SelectItem key={item.key} value={item.value}>
                  {item.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Categoria</h1>
        <Select onValueChange={(value) => handleFilterCategory(String(value ?? "Todas"))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="all" value="Todas">
                Todas
              </SelectItem>
              { categories.map(category => (
                <SelectItem key={category.id} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Periodo</h1>
        <Select onValueChange={(value) => handleFilterPeriod(String(value ?? ""))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="all" value="Todas">
                Todas
              </SelectItem>
              { getMonthYearItems().map(item => (
                <SelectItem key={`${item.month}/${item.year}`} value={`${item.month}/${item.year}`}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
