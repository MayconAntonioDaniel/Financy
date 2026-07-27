import { DialogCategory } from "./components/DialogCategory";
import { DialogTransaction } from "./components/DialogTransaction";
import type { Category } from '@/stores/categoryStore'
import type { Transaction } from '@/stores/transactionStore'

interface AddContainerProps {
  title?: string;
  description?: string;
  typeButton?: "default" | "link";
  typeDialog: 'transaction' | 'category';
  editCategory?: Category;
  editTransaction?: Transaction;
}

export function AddEditContainer({ title, description, typeButton, typeDialog, editCategory, editTransaction }: AddContainerProps) {

  return (
    <div
      className={`w-full flex sm:flex-row gap-2 flex-col ${typeButton === "link" ? "justify-center" : "justify-between"}`}
    >
      { typeButton === "default" && (
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-base text-gray-600">{description}</p>
        </div>
      )}
      {typeDialog === 'transaction' ? (
        <DialogTransaction title='Nova Transação' description='Registre sua despesa ou receita' type={typeButton} edit={editTransaction} />
      ) : (
        <DialogCategory title='Nova Categoria' description='Organize suas transações com categorias' type={typeButton} edit={editCategory} />
      )}
    </div>
  );
}