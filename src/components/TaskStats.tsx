import { TaskStats as TaskStatsType } from '@/types/task';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Circle, AlertCircle, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStatsType;
}

/**
 * TaskStats Component
 * Displays statistics about tasks in a grid of cards
 */
export const TaskStats = ({ stats }: TaskStatsProps) => {
  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Circle,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      icon: AlertCircle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-6 transition-smooth hover:shadow-card-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
