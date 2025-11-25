import { useState, useEffect, useMemo } from 'react';
import { Task, TaskFilters as TaskFiltersType } from '@/types/task';
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  uncompleteTask,
  getTaskStats,
  initializeSampleTasks,
} from '@/lib/taskStorage';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskStats } from '@/components/TaskStats';
import { Button } from '@/components/ui/button';
import { ListTodo, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * Index Page - Main Task Manager Application
 * Group 9 Simple Task Manager Application
 */
const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFiltersType>({
    status: 'all',
    priority: 'all',
    category: 'all',
    searchQuery: '',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  /**
   * Load tasks on component mount
   */
  useEffect(() => {
    initializeSampleTasks();
    loadTasks();
  }, []);

  /**
   * Load tasks from storage
   */
  const loadTasks = () => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
  };

  /**
   * Handle task creation or update
   */
  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      if (editingTask) {
        // Update existing task
        const updated = updateTask(editingTask.id, taskData);
        if (updated) {
          toast({
            title: 'Success',
            description: 'Task updated successfully',
          });
          setEditingTask(null);
          setShowForm(false);
        }
      } else {
        // Add new task
        addTask(taskData);
        toast({
          title: 'Success',
          description: 'Task created successfully',
        });
        setShowForm(false);
      }
      loadTasks();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save task',
        variant: 'destructive',
      });
    }
  };

  /**
   * Toggle task completion status
   */
  const handleToggleTask = (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      if (task.status === 'completed') {
        uncompleteTask(id);
        toast({
          title: 'Task marked as pending',
        });
      } else {
        completeTask(id);
        toast({
          title: 'Task completed!',
        });
      }
      loadTasks();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
    }
  };

  /**
   * Handle task edit
   */
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  /**
   * Handle task deletion
   */
  const handleDeleteTask = (id: string) => {
    try {
      deleteTask(id);
      toast({
        title: 'Task deleted',
      });
      loadTasks();
      if (editingTask?.id === id) {
        setEditingTask(null);
        setShowForm(false);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
    }
  };

  /**
   * Cancel editing
   */
  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  /**
   * Filter and sort tasks based on current filters
   */
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.description.toLowerCase().includes(query)
      );
    }

    // Sort: pending first, then by priority, then by due date
    filtered.sort((a, b) => {
      // Pending tasks first
      if (a.status !== b.status) {
        return a.status === 'pending' ? -1 : 1;
      }

      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      // Then by due date (earliest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      // Finally by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [tasks, filters]);

  /**
   * Calculate statistics
   */
  const stats = useMemo(() => getTaskStats(), [tasks]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <ListTodo className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <p className="text-sm text-muted-foreground">
                  Group 9 Simple Task Manager Application
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setShowForm(!showForm);
                setEditingTask(null);
              }}
              variant={showForm ? 'outline' : 'default'}
            >
              {showForm ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <TaskStats stats={stats} />

        {/* Task form */}
        {showForm && (
          <TaskForm
            onSubmit={handleSubmitTask}
            editTask={editingTask}
            onCancel={handleCancelEdit}
          />
        )}

        {/* Filters */}
        <TaskFilters filters={filters} onFilterChange={setFilters} />

        {/* Task list */}
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Group 9 Simple Task Manager Application © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
