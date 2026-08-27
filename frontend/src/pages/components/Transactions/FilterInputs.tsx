import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INPUT_MENU_TYPE, MONTH_NAMES, YEAR } from "@/constants/constants";
import { useCategoryStore } from "@/stores/categoryStore";
import type { Transaction } from "@/types";

export function FilterInputs({ transactions, onChange }: { transactions: Transaction[]; onChange: (transactions: Transaction[]) => void }) {
  const categories = useCategoryStore((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredTransactions = transactions.filter((transaction) => {
      const typeMatch = selectedType === "Todos" || selectedType === "" || transaction.type === selectedType;
      const categoryMatch = selectedCategory === "Todas" || selectedCategory === "" || transaction.category === selectedCategory;

      const periodMatch = (() => {
        if ((selectedYear === "Todos" || selectedYear === "") && (selectedMonth === "Todos" || selectedMonth === "")) {
          return true;
        }

        const transactionDate = new Date(transaction.date);
        const monthMatch = selectedMonth === "Todos" || selectedMonth === "" || transactionDate.getMonth() === MONTH_NAMES.find(item => item.label === selectedMonth)?.key;
        const yearMatch = selectedYear === "Todos" || selectedYear === "" || transactionDate.getFullYear() === Number(selectedYear);

        return monthMatch && yearMatch;
      })();

      const searchMatch =
        normalizedSearch.length === 0 || transaction.description.toLowerCase().includes(normalizedSearch);

      return typeMatch && categoryMatch && periodMatch && searchMatch;
    });

    onChange(filteredTransactions);
  }, [onChange, searchTerm, selectedCategory, selectedYear, selectedMonth, selectedType, transactions]);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-200">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Buscar</h1>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1 left-0 size-4 -translate-y-1/2 text-gray-400 ml-3 mt-3" />
          <Input
            className="pl-10"
            placeholder="Buscar por descrição"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-sm text-gray-700">Tipo</h1>
        <Select value={selectedType} onValueChange={(value) => setSelectedType(String(value))}>
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
        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(String(value))}>
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
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <Select value={selectedMonth} onValueChange={(value) => setSelectedMonth(String(value))}>
            <SelectTrigger className="w-full sm:w-1/2">
              <SelectValue placeholder="Selecione o mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key="all" value="Todos">
                  Todos
                </SelectItem>
                { MONTH_NAMES.map(item => (
                  <SelectItem key={item.key} value={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={(value) => setSelectedYear(String(value))}>
            <SelectTrigger className="w-full sm:w-1/2">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem key="all" value="Todos">
                  Todos
                </SelectItem>
                { YEAR.map(item => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
