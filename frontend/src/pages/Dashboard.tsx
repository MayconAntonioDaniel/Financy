import { Header } from "./components/Header/Header"
import { MonthlyCardValue } from "./components/Dashboard/MonthlyCardValue"
import { RecentTransactionsTable } from "./components/Dashboard/RecentTransactionsTable"
import { CategoryTable } from "./components/Dashboard/CategoryTable"

export function Dashboard() {
  return (
    <>
      <Header />
      <div className="p-12 gap-8 flex flex-col">
        <MonthlyCardValue />
        <div className="flex gap-8">
          <div className="w-full">
           <RecentTransactionsTable />
          </div>
          <div className="w-1/2">
            <CategoryTable />
          </div>
        </div>
      </div>
    </>
  )
}