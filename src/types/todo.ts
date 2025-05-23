export type Priority = 'High' | 'Mid' | 'Low';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  dueTime: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export type SortOption = 'dateAdded' | 'dueDate' | 'priority'; 