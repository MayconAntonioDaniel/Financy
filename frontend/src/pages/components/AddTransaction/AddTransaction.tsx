import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddTransaction() {
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Transações</h1>
        <p className="text-base text-gray-600">
          Gerencie todas as suas transações financeiras
        </p>
      </div>
      <Button variant="default" className="cursor-pointer p-5">
        <Plus className="size-5 " />
        Nova Transação
      </Button>
    </div>
  );
}
