import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Category = {
  id: string
  title: string
  description?: string
  icon: string
  color: string
  numberOfItems: number
}

type CategoryState = {
  categories: Category[]
  addCategory: (payload: Omit<Category, "id">) => void
  updateCategory: (id: string, patch: Partial<Omit<Category, "id">>) => void
  deleteCategory: (id: string) => void
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      addCategory: (payload) => {
        set((state) => ({
          categories: [
            {
              id: crypto.randomUUID(),
              ...payload,
            },
            ...state.categories,
          ],
        }))
      },
      updateCategory: (id, patch) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id
              ? {
                  ...category,
                  ...patch,
                }
              : category,
          ),
        }))
      },
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }))
      },
    }),
    {
      name: "storage-categories",
    },
  ),
)
