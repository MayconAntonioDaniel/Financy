import { Header } from "./components/Header/Header";
import { FilterInputs } from "./components/Transactions/FilterInputs";
import { DescriptionTable } from "./components/Transactions/DescriptionTable";
import { AddContainer } from "./components/AddContainer/AddContainer";

export function Transactions() {
  return (
    <>
      <Header />
      <div className="p-12 gap-6 flex flex-col">
        <AddContainer title='Transações' description='Gerencie todas as suas transações financeiras' typeButton="default" typeDialog='transaction' />
        <FilterInputs />
        <DescriptionTable />
      </div>
    </>
  );
}
