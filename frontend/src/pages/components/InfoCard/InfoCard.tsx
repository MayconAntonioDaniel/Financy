import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getIconByKey, INFO_CARD_CATEGORIES, INFO_CARD_DASHBOARD } from "@/constants/constants";
import { useTransactionStore } from "@/stores/transactionStore";
import { useCategoryStore } from "@/stores/categoryStore";

interface InfoCardProps {
  type: "categories" | "dashboard" | "transactions";
}

export function InfoCard({ type }: InfoCardProps) {
  const transactions = useTransactionStore((state) => state.transactions);
  const categories = useCategoryStore((state) => state.categories);
  const currentMonth = new Date().getMonth();

  const transactionsMonth = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth;
  });


  function mostUsedCategory() {
    if (categories.length === 0) {
      return { icon: 'imageOff', numberOfItems: 0, }
    }

    const category = categories.reduce((mostUsed, category) => {
      return category.numberOfItems > mostUsed.numberOfItems ? category : mostUsed;
    }, categories[0]);

    return category;
  }

  const mostUsed = mostUsedCategory();
  const mostUsedIcon = getIconByKey(mostUsed?.icon);

  function calcTotalBalanceMonth() {
    return transactionsMonth.reduce((total, transaction) => {
      return transaction.type === "Receita"
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  }

  function calcTotalRevenueMonth() {
    return transactionsMonth.reduce((total, transaction) => {
      return transaction.type === "Receita"
        ? total + transaction.amount
        : total;
    }, 0);
  }

  function calcTotalExpenseMonth() {
    return transactionsMonth.reduce((total, transaction) => {
      return transaction.type === "Despesa"
        ? total + transaction.amount
        : total;
    }, 0);
  }

  function descriptionCardDashboard(key: string) {
    switch (key) {
      case "totalBalance":
        return calcTotalBalanceMonth().toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      case "monthlyRevenue":
        return calcTotalRevenueMonth().toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      case "monthlyExpenses":
        return calcTotalExpenseMonth().toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      default:
        return "R$ 0,00";
    }
  }

  function descriptionCardCategories(key: string) {
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

  return (
    <div className="flex gap-8">
      {type === "dashboard" ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 w-full">
          { INFO_CARD_DASHBOARD.map(item => (
            <Card className="w-full" key={item.key}>
              <CardHeader>
                <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
                  <item.icon className={item.styleIcon} />
                  {item.title}
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-black flex items-center mt-4">
                  {descriptionCardDashboard(item.key)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 w-full">
          { INFO_CARD_CATEGORIES.map(item => (
            <Card className="w-full flex-row items-center p-4" key={item.key}>
              <CardHeader>
                { item.key === "mostUsedCategory" 
                  ? (() => {
                    const Icon = mostUsedIcon;
                    return <Icon className={item.styleIcon} />;
                  })()
                  : <item.icon className={item.styleIcon} />
                }
              </CardHeader>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-black flex items-center">
                  {descriptionCardCategories(item.key)}
                </CardTitle>
                <CardDescription className="text-xs w-screen text-gray-500 flex items-center gap-2">
                  {item.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
