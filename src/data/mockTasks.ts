export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'today' | 'someday';
}

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Buy X and rename it Twitter',
    completed: false,
    category: 'today',
  },
  {
    id: '2',
    title: 'Make X Post',
    completed: false,
    category: 'today',
  },
  {
    id: '3',
    title: 'Call Elon',
    completed: false,
    category: 'today',
  },
  {
    id: '4',
    title: 'Do Client Works',
    completed: false,
    category: 'someday',
  },
];