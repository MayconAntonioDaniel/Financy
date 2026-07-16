import { Header } from "./components/Header/Header";
import { FilterInputs } from "./components/Transactions/FilterInputs";
import { DescriptionTable } from "./components/Transactions/DescriptionTable";
import { AddTransaction } from "./components/AddTransaction/AddTransaction";

export function Transactions() {
  return (
    <>
      <Header />
      <div className="p-12 gap-6 flex flex-col">
        <AddTransaction title='Transações' description='Gerencie todas as suas transações financeiras' />
        <FilterInputs />
        <DescriptionTable />
      </div>
    </>
  );
}
