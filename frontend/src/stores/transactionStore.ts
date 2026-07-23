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
    }),
    {
      name: "storage-transactions",
    },
  ),
)
