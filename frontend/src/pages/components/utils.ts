import { ICONS } from "@/constants/constants";
import type { Transaction } from "@/stores/transactionStore";
import { CircleOff } from "lucide-react";

export function getCurrentMonthTransactions(transactions: Transaction[]): Transaction[] {
  const currentMonth = new Date().getMonth();

  return transactions.filter((transaction) => {
    const [year, month, day] = transaction.date.split("-").map(Number);
    const transactionDate = new Date(year, month - 1, day);
    return transactionDate.getMonth() === currentMonth;
  });
}


export function totalCategoryValue(transactions: Transaction[], category: string) {
  return getCurrentMonthTransactions(transactions)
    .filter(transaction => transaction.category === category)
    .reduce((total, transaction) => total + transaction.amount, 0);
}


export function totalCategoryItems(transactions: Transaction[], category: string) {
  return getCurrentMonthTransactions(transactions)
    .filter(transaction => transaction.category === category)
    .length;
}


export function mostUsedCategory(categories: { icon: string; numberOfItems: number }[]) {
  if (categories.length === 0) {
    return { icon: 'circleOff', numberOfItems: 0 };
  }

  const category = categories.reduce((mostUsed, category) => {
    return category.numberOfItems > mostUsed.numberOfItems ? category : mostUsed;
  }, categories[0]);

  return category;
}


export function calcTotalBalanceMonth(transactions: Transaction[]) {
  return getCurrentMonthTransactions(transactions).reduce((total, transaction) => {
      return transaction.type === "Receita"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
}


export function calcTotalRevenueMonth(transactions: Transaction[]) {
  return getCurrentMonthTransactions(transactions).reduce((total, transaction) => {
    return transaction.type === "Receita"
      ? total + transaction.amount
      : total;
  }, 0);
}


export function calcTotalExpenseMonth(transactions: Transaction[]) {
  return getCurrentMonthTransactions(transactions).reduce((total, transaction) => {
    return transaction.type === "Despesa"
      ? total + transaction.amount
      : total;
  }, 0);
}

export function descriptionCardDashboard(transactions: Transaction[], key: string) {
  switch (key) {
    case "totalBalance":
      return calcTotalBalanceMonth(transactions).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    case "monthlyRevenue":
      return calcTotalRevenueMonth(transactions).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    case "monthlyExpenses":
      return calcTotalExpenseMonth(transactions).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    default:
      return "R$ 0,00";
  }
}

export function descriptionCardCategories(
  transactions: Transaction[], 
  categories: { icon: string; numberOfItems: number }[], 
  mostUsed: { icon: string; numberOfItems: number } | null, 
  key: string
) {
  switch (key) {
    case "totalCategories":
      return categories.length;
    case "totalTransactions":
      return transactions.length;
    case "mostUsedCategory":
      return mostUsed?.numberOfItems ?? 0;
    default:
      return 0;
  }
}

export const getIconByKey = (iconKey?: string) => {
  return ICONS.find((item) => item.key === iconKey)?.type ?? CircleOff;
};