import { AddEditContainer } from "./components/AddEditContainer/AddEditContainer";
import { Header } from "./components/Header/Header";
import { DescriptionTable } from "./components/Transactions/DescriptionTable";

export function Transactions() {
  return (
    <>
      <Header />
      <div className="p-6 sm:p-12 gap-6 flex flex-col">
        <AddEditContainer title='Transações' description='Gerencie todas as suas transações financeiras' typeButton="default" typeDialog='transaction' />
        <DescriptionTable />
      </div>
    </>
  );
}
