import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, SquarePen } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CATEGORY_SELECT_COLORS, ICONS } from "@/constants/constants"
import {
  categorySchema,
  getFieldErrors,
  type FieldErrors,
} from "@/schemas/forms"
import { LabelError } from "@/components/LabelError/LabelError"
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/lib/graphql/mutations/Category"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import type { Category } from "@/types"

interface DialogCategoryProps {
  title: string
  description?: string
  type?: "default" | "link"
  mode?: "add" | "edit"
  edit?: Category
}

type CategoryFields = "title" | "description" | "icon" | "color"

const INITIAL_CATEGORY_STATE = {
  titleValue: "",
  descriptionValue: "",
  icon: "",
  color: "",
  openDialog: false,
  numberOfItems: 0,
}

export function DialogCategory({
  title,
  description,
  type,
  mode = "add",
  edit,
}: DialogCategoryProps) {
  const [state, setState] = useState(INITIAL_CATEGORY_STATE)
  const [errors, setErrors] = useState<FieldErrors<CategoryFields>>({})
  const {
    titleValue,
    descriptionValue,
    icon,
    color,
    openDialog,
    numberOfItems,
  } = state

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria criada com sucesso!")
      setErrors({})
      handleCloseDialog()
    },
    onError() {
      toast.error("Erro ao criar categoria.")
    },
  })

  const [updateCategory, { loading: updateLoading }] = useMutation(UPDATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria atualizada com sucesso!")
      setErrors({})
      handleCloseDialog()
    },
    onError() {
      toast.error("Erro ao atualizar categoria.")
    },
  })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseDialog()
      return
    }

    setErrors({})

    if (mode === "edit" && edit) {
      setState({
        titleValue: edit.title,
        descriptionValue: edit.description ?? "",
        icon: edit.icon,
        color: edit.color,
        openDialog: true,
        numberOfItems: edit.numberOfItems,
      })
      return
    }

    handleSetState("openDialog", open)
  }

  const handleSave = async () => {
    const parsed = categorySchema.safeParse({
      title: titleValue,
      description: descriptionValue,
      icon,
      color,
    })

    if (!parsed.success) {
      setErrors(getFieldErrors<CategoryFields>(parsed.error))
      return
    }

    if (mode === "edit" && edit) {
      await updateCategory({
        variables: {
          id: edit.id,
          data: {
            title: parsed.data.title,
            description: parsed.data.description?.trim() ?? "",
            icon: parsed.data.icon,
            color: parsed.data.color,
            numberOfItems,
          },
        },
        refetchQueries: [{ query: LIST_CATEGORIES }],
        awaitRefetchQueries: true,
      })

      return
    }

    await createCategory({
      variables: {
        data: {
          title: parsed.data.title,
          description: parsed.data.description?.trim() ?? "",
          icon: parsed.data.icon,
          color: parsed.data.color,
          numberOfItems,
        },
      },
      refetchQueries: [{ query: LIST_CATEGORIES }],
      awaitRefetchQueries: true,
    })
  }

  const handleSetState = (property: string, value: any) => {
    setState((prev) => ({ ...prev, [property]: value }))
  }

  const clearFieldError = (field: CategoryFields) => {
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
      setState(INITIAL_CATEGORY_STATE)
    }, 300)
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
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
            {mode === "edit" ? "" : "Nova Categoria"}
          </Button>
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
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="category-title">Titulo</Label>
            <Input
              id="category-title"
              placeholder="Ex. Alimentacao"
              className="h-11 py-5"
              aria-invalid={Boolean(errors.title)}
              value={titleValue}
              disabled={loading || updateLoading}
              onChange={(e) => {
                clearFieldError("title")
                handleSetState("titleValue", e.target.value)
              }}
            />
            {errors.title && <LabelError error={errors.title} />}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category-description">Descricao</Label>
            <Input
              id="category-description"
              placeholder="Descricao da categoria"
              disabled={loading || updateLoading}
              className="h-11 py-5"
              aria-invalid={Boolean(errors.description)}
              value={descriptionValue}
              onChange={(e) => {
                clearFieldError("description")
                handleSetState("descriptionValue", e.target.value)
              }}
            />
            {errors.description && <LabelError error={errors.description} />}
            <Label
              htmlFor="category-description"
              className="text-gray-500 text-xs"
            >
              Opcional
            </Label>
          </div>

          <div className="space-y-1.5 mt-2">
            <Label>Icone</Label>
            <button
              disabled={loading || updateLoading}
              className="grid grid-cols-6 sm:grid-cols-8 place-items-center gap-2 mt-2"
            >
              {ICONS.map((item) => (
                <div
                  key={item.key}
                  className={`w-10 h-10 border rounded-md flex items-center justify-center cursor-pointer ${
                    item.key === icon
                      ? "border-brand border-2 bg-green-light"
                      : "border-gray-500"
                  }`}
                  onClick={() => {
                    clearFieldError("icon")
                    handleSetState("icon", item.key)
                  }}
                >
                  <item.type className="size-5 text-gray-500" />
                </div>
              ))}
            </button>
            {errors.icon && <LabelError error={errors.icon} />}
          </div>

          <div className="space-y-1.5 mb-2">
            <Label>Cor</Label>
            <button
              disabled={loading || updateLoading}
              className="grid grid-cols-6 sm:grid-cols-7 gap-2 mt-2"
            >
              {CATEGORY_SELECT_COLORS.map((item) => (
                <div
                  key={item.key}
                  className={`p-1 border rounded-md flex items-center justify-center cursor-pointer ${
                    color === item.key
                      ? "border-brand border-2 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    clearFieldError("color")
                    handleSetState("color", item.key)
                  }}
                >
                  <div className={`w-10 h-5 rounded-sm ${item.style}`} />
                </div>
              ))}
            </button>
            {errors.color && <LabelError error={errors.color} />}
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
