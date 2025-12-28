import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../data/mockTasks';
import { Drawer } from 'vaul';

interface AddTaskBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string, category: 'today' | 'someday') => void;
}

const MAX_TASK_LENGTH = 100;
const SHOW_COUNTER_THRESHOLD = 80; // Show counter when 80% of limit is reached

const AddTaskBottomSheet: React.FC<AddTaskBottomSheetProps> = ({ isOpen, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'today' | 'someday'>('today');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const characterCount = taskTitle.length;
  const remainingChars = MAX_TASK_LENGTH - characterCount;
  const showCounter = characterCount >= SHOW_COUNTER_THRESHOLD;
  const isNearLimit = remainingChars <= 10;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Auto-focus input when sheet opens
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset form when closed
      setTaskTitle('');
      setSelectedCategory('today');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Enter' && taskTitle.trim()) {
        handleAdd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, taskTitle, selectedCategory]);

  const handleAdd = () => {
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim(), selectedCategory);
      onClose();
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/30" style={{ zIndex: 40 }} />
        <Drawer.Content 
          className="fixed bottom-0 left-0 right-0 outline-none"
          style={{ zIndex: 50 }}
        >
          <div 
            className="rounded-t-3xl overflow-hidden"
            style={{ 
              backgroundColor: 'var(--color-card-bg)',
              boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.15)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)'
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div 
                className="w-10 h-1 rounded-full"
                style={{ backgroundColor: '#D1D1D6' }}
              />
            </div>

            <div className="px-6 py-4 pb-8">
              {/* Header */}
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Add New Task
              </h2>

              {/* Input Field */}
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={taskTitle}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= MAX_TASK_LENGTH) {
                      setTaskTitle(value);
                    }
                  }}
                  placeholder="Task name..."
                  maxLength={MAX_TASK_LENGTH}
                  className="w-full px-4 py-3.5 rounded-2xl text-base outline-none"
                  style={{
                    backgroundColor: '#F2F2F7',
                    color: 'var(--color-text-primary)',
                    border: 'none',
                    paddingRight: showCounter ? '40px' : '16px'
                  }}
                />
                {/* Character Counter - Subtle fade in/out */}
                {showCounter && (
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                    style={{
                      opacity: showCounter ? 1 : 0,
                      pointerEvents: 'none'
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: isNearLimit ? '#FF3B30' : 'var(--color-text-secondary)',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {remainingChars}
                    </span>
                  </div>
                )}
              </div>

              {/* Category Toggle - iOS Style Segmented Control */}
              <div className="mt-4 p-1 rounded-xl" style={{ backgroundColor: '#F2F2F7' }}>
                <div className="flex gap-1 relative">
                  <button
                    onClick={() => setSelectedCategory('today')}
                    className="flex-1 py-2.5 rounded-lg font-medium transition-all relative z-10"
                    style={{
                      color: selectedCategory === 'today' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      backgroundColor: selectedCategory === 'today' ? 'var(--color-card-bg)' : 'transparent',
                      boxShadow: selectedCategory === 'today' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setSelectedCategory('someday')}
                    className="flex-1 py-2.5 rounded-lg font-medium transition-all relative z-10"
                    style={{
                      color: selectedCategory === 'someday' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      backgroundColor: selectedCategory === 'someday' ? 'var(--color-card-bg)' : 'transparent',
                      boxShadow: selectedCategory === 'someday' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    Someday
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 rounded-xl font-semibold"
                  style={{
                    backgroundColor: '#F2F2F7',
                    color: 'var(--color-text-secondary)'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={!taskTitle.trim()}
                  className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                  style={{
                    backgroundColor: taskTitle.trim() ? 'var(--color-text-primary)' : '#D1D1D6',
                    color: 'var(--color-card-bg)',
                    opacity: taskTitle.trim() ? 1 : 0.5,
                    cursor: taskTitle.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default AddTaskBottomSheet;