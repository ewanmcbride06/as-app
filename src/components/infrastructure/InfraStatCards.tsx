import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatCardItem {
  label: string;
  value: string;
  subtitle?: string;
  showMenu?: boolean;
}

interface InfraStatCardsProps {
  stats: StatCardItem[];
}

const InfraStatCards = ({ stats }: InfraStatCardsProps) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card relative">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            {stat.showMenu && (
              <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1 -mt-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="mt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            {stat.subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{stat.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfraStatCards;
