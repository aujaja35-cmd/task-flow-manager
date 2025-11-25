/**
 * Task Priority Levels
 * Defines the importance of each task
 */
export type TaskPriority = 'high' | 'medium' | 'low';

/**
 * Task Status
 * Tracks whether a task is pending or completed
 */
export type TaskStatus = 'pending' | 'completed';

/**
 * Task Category
 * Allows tasks to be organized by category
 */
export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'education' | 'other';

/**
 * Task Interface
 * Represents a single task in the system
 */
export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

/**
 * Task Filter Options
 * Used for filtering tasks in the UI
 */
export interface TaskFilters {
  status?: TaskStatus | 'all';
  priority?: TaskPriority | 'all';
  category?: TaskCategory | 'all';
  searchQuery?: string;
}

/**
 * Task Statistics
 * Aggregated data about tasks
 */
export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
  overdue: number;
}
