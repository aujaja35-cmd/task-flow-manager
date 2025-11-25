import { Task, TaskStats } from '@/types/task';

/**
 * Local Storage key for tasks
 */
const STORAGE_KEY = 'group9_tasks';

/**
 * Get all tasks from local storage
 * @returns Array of tasks
 */
export const getTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(STORAGE_KEY);
    if (!tasksJson) return [];
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

/**
 * Save tasks to local storage
 * @param tasks - Array of tasks to save
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

/**
 * Add a new task
 * @param task - Task to add (without id and createdAt)
 * @returns The newly created task
 */
export const addTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
  const tasks = getTasks();
  const newTask: Task = {
    ...task,
    id: generateTaskId(),
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

/**
 * Update an existing task
 * @param id - Task ID
 * @param updates - Partial task updates
 * @returns Updated task or null if not found
 */
export const updateTask = (id: string, updates: Partial<Task>): Task | null => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  const updatedTask = { ...tasks[index], ...updates };
  tasks[index] = updatedTask;
  saveTasks(tasks);
  return updatedTask;
};

/**
 * Delete a task by ID
 * @param id - Task ID
 * @returns True if deleted, false if not found
 */
export const deleteTask = (id: string): boolean => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(t => t.id !== id);
  if (filteredTasks.length === tasks.length) return false;
  saveTasks(filteredTasks);
  return true;
};

/**
 * Mark a task as completed
 * @param id - Task ID
 * @returns Updated task or null if not found
 */
export const completeTask = (id: string): Task | null => {
  return updateTask(id, {
    status: 'completed',
    completedAt: new Date().toISOString(),
  });
};

/**
 * Mark a task as pending
 * @param id - Task ID
 * @returns Updated task or null if not found
 */
export const uncompleteTask = (id: string): Task | null => {
  return updateTask(id, {
    status: 'pending',
    completedAt: undefined,
  });
};

/**
 * Calculate task statistics
 * @returns Task statistics object
 */
export const getTaskStats = (): TaskStats => {
  const tasks = getTasks();
  const now = new Date();
  
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    highPriority: tasks.filter(t => t.priority === 'high' && t.status === 'pending').length,
    overdue: tasks.filter(t => {
      if (t.status === 'completed' || !t.dueDate) return false;
      return new Date(t.dueDate) < now;
    }).length,
  };
};

/**
 * Generate a unique task ID
 * @returns Unique task ID string
 */
const generateTaskId = (): string => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Initialize with sample tasks if storage is empty
 */
export const initializeSampleTasks = (): void => {
  const tasks = getTasks();
  if (tasks.length === 0) {
    const sampleTasks: Omit<Task, 'id' | 'createdAt'>[] = [
      {
        description: 'Complete project documentation',
        status: 'pending',
        priority: 'high',
        category: 'work',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        description: 'Buy groceries',
        status: 'pending',
        priority: 'medium',
        category: 'shopping',
      },
      {
        description: 'Review code changes',
        status: 'completed',
        priority: 'medium',
        category: 'work',
        completedAt: new Date().toISOString(),
      },
      {
        description: 'Schedule dentist appointment',
        status: 'pending',
        priority: 'low',
        category: 'health',
      },
    ];
    
    sampleTasks.forEach(task => addTask(task));
  }
};
