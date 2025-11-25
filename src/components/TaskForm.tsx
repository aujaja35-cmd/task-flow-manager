import { useState } from 'react';
import { Task, TaskCategory, TaskPriority } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editTask?: Task | null;
  onCancel?: () => void;
}

/**
 * TaskForm Component
 * Form for creating or editing tasks
 */
export const TaskForm = ({ onSubmit, editTask, onCancel }: TaskFormProps) => {
  const [description, setDescription] = useState(editTask?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(editTask?.priority || 'medium');
  const [category, setCategory] = useState<TaskCategory>(editTask?.category || 'other');
  const [dueDate, setDueDate] = useState(editTask?.dueDate || '');
  const [error, setError] = useState('');

  /**
   * Handle form submission with validation
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate description
    if (!description.trim()) {
      setError('Task description is required');
      return;
    }

    if (description.length > 200) {
      setError('Task description must be less than 200 characters');
      return;
    }

    // Validate due date if provided
    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        setError('Due date cannot be in the past');
        return;
      }
    }

    // Submit the task
    onSubmit({
      description: description.trim(),
      status: editTask?.status || 'pending',
      priority,
      category,
      dueDate: dueDate || undefined,
      completedAt: editTask?.completedAt,
    });

    // Reset form if not editing
    if (!editTask) {
      setDescription('');
      setPriority('medium');
      setCategory('other');
      setDueDate('');
    }
  };

  return (
    <Card className="p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {editTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          {editTask && onCancel && (
            <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Task description */}
        <div className="space-y-2">
          <Label htmlFor="description">Task Description *</Label>
          <Input
            id="description"
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className={error ? 'border-destructive' : ''}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {/* Priority and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as TaskCategory)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Due date */}
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date (Optional)</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full">
          {editTask ? (
            'Update Task'
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
