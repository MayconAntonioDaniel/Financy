import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"
import { AddEditContainer } from "./components/AddEditContainer/AddEditContainer"
import { Header } from "./components/Header/Header"
import { DescriptionTable } from "./components/Transactions/DescriptionTable"
import { useQuery } from "@apollo/client/react"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"

export function Transactions() {
  const { data: categoriesData, loading: loadingCategories } =
    useQuery(LIST_CATEGORIES)

  const {
    data: transactionsData,
    loading: loadingTransactions,
    refetch,
  } = useQuery(LIST_TRANSACTIONS)

  const transactions = transactionsData?.listTransactions ?? []
  const categories = categoriesData?.listCategories ?? []

  return (
    <>
      <Header />
      <div className="p-6 sm:p-12 gap-6 flex flex-col">
        <AddEditContainer
          title="Transações"
          description="Gerencie todas as suas transações financeiras"
          typeButton="default"
          typeDialog="transaction"
        />
        {(loadingTransactions || loadingCategories) && <p>CARREGANDO...</p>}
        <DescriptionTable
          transactions={transactions}
          categories={categories}
          refetchTransactions={refetch}
        />
      </div>
    </>
  )
}
