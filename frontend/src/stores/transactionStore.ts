import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TransactionType = "Despesa" | "Receita"

export type Transaction = {
  id: string
  description: string
  type: TransactionType
  date: string
  amount: number
  category: string
}

type TransactionState = {
  transactions: Transaction[]
  addTransaction: (payload: Omit<Transaction, "id">) => void
  updateTransaction: (id: string, patch: Partial<Omit<Transaction, "id">>) => void
  deleteTransaction: (id: string) => void
  deleteTransactionsByCategory: (categoryTitle: string) => void
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (payload) => {
        set((state) => ({
          transactions: [
            {
              id: crypto.randomUUID(),
              ...payload,
            },
            ...state.transactions,
          ],
        }))
      },
      updateTransaction: (id, patch) => {
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === id
              ? {
                  ...transaction,
                  ...patch,
                }
              : transaction,
          ),
        }))
      },
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== id),
        }))
      },
      deleteTransactionsByCategory: (categoryTitle) => {
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.category !== categoryTitle),
        }))
      },
    }),
    {
      name: "storage-transactions",
    },
  ),
)
