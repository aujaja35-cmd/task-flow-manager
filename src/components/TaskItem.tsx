import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Edit, Trash2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/**
 * TaskItem Component
 * Displays a single task with actions
 */
export const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const isOverdue = task.status === 'pending' && task.dueDate && new Date(task.dueDate) < new Date();

  /**
   * Get priority badge color
   */
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  /**
   * Get category badge color
   */
  const getCategoryColor = () => {
    return 'bg-secondary text-secondary-foreground border-secondary';
  };

  /**
   * Format due date
   */
  const formatDueDate = (date: string) => {
    const dueDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dueDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return dueDate.toLocaleDateString();
    }
  };

  return (
    <Card className={cn(
      "p-4 transition-smooth hover:shadow-card-lg",
      task.status === 'completed' && "opacity-60"
    )}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div className="pt-1">
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={() => onToggle(task.id)}
            className="w-5 h-5"
          />
        </div>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-base mb-2",
            task.status === 'completed' && "line-through text-muted-foreground"
          )}>
            {task.description}
          </p>

          {/* Badges and due date */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={getPriorityColor()}>
              {task.priority}
            </Badge>
            <Badge variant="outline" className={getCategoryColor()}>
              {task.category}
            </Badge>
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-sm",
                isOverdue ? "text-destructive" : "text-muted-foreground"
              )}>
                {isOverdue && <AlertCircle className="w-3 h-3" />}
                <Calendar className="w-3 h-3" />
                <span>{formatDueDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            disabled={task.status === 'completed'}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
