import { Header } from "./components/Header/Header"
import { RecentTransactionsTable } from "./components/Dashboard/RecentTransactionsTable"
import { CategoryTable } from "./components/Dashboard/CategoryTable"
import { InfoCard } from "./components/InfoCard/InfoCard"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"
import { useQuery } from "@apollo/client/react"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"

export function Dashboard() {
  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(LIST_CATEGORIES)

  const { data: transactionsData, loading: transactionsLoading } =
    useQuery(LIST_TRANSACTIONS)

  const categories = categoriesData?.listCategories || []
  const transactions = transactionsData?.listTransactions || []

  return (
    <>
      <Header />
      {(categoriesLoading || transactionsLoading) && <p>CARREGANDO...</p>}
      <div className="p-6 sm:p-12 gap-8 flex flex-col">
        <InfoCard
          type="dashboard"
          categories={categories}
          transactions={transactions}
        />
        <div className="flex flex-col lg:flex-row gap-8">
          {transactions.length === 0 ? (
            <p>Nenhuma transação recente</p>
          ) : (
            <div className="w-full">
              <RecentTransactionsTable
                transactions={transactions}
                categories={categories}
              />
            </div>
          )}
          {categories.length === 0 ? (
            <p>Nenhuma categoria disponível</p>
          ) : (
            <div className="w-full lg:w-1/2">
              <CategoryTable
                categories={categories}
                transactions={transactions}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
