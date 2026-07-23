import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import {
  CalendarIcon,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { ptBR } from "date-fns/locale";
import { useCategoryStore } from "@/stores/categoryStore";

interface DialogTransactionProps {
  title: string;
  description: string;
  type?: "default" | "link";
}

const INITIAL_TRANSACTION_STATE = {
  date: undefined,
  descriptionValue: "",
  amount: "",
  category: "",
  transactionType: "Despesa" as "Despesa" | "Receita",
  openDialog: false,
  error: "",
}


export function DialogTransaction({ title, description, type }: DialogTransactionProps) {
  const [state, setState] = useState(INITIAL_TRANSACTION_STATE);
  const { date, descriptionValue, amount, transactionType, category, error, openDialog } = state;
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const categories = useCategoryStore((state) => state.categories);

  const handleSetState = (property: string, value: any) => {
    setState((prev) => ({ ...prev, [property]: value }));
  };

  const handleCloseDialog = () => {
    setState(INITIAL_TRANSACTION_STATE);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseDialog();
      return;
    }

    handleSetState("openDialog", true);
  };

  const handleSave = () => {
    const parsedAmount = Number(amount.replace(",", "."));

    addTransaction({
      description: descriptionValue.trim(),
      type: transactionType,
      date: dayjs(date).format("YYYY-MM-DD"),
      amount: parsedAmount,
      category,
    });

    updateCategory(category, {
      numberOfItems: (categories.find((item) => item.id === category)?.numberOfItems || 0) + 1,
    });
    

    handleCloseDialog();
  };
  
  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant={type === "link" ? "link" : "default"}
            className={`${type === "link" ? "bg-none cursor-pointer p-5" : "bg-brand cursor-pointer p-5"}`}
          >
            <Plus className="size-5" />
            Nova Transação
          </Button>
        }
      />
      <DialogContent className="max-w-130 p-5">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-base text-gray-800 font-semibold">
            { title }
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            { description }
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-2">
            <Button
              type="button"
              variant={transactionType === "Despesa" ? "secondary" : "outline"}
              className={`h-9 rounded-md cursor-pointer ${transactionType === "Despesa" ? "border-red-base text-gray-800" : "border-gray-200 text-gray-800"}`}
              onClick={() => handleSetState("transactionType", "Despesa")}
            >
              <CircleArrowDown
                className={`size-3 ${transactionType === "Despesa" ? "text-red-base" : "text-gray-800"}`}
              />
              Despesa
            </Button>
            <Button
              type="button"
              variant={transactionType === "Receita" ? "secondary" : "outline"}
              className={`h-9 rounded-md cursor-pointer ${transactionType === "Receita" ? "border-green-base text-gray-800" : "border-gray-200 text-gray-800"}`}
              onClick={() => handleSetState("transactionType", "Receita")}
            >
              <CircleArrowUp
                className={`size-3 ${transactionType === "Receita" ? "text-green-base" : "text-gray-800"}`}
              />
              Receita
            </Button>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="transaction-description">Descrição</Label>
            <Input
              id="transaction-description"
              placeholder="Ex: Almoço no restaurante"
              className="h-11 py-5"
              value={descriptionValue}
              onChange={(e) => {
                handleSetState("error", "");
                handleSetState("descriptionValue", e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger
                  className="h-11 py-5 w-full cursor-pointer"
                  render={
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    />
                  }
                >
                  <CalendarIcon/>
                  {date ? dayjs(date).format("DD/MM/YYYY") : <span>Selecione</span>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar locale={ptBR} mode="single" selected={date} onSelect={(selectedDate) => handleSetState("date", selectedDate)} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="transaction-value">Valor</Label>
              <Input
                id="transaction-value"
                type="number"
                min="0"
                step="0.01"
                className="h-11 py-5"
                placeholder="0,00"
                value={amount}
                onChange={(e) => {
                  handleSetState("error", "");
                  handleSetState("amount", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Categoria</Label>
              <Select
                value={category}
                onValueChange={(value) => {
                  handleSetState("error", "");
                  handleSetState("category", String(value));
                }}
                >
                <SelectTrigger className="w-full h-11 py-5">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectGroup>
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
          </div>
          <Button
            className="h-10 bg-brand text-white hover:bg-brand-dark cursor-pointer"
            type="button"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
