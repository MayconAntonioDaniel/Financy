import { Header } from "./components/Header/Header"
import { InfoCard } from "./components/InfoCard/InfoCard"
import { CardCategories } from "./components/Categories/CardCategories"
import { AddEditContainer } from "./components/AddEditContainer/AddEditContainer"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import { useQuery } from "@apollo/client/react"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transaction"

export function Categories() {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    refetch,
  } = useQuery(LIST_CATEGORIES)

  const { data: transactionsData, loading: transactionsLoading } =
    useQuery(LIST_TRANSACTIONS)

  const categories = categoriesData?.listCategories || []
  const transactions = transactionsData?.listTransactions || []

  return (
    <>
      <Header />
      {(categoriesLoading || transactionsLoading) && <p>...</p>}
      <div className="p-6 sm:p-12 gap-6 flex flex-col">
        <AddEditContainer
          title="Categorias"
          description="Organize suas transações por categorias"
          typeButton="default"
          typeDialog="category"
        />
        <InfoCard
          type="categories"
          categories={categories}
          transactions={transactions}
        />
        <CardCategories categories={categories} onRefetch={refetch} />
      </div>
    </>
  )
}
