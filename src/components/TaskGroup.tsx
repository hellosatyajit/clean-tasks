import { calendarOutline, calendarClearOutline, arrowDownOutline, arrowUpOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { Task } from '../data/mockTasks';
import TaskItem from './TaskItem';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  closestCenter
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useState } from 'react';

interface TaskGroupProps {
  category: string;
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onSwapCategory: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onReorder: (category: 'today' | 'someday', newOrder: Task[]) => void;
}

const TaskGroup: React.FC<TaskGroupProps> = ({ category, tasks, onToggleTask, onSwapCategory, onDeleteTask, onReorder }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure sensors - TouchSensor for mobile with long-press activation, MouseSensor for desktop
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,        // wait 150ms (long press activation)
        tolerance: 8       // allow slight finger shake
      }
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,       // require 8px movement before activation (prevents accidental drags)
      }
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    // Block scroll during drag
    document.body.style.overflow = 'hidden';
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // Re-enable scroll
    document.body.style.overflow = '';
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      onReorder(category as 'today' | 'someday', newOrder);
    }
    
    setActiveId(null);
  };

  const handleDragCancel = () => {
    // Re-enable scroll
    document.body.style.overflow = '';
    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col px-4 h-full items-center">
        {/* Category Header */}
        <div className="flex items-center justify-center gap-2 mb-3 px-1 w-full max-w-xs">
          <IonIcon 
            icon={category === 'today' ? calendarOutline : calendarClearOutline}
            style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}
          />
          <span className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {category}
          </span>
          <span className="text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center px-1.5" style={{ color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-card-bg)' }}>
            {tasks.length}
          </span>
        </div>
        
        {/* Task Container Card */}
        <div className="task-scroll rounded-4xl flex flex-col flex-1 p-4 gap-2 w-full max-w-md" style={{ backgroundColor: 'var(--color-card-bg)', boxShadow: '0 1px 3px var(--color-shadow)' }}>
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={onToggleTask} 
                onSwapCategory={onSwapCategory}
                onDelete={onDeleteTask}
                isDragging={task.id === activeId}
              />
            ))}
          </SortableContext>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeTask ? (
          <div 
            className="flex items-center gap-3 px-4 py-4 rounded-2xl task-item"
            style={{ 
              backgroundColor: 'var(--color-task-bg)',
              boxShadow: `0 8px 24px var(--color-shadow-drag)`,
              transform: 'scale(1.05)',
              opacity: 0.95
            }}
          >
            <div 
              className="task-checkbox"
              style={{
                backgroundColor: activeTask.completed ? 'var(--color-text-primary)' : 'transparent',
                borderColor: activeTask.completed ? 'var(--color-text-primary)' : 'var(--color-checkbox)'
              }}
            >
              {activeTask.completed && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ margin: 'auto' }}>
                  <path d="M2 7L6 11L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span 
              className="flex-1 text-base font-medium" 
              style={{ 
                color: 'var(--color-text-primary)',
                textDecoration: activeTask.completed ? 'line-through' : 'none',
                opacity: activeTask.completed ? 0.5 : 1
              }}
            >
              {activeTask.title}
            </span>
            <div style={{ pointerEvents: 'none' }}>
              <IonIcon 
                icon={activeTask.category === 'today' ? arrowDownOutline : arrowUpOutline}
                style={{ fontSize: '18px', color: 'var(--color-icon-gray)', opacity: 0.6 }}
              />
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskGroup;