import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddTransactionProps {
  title: string;
  description: string;
}

export function AddTransaction({ title, description }: AddTransactionProps) {
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-base text-gray-600">
          {description}
        </p>
      </div>
      <Button variant="default" className="bg-brand cursor-pointer p-5">
        <Plus className="size-5 " />
        Nova Transação
      </Button>
    </div>
  );
}