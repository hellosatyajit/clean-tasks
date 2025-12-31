import { useState } from 'react';
import { mockTasks, Task } from '../data/mockTasks';
import TaskGroup from '../components/TaskGroup';
import BottomNav from '../components/BottomNav';
import DesktopActionButtons from '../components/DesktopActionButtons';
import AddTaskBottomSheet from '../components/AddTaskBottomSheet';
import AddTaskModal from '../components/AddTaskModal';
import SettingsSheet from '../components/SettingsSheet';
import SettingsModal from '../components/SettingsModal';
import MobileTryCard from '../components/MobileTryCard';
import PWAInstallBanner from '../components/PWAInstallBanner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useIsDesktop } from '../hooks/useMediaQuery';

const STORAGE_KEY = 'clean-tasks-data';

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, mockTasks);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);
  const isDesktop = useIsDesktop();

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
      <div className="flex flex-col gap-5 pt-4 pb-0 lg:pb-4 flex-1" style={{ minHeight: 0 }}>
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

      {/* PWA Install Banner - Mobile only */}
      {!isDesktop && <PWAInstallBanner />}

      {/* Bottom Navigation - Mobile only */}
      {!isDesktop && (
        <BottomNav
          onCompleteChecked={handleCompleteChecked}
          onAddTask={() => setIsAddSheetOpen(true)}
          onSettingsClick={() => setIsSettingsSheetOpen(true)}
        />
      )}

      {/* Desktop Action Buttons - Desktop only */}
      {isDesktop && (
        <DesktopActionButtons
          onCompleteChecked={handleCompleteChecked}
          onAddTask={() => setIsAddSheetOpen(true)}
          onSettingsClick={() => setIsSettingsSheetOpen(true)}
        />
      )}

      {/* Mobile Try Card - Desktop only */}
      {isDesktop && <MobileTryCard />}

      {/* Add Task - Mobile: Bottom Sheet, Desktop: Modal */}
      {isDesktop ? (
        <AddTaskModal
          isOpen={isAddSheetOpen}
          onClose={() => setIsAddSheetOpen(false)}
          onAddTask={handleAddTask}
        />
      ) : (
        <AddTaskBottomSheet
          isOpen={isAddSheetOpen}
          onClose={() => setIsAddSheetOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {/* Settings - Mobile: Sheet, Desktop: Modal */}
      {isDesktop ? (
        <SettingsModal
          isOpen={isSettingsSheetOpen}
          onClose={() => setIsSettingsSheetOpen(false)}
        />
      ) : (
        <SettingsSheet
          isOpen={isSettingsSheetOpen}
          onClose={() => setIsSettingsSheetOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskListPage;