import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
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
import { format } from "date-fns";
import {
  CalendarIcon,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";

interface DialogTransactionProps {
  title: string;
  description: string;
  type?: "default" | "link";
}

export function DialogTransaction({ title, description, type }: DialogTransactionProps) {
  const [transactionType, setTransactionType] = useState<"Despesa" | "Receita">(
    "Despesa",
  );
  const [date, setDate] = useState<Date | undefined>(undefined);

  const categories = useMemo(
    () => [
      "Alimentacao",
      "Transporte",
      "Mercado",
      "Entretenimento",
      "Utilidades",
    ],
    [],
  );
  
  return (
    <Dialog>
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
        <DialogClose className="text-gray-800 cursor-pointer border-r-2 bg-amber-300" />
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
              className="h-9 rounded-md cursor-pointer border-red-base text-gray-800"
              onClick={() => setTransactionType("Despesa")}
            >
              <CircleArrowDown
                className={`size-3 ${transactionType === "Despesa" ? "text-red-base" : "text-gray-800"}`}
              />
              Despesa
            </Button>
            <Button
              type="button"
              variant={transactionType === "Receita" ? "secondary" : "outline"}
              className="h-9 rounded-md cursor-pointer border-green-base text-gray-800"
              onClick={() => setTransactionType("Receita")}
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
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger
                  className="h-11 py-5 w-full"
                  render={
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    />
                  }
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Selecione</span>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
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
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select>
              <SelectTrigger className="w-full h-11 py-5">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="h-10 bg-brand text-white hover:bg-brand-dark cursor-pointer"
            type="button"
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
