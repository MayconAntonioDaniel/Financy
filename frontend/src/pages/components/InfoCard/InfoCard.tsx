import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { INFO_CARD_CATEGORIES, INFO_CARD_DASHBOARD } from "@/constants/constants";

interface InfoCardProps {
  type: "categories" | "dashboard" | "transactions";
}

export function InfoCard({ type }: InfoCardProps) {
  return (
    <div className="flex gap-8">
      {type === "dashboard" ? (
        <>
          { INFO_CARD_DASHBOARD.map(item => (
            <Card className="w-full" key={item.key}>
              <CardHeader>
                <CardTitle className="text-xs text-gray-500 flex items-center gap-2">
                  <item.icon className={item.styleIcon} />
                  {item.title}
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-black flex items-center mt-4">
                  R$ 1.000,00
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </>
      ) : (
        <>
          { INFO_CARD_CATEGORIES.map(item => (
            <Card className="w-full flex-row items-center p-4" key={item.key}>
              <CardHeader>
                <item.icon className={item.styleIcon} />
              </CardHeader>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-black flex items-center">
                  8
                </CardTitle>
                <CardDescription className="text-xs w-screen text-gray-500 flex items-center gap-2">
                  {item.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
