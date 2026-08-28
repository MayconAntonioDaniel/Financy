import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import dayjs from "dayjs"
import {
  CalendarIcon,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  SquarePen,
} from "lucide-react"
import { ptBR } from "date-fns/locale"
import {
  formatCentsToCurrencyBRL,
  parseCurrencyToCentsBRL,
} from "@/utils/utils"
import {
  getFieldErrors,
  transactionSchema,
  type FieldErrors,
} from "@/schemas/forms"
import { LabelError } from "@/components/LabelError/LabelError"
import type { Transaction } from "@/types"
import { useMutation, useQuery } from "@apollo/client/react"
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/mutations/Transaction"
import { toast } from "sonner"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"

interface DialogTransactionProps {
  title: string
  description?: string
  type?: "default" | "link"
  mode?: "add" | "edit"
  edit?: Transaction
}

type TransactionFields =
  | "description"
  | "date"
  | "amount"
  | "categoryId"
  | "transactionType"

const INITIAL_TRANSACTION_STATE = {
  date: null as Date | null,
  descriptionValue: "",
  amount: 0,
  categoryId: "",
  transactionType: "",
  openDialog: false,
}

export function DialogTransaction({
  title,
  description,
  type,
  mode = "add",
  edit,
}: DialogTransactionProps) {
  const [state, setState] = useState(INITIAL_TRANSACTION_STATE)
  const [errors, setErrors] = useState<FieldErrors<TransactionFields>>({})
  const {
    date,
    descriptionValue,
    amount,
    transactionType,
    categoryId,
    openDialog,
  } = state

  const { data } = useQuery(LIST_CATEGORIES)
  const categories = data?.listCategories || []

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação criada com sucesso!")
      setErrors({})
      handleCloseDialog()
    },
    onError(error) {
      toast.error(error?.message || "Erro ao criar a transação.")
    },
  })

  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UPDATE_TRANSACTION,
    {
      onCompleted() {
        toast.success("Transação atualizada com sucesso!")
        setErrors({})
        handleCloseDialog()
      },
      onError(error) {
        toast.error(error?.message || "Erro ao atualizar a transação.")
      },
    },
  )

  const handleSetState = (property: string, value: any) => {
    setState((prev) => ({ ...prev, [property]: value }))
  }

  const clearFieldError = (field: TransactionFields) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev
      }

      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleCloseDialog = () => {
    setState((prev) => ({ ...prev, openDialog: false }))
    setErrors({})

    setTimeout(() => {
      setState(INITIAL_TRANSACTION_STATE)
    }, 300)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseDialog()
      return
    }

    setErrors({})

    if (mode === "edit" && edit) {
      setState({
        date: dayjs(edit.date).toDate(),
        descriptionValue: edit.description ?? "",
        amount: edit.amount ?? 0,
        categoryId: edit.categoryId ?? "",
        transactionType: edit.type ?? "Despesa",
        openDialog: true,
      })
      return
    }

    handleSetState("openDialog", open)
  }

  const handleSave = async () => {
    const parsed = transactionSchema.safeParse({
      description: descriptionValue,
      date,
      amount,
      categoryId,
      transactionType,
    })

    if (!parsed.success) {
      setErrors(getFieldErrors<TransactionFields>(parsed.error))
      return
    }

    if (mode === "edit" && edit) {
      await updateTransaction({
        variables: {
          id: edit.id,
          data: {
            description: parsed.data.description.trim(),
            type: parsed.data.transactionType,
            date: parsed.data.date,
            amount: parsed.data.amount,
            categoryId: parsed.data.categoryId,
          },
        },
        refetchQueries: [{ query: LIST_TRANSACTIONS }],
        awaitRefetchQueries: true,
      })

      return
    }

    await createTransaction({
      variables: {
        categoryId: parsed.data.categoryId,
        data: {
          description: parsed.data.description.trim(),
          type: parsed.data.transactionType,
          date: parsed.data.date,
          amount: parsed.data.amount,
          categoryId: parsed.data.categoryId,
        },
      },
      refetchQueries: [{ query: LIST_TRANSACTIONS }],
      awaitRefetchQueries: true,
    })
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <div className="flex flex-col items-end">
            <Button
              disabled={categories.length === 0}
              variant={
                mode === "edit" ? "outline" : type === "link" ? "link" : "default"
              }
              className={`${mode === "edit" ? "text-gray-700 cursor-pointer p-2" : type === "link" ? "bg-none cursor-pointer p-5" : "bg-brand cursor-pointer p-5"}`}
            >
              {mode === "edit" ? (
                <SquarePen className="size-5" />
              ) : (
                <Plus className="size-5" />
              )}
              {mode === "edit" ? "" : "Nova Transacao"}
            </Button>
            {categories.length === 0 && (
              <p className="text-red-base text-sm">
                Você precisa criar uma categoria antes de adicionar uma transação.
              </p>
            )}
          </div>
        }
      />
      <DialogContent className="p-5">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-base text-gray-800 font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div
          className={`flex flex-col ${errors.transactionType || errors.description ? "gap-2" : "gap-4"}`}
        >
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-gray-200 p-2">
            <Button
              disabled={loading || updateLoading}
              type="button"
              variant={transactionType === "Despesa" ? "secondary" : "outline"}
              className={`h-9 rounded-md cursor-pointer ${transactionType === "Despesa" ? "border-red-base text-gray-800" : "border-gray-200 text-gray-800"}`}
              onClick={() => {
                clearFieldError("transactionType")
                handleSetState("transactionType", "Despesa")
              }}
            >
              <CircleArrowDown
                className={`size-3 ${transactionType === "Despesa" ? "text-red-base" : "text-gray-800"}`}
              />
              Despesa
            </Button>
            <Button
              disabled={loading || updateLoading}
              type="button"
              variant={transactionType === "Receita" ? "secondary" : "outline"}
              className={`h-9 rounded-md cursor-pointer ${transactionType === "Receita" ? "border-green-base text-gray-800" : "border-gray-200 text-gray-800"}`}
              onClick={() => {
                clearFieldError("transactionType")
                handleSetState("transactionType", "Receita")
              }}
            >
              <CircleArrowUp
                className={`size-3 ${transactionType === "Receita" ? "text-green-base" : "text-gray-800"}`}
              />
              Receita
            </Button>
          </div>
          {errors.transactionType && (
            <LabelError error={errors.transactionType} />
          )}

          <div className="space-y-1.5">
            <Label htmlFor="transaction-description">Descricao</Label>
            <Input
              disabled={loading || updateLoading}
              id="transaction-description"
              placeholder="Ex: Almoco no restaurante"
              className="h-11 py-5"
              aria-invalid={Boolean(errors.description)}
              value={descriptionValue}
              onChange={(e) => {
                clearFieldError("description")
                handleSetState("descriptionValue", e.target.value)
              }}
            />
          </div>
          {errors.description && <LabelError error={errors.description} />}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger
                  className="h-11 py-5 w-full cursor-pointer border-gray-200"
                  render={
                    <Button
                      variant="outline"
                      data-empty={!date}
                      disabled={loading || updateLoading}
                      aria-invalid={Boolean(errors.date)}
                      className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    />
                  }
                >
                  <CalendarIcon />
                  {date ? (
                    dayjs(date).format("DD/MM/YYYY")
                  ) : (
                    <span>Selecione</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={date ?? undefined}
                    onSelect={(selectedDate) => {
                      clearFieldError("date")
                      handleSetState("date", selectedDate)
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <LabelError error={errors.date} />}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="transaction-value">Valor</Label>
              <Input
                disabled={loading || updateLoading}
                id="transaction-value"
                type="text"
                inputMode="decimal"
                className="h-11 py-5"
                placeholder="R$ 0,00"
                aria-invalid={Boolean(errors.amount)}
                value={amount === 0 ? "" : formatCentsToCurrencyBRL(amount)}
                onChange={(e) => {
                  clearFieldError("amount")
                  handleSetState(
                    "amount",
                    parseCurrencyToCentsBRL(e.target.value),
                  )
                }}
              />
              {errors.amount && <LabelError error={errors.amount} />}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select
              disabled={loading || updateLoading}
              value={categoryId}
              onValueChange={(value) => {
                clearFieldError("categoryId")
                handleSetState("categoryId", String(value))
              }}
            >
              <SelectTrigger
                className="w-full h-11 py-5"
                aria-invalid={Boolean(errors.categoryId)}
              >
                <SelectValue placeholder="Selecione">
                  {categories.find((item) => item.id === categoryId)?.title}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.categoryId && <LabelError error={errors.categoryId} />}
          </div>

          <Button
            className="h-10 bg-brand text-white hover:bg-brand-dark cursor-pointer"
            type="button"
            disabled={loading || updateLoading}
            onClick={handleSave}
          >
            {mode === "edit" ? "Atualizar" : "Salvar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
