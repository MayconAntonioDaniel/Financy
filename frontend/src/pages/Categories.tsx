import { Header } from "./components/Header/Header";
import { InfoCard } from "./components/InfoCard/InfoCard";
import { CardCategories } from "./components/Categories/CardCategories";
import { AddEditContainer } from "./components/AddEditContainer/AddEditContainer";

export function Categories() {
  return (
    <>
      <Header />
      <div className="p-12 gap-6 flex flex-col">
        <AddEditContainer title='Categorias' description='Organize suas transações por categorias' typeButton="default" typeDialog='category' />
        <InfoCard type="categories" />
        <CardCategories/>
      </div>
    </>
  )
}