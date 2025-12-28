import { useState } from 'react';
import { mockTasks, Task } from '../data/mockTasks';
import TaskGroup from '../components/TaskGroup';
import BottomNav from '../components/BottomNav';
import AddTaskBottomSheet from '../components/AddTaskBottomSheet';
import SettingsSheet from '../components/SettingsSheet';
import PWAInstallBanner from '../components/PWAInstallBanner';

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);

  const todayTasks = tasks.filter(task => task.category === 'today');
  const somedayTasks = tasks.filter(task => task.category === 'someday');

  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSwapCategory = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, category: task.category === 'today' ? 'someday' : 'today' }
          : task
      )
    );
  };

  const handleReorderTasks = (category: 'today' | 'someday', newOrder: Task[]) => {
    setTasks(prevTasks => {
      const otherCategoryTasks = prevTasks.filter(task => task.category !== category);
      const result = [...newOrder, ...otherCategoryTasks];
      return result;
    });
  };

  const handleAddTask = (title: string, category: 'today' | 'someday') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      category
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleCompleteChecked = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  const handleDeleteTask = (taskId: string) => {
    // Temporarily disabled
    return;
  };


  return (
    <div className="flex flex-col" style={{ backgroundColor: 'var(--color-page-bg)', height: '100svh' }}>
      {/* Task Groups Container */}
      <div className="flex flex-col gap-5 pt-4 flex-1" style={{ minHeight: 0 }}>
        <div style={{ flex: '1 1 0', minHeight: 0 }}>
          <TaskGroup
            category="today"
            tasks={todayTasks}
            onToggleTask={handleToggleTask}
            onSwapCategory={handleSwapCategory}
            onDeleteTask={handleDeleteTask}
            onReorder={handleReorderTasks}
          />
        </div>
        <div style={{ flex: '1 1 0', minHeight: 0 }}>
          <TaskGroup
            category="someday"
            tasks={somedayTasks}
            onToggleTask={handleToggleTask}
            onSwapCategory={handleSwapCategory}
            onDeleteTask={handleDeleteTask}
            onReorder={handleReorderTasks}
          />
        </div>
      </div>

      {/* PWA Install Banner */}
      <PWAInstallBanner />

      {/* Bottom Navigation */}
      <BottomNav
        onCompleteChecked={handleCompleteChecked}
        onAddTask={() => setIsAddSheetOpen(true)}
        onSettingsClick={() => setIsSettingsSheetOpen(true)}
      />

      {/* Add Task Bottom Sheet */}
      <AddTaskBottomSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        onAddTask={handleAddTask}
      />

      {/* Settings Sheet */}
      <SettingsSheet
        isOpen={isSettingsSheetOpen}
        onClose={() => setIsSettingsSheetOpen(false)}
      />
    </div>
  );
};

export default TaskListPage;