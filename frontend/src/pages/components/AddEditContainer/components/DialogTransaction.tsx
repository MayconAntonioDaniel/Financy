import { useState } from "react";
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
  SquarePen,
} from "lucide-react";
import {
  useTransactionStore,
  type Transaction,
} from "@/stores/transactionStore";
import { ptBR } from "date-fns/locale";
import { useCategoryStore } from "@/stores/categoryStore";
import {
  formatCurrencyBRL,
  formatCurrencyFromInputBRL,
  parseCurrencyToNumberBRL,
} from "@/utils/utils";
import { getFieldErrors, transactionSchema, type FieldErrors } from "@/schemas/forms";
import { LabelError } from "@/components/LabelError/LabelError";

interface DialogTransactionProps {
  title: string;
  description?: string;
  type?: "default" | "link";
  mode?: "add" | "edit";
  edit?: Transaction;
}

type TransactionFields = "description" | "date" | "amount" | "category" | "transactionType";

const INITIAL_TRANSACTION_STATE = {
  date: null as Date | null,
  descriptionValue: "",
  amount: "",
  category: "",
  transactionType: "Despesa" as "Despesa" | "Receita",
  openDialog: false,
};

export function DialogTransaction({ title, description, type, mode = "add", edit }: DialogTransactionProps) {
  const [state, setState] = useState(INITIAL_TRANSACTION_STATE);
  const [errors, setErrors] = useState<FieldErrors<TransactionFields>>({});
  const { date, descriptionValue, amount, transactionType, category, openDialog } = state;
  
  const addTransaction = useTransactionStore((storeState) => storeState.addTransaction);
  const updateTransaction = useTransactionStore((storeState) => storeState.updateTransaction);
  const updateCategory = useCategoryStore((storeState) => storeState.updateCategory);
  const categories = useCategoryStore((storeState) => storeState.categories);

  const handleSetState = (property: string, value: any) => {
    setState((prev) => ({ ...prev, [property]: value }));
  };

  const clearFieldError = (field: TransactionFields) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleCloseDialog = () => {
    setState((prev) => ({ ...prev, openDialog: false }));
    setErrors({});

    setTimeout(() => {
      setState(INITIAL_TRANSACTION_STATE);
    }, 300);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseDialog();
      return;
    }

    setErrors({});

    if (mode === "edit" && edit) {
      setState({
        date: dayjs(edit.date).toDate(),
        descriptionValue: edit.description,
        amount: formatCurrencyBRL(edit.amount),
        category: edit.category,
        transactionType: edit.type,
        openDialog: true,
      });
      return;
    }

    handleSetState("openDialog", open);
  };

  const handleCategoryItemsWhenCategoryChanges = (previousCategoryTitle: string, nextCategoryTitle: string) => {
    if (previousCategoryTitle === nextCategoryTitle) {
      return;
    }

    const previousCategory = categories.find((item) => item.title === previousCategoryTitle);
    if (previousCategory) {
      updateCategory(previousCategory.id, {
        numberOfItems: Math.max(0, previousCategory.numberOfItems - 1),
      });
    }

    const nextCategory = categories.find((item) => item.title === nextCategoryTitle);
    if (nextCategory) {
      updateCategory(nextCategory.id, {
        numberOfItems: nextCategory.numberOfItems + 1,
      });
    }
  };

  const handleSave = () => {
    const parsed = transactionSchema.safeParse({
      description: descriptionValue,
      date,
      amount,
      category,
      transactionType,
    });

    if (!parsed.success) {
      setErrors(getFieldErrors<TransactionFields>(parsed.error));
      return;
    }

    const payload = {
      description: parsed.data.description,
      type: parsed.data.transactionType,
      date: dayjs(parsed.data.date).format("YYYY-MM-DD"),
      amount: parseCurrencyToNumberBRL(parsed.data.amount),
      category: parsed.data.category,
    };

    if (mode === "edit" && edit) {
      updateTransaction(edit.id, payload);
      handleCategoryItemsWhenCategoryChanges(edit.category, payload.category);
    } else {
      addTransaction(payload);

      const selectedCategory = categories.find((item) => item.title === payload.category);
      if (selectedCategory) {
        updateCategory(selectedCategory.id, {
          numberOfItems: selectedCategory.numberOfItems + 1,
        });
      }
    }

    setErrors({});
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant={mode === "edit" ? "outline" : type === "link" ? "link" : "default"}
            className={`${mode === "edit" ? "text-gray-700 cursor-pointer p-2" : type === "link" ? "bg-none cursor-pointer p-5" : "bg-brand cursor-pointer p-5"}`}
          >
            {mode === "edit" ? <SquarePen className="size-5" /> : <Plus className="size-5" />}
            {mode === "edit" ? "" : "Nova Transacao"}
          </Button>
        }
      />
      <DialogContent className="max-w-130 p-5">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-base text-gray-800 font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">{description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-2">
            <Button
              type="button"
              variant={transactionType === "Despesa" ? "secondary" : "outline"}
              className={`h-9 rounded-md cursor-pointer ${transactionType === "Despesa" ? "border-red-base text-gray-800" : "border-gray-200 text-gray-800"}`}
              onClick={() => {
                clearFieldError("transactionType");
                handleSetState("transactionType", "Despesa");
              }}
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
              onClick={() => {
                clearFieldError("transactionType");
                handleSetState("transactionType", "Receita");
              }}
            >
              <CircleArrowUp
                className={`size-3 ${transactionType === "Receita" ? "text-green-base" : "text-gray-800"}`}
              />
              Receita
            </Button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="transaction-description">Descricao</Label>
            <Input
              id="transaction-description"
              placeholder="Ex: Almoco no restaurante"
              className="h-11 py-5"
              aria-invalid={Boolean(errors.description)}
              value={descriptionValue}
              onChange={(e) => {
                clearFieldError("description");
                handleSetState("descriptionValue", e.target.value);
              }}
            />
            {errors.description && <LabelError error={errors.description} />}
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
                      aria-invalid={Boolean(errors.date)}
                      className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    />
                  }
                >
                  <CalendarIcon />
                  {date ? dayjs(date).format("DD/MM/YYYY") : <span>Selecione</span>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={date ?? undefined}
                    onSelect={(selectedDate) => {
                      clearFieldError("date");
                      handleSetState("date", selectedDate);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <LabelError error={errors.date} />}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="transaction-value">Valor</Label>
              <Input
                id="transaction-value"
                type="text"
                inputMode="decimal"
                className="h-11 py-5"
                placeholder="R$ 0,00"
                aria-invalid={Boolean(errors.amount)}
                value={amount}
                onChange={(e) => {
                  clearFieldError("amount");
                  handleSetState("amount", formatCurrencyFromInputBRL(e.target.value));
                }}
              />
              {errors.amount && <LabelError error={errors.amount} />}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                clearFieldError("category");
                handleSetState("category", String(value));
              }}
            >
              <SelectTrigger className="w-full h-11 py-5" aria-invalid={Boolean(errors.category)}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((categoryItem) => (
                    <SelectItem key={categoryItem.id} value={categoryItem.title}>
                      {categoryItem.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category && <LabelError error={errors.category} />}
          </div>

          <Button
            className="h-10 bg-brand text-white hover:bg-brand-dark cursor-pointer"
            type="button"
            onClick={handleSave}
          >
            {mode === "edit" ? "Salvar alteracoes" : "Salvar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
