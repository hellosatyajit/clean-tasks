import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../data/mockTasks';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string, category: 'today' | 'someday') => void;
}

const MAX_TASK_LENGTH = 100;
const SHOW_COUNTER_THRESHOLD = 80; // Show counter when 80% of limit is reached

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'today' | 'someday'>('today');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const characterCount = taskTitle.length;
  const remainingChars = MAX_TASK_LENGTH - characterCount;
  const showCounter = characterCount >= SHOW_COUNTER_THRESHOLD;
  const isNearLimit = remainingChars <= 10;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Auto-focus input when modal opens
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
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && taskTitle.trim()) {
        handleAdd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, taskTitle, selectedCategory, onClose]);

  const handleAdd = () => {
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim(), selectedCategory);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-overlay)' }}
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden outline-none"
        style={{
          backgroundColor: 'var(--color-card-bg)',
          boxShadow: '0 8px 32px var(--color-shadow-strong)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-6">
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
              className="w-full px-4 py-3.5 rounded-xl text-base outline-none"
              style={{
                backgroundColor: 'var(--color-input-bg)',
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
                    color: isNearLimit ? 'var(--color-error)' : 'var(--color-text-secondary)',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {remainingChars}
                </span>
              </div>
            )}
          </div>

          {/* Category Toggle - iOS Style Segmented Control */}
          <div className="mt-4 p-1 rounded-xl" style={{ backgroundColor: 'var(--color-input-bg)' }}>
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
                backgroundColor: 'var(--color-input-bg)',
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
                backgroundColor: taskTitle.trim() ? 'var(--color-text-primary)' : 'var(--color-button-gray)',
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
    </div>
  );
};

export default AddTaskModal;

