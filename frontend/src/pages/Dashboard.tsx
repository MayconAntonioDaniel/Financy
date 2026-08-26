import { Header } from "./components/Header/Header"
import { RecentTransactionsTable } from "./components/Dashboard/RecentTransactionsTable"
import { CategoryTable } from "./components/Dashboard/CategoryTable"
import { InfoCard } from "./components/InfoCard/InfoCard"

export function Dashboard() {
  return (
    <>
      <Header />
      <div className="p-6 sm:p-12 gap-8 flex flex-col">
        <InfoCard type="dashboard" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full">
            <RecentTransactionsTable />
          </div>
          <div className="w-full lg:w-1/2">
            <CategoryTable />
          </div>
        </div>
      </div>
    </>
  )
}