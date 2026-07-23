import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { COLORS, ICONS } from "@/constants/constants";
import { useState } from "react";
import { useCategoryStore } from "@/stores/categoryStore";

interface DialogCategoryProps {
  title: string;
  description: string;
  type?: "default" | "link";
}

const INITIAL_CATEGORY_STATE = {
  titleValue: "",
  descriptionValue: "",
  icon: "",
  color: "",
  openDialog: false,
  error: "",
  numberOfItems: 0,
}

export function DialogCategory({ title, description, type }: DialogCategoryProps) {
  const [state, setState] = useState(INITIAL_CATEGORY_STATE);
  const { titleValue, descriptionValue, icon, color, openDialog, error, numberOfItems } = state;
  const addCategory = useCategoryStore((state) => state.addCategory);

  const handleSetState = (property: string, value: any) => {
    setState((prev) => ({ ...prev, [property]: value }));
  }

  const handleCloseDialog = () => {
    setState(INITIAL_CATEGORY_STATE);
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseDialog();
      return;
    }
     
    handleSetState("openDialog", open);
  }

  const handleSave = () => {
    addCategory({
      title: titleValue.trim(),
      description: descriptionValue.trim(),
      icon,
      color,
      numberOfItems,
    });


    handleCloseDialog();
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant={type === "link" ? "link" : "default"}
            className={`${type === "link" ? "bg-none cursor-pointer p-5" : "bg-brand cursor-pointer p-5"}`}
          >
            <Plus className="size-5" />
            Nova Categoria
          </Button>
        }
      />
      <DialogContent className="max-w-130 p-5">
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
            <Label htmlFor="transaction-description">Título</Label>
            <Input
              id="transaction-description"
              placeholder="Ex. Alimentação"
              className="h-11 py-5"
              value={titleValue}
              onChange={(e) => {
                handleSetState("error", "");
                handleSetState("titleValue", e.target.value);
              }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="transaction-detail">Descrição</Label>
            <Input
              id="transaction-detail"
              placeholder="Descrição da categoria"
              className="h-11 py-5"
              value={descriptionValue}
              onChange={(e) => handleSetState("descriptionValue", e.target.value)}
            />
            <Label htmlFor="transaction-detail" className="text-gray-500 text-xs">
              Opcional
            </Label>
          </div>
          <div className="space-y-1.5 mt-2">
            <Label>Ícone</Label>
            <div className="grid grid-cols-8 gap-2 mt-2">
              { ICONS.map((item) => (
                <div
                  key={item.key}
                  className={`w-10 h-10 border rounded-md flex items-center justify-center cursor-pointer ${
                    item.key === icon ? "border-brand border-2 bg-gray-100" : "border-gray-500"
                  }`}
                  onClick={() => handleSetState("icon", item.key)}
                >
                  <item.type className="size-5 text-gray-500" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-1.5 mb-2">
            <Label>Cor</Label>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {COLORS.map(({ key, style }) => (
                <div
                  key={key}
                  className={`p-1 border rounded-md flex items-center justify-center cursor-pointer ${
                    color === key ? "border-brand border-2 bg-gray-100" : "border-gray-300"
                  }`}
                  onClick={() => handleSetState("color", key)}
                >
                  <div className={`w-10 h-5 rounded-sm ${style}`} />
                </div>
              ))}
            </div>
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
