import { DialogCategory } from "./components/DialogCategory";
import { DialogTransaction } from "./components/DialogTransaction";

interface AddTransactionProps {
  title: string;
  description: string;
  typeButton?: "default" | "link";
  typeDialog: 'transaction' | 'category';
}

export function AddTransaction({ title, description, typeButton, typeDialog }: AddTransactionProps) {

  return (
    <div
      className={`w-full flex items-center ${typeButton === "link" ? "justify-center" : "justify-between"}`}
    >
      { typeButton === "default" && (
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-base text-gray-600">{description}</p>
        </div>
      )}
      {typeDialog === 'transaction' ? (
        <DialogTransaction title='Nova Transação' description='Registre sua despesa ou receita' type={typeButton} />
      ) : (
        <DialogCategory title='Nova Categoria' description='Organize suas transações com categorias' type={typeButton} />
      )}
    </div>
  );
}