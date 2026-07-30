import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { INFO_CARD_CATEGORIES, INFO_CARD_DASHBOARD } from "@/constants/constants";
import { useTransactionStore } from "@/stores/transactionStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { getIconByKey, mostUsedCategory, descriptionCardDashboard, descriptionCardCategories } from "../utils";

interface InfoCardProps {
  type: "categories" | "dashboard" | "transactions";
}

export function InfoCard({ type }: InfoCardProps) {
  const transactions = useTransactionStore((state) => state.transactions);
  const categories = useCategoryStore((state) => state.categories);
  
  const mostUsed = mostUsedCategory(categories);
  const mostUsedIcon = getIconByKey(mostUsed?.icon);

  return (
    <div className="flex gap-8">
      {type === "dashboard" ? (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-20 w-full">
          { INFO_CARD_DASHBOARD.map(item => (
            <Card className="w-full" key={item.key}>
              <CardHeader className="flex flex-row sm:flex-col items-center gap-4 sm:gap-0">
                <CardTitle className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                  <item.icon className={item.styleIcon} />
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xl sm:text-3xl font-bold text-black flex items-center mt-0 sm:mt-4">
                  {descriptionCardDashboard(transactions, item.key)}
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
              <CardHeader className="flex flex-row sm:flex-col gap-4 items-center sm:items-start sm:gap-0 w-full">
                <CardTitle className="text-3xl font-bold text-black flex items-center">
                  {descriptionCardCategories(transactions, categories, mostUsed, item.key)}
                </CardTitle>
                <CardDescription className="text-gray-500 text-xs sm:text-sm flex items-center gap-2">
                  { item.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
