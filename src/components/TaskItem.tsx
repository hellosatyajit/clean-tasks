import { useState, useRef } from 'react';
import { Task } from '../data/mockTasks';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onSwapCategory: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  isDragging?: boolean;
}

// TEMPORARILY COMMENTED OUT - DELETE FUNCTIONALITY
// const SWIPE_THRESHOLD = 80; // Minimum swipe distance to trigger delete
// const SWIPE_VELOCITY_THRESHOLD = 0.3; // Minimum velocity for quick swipe

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onSwapCategory, onDelete, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging
  } = useSortable({ id: task.id });

  // TEMPORARILY COMMENTED OUT - DELETE FUNCTIONALITY
  // const [swipeOffset, setSwipeOffset] = useState(0);
  // const [isSwiping, setIsSwiping] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);
  // const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Combine drag transform with swipe offset
  const combinedTransform = transform ? CSS.Transform.toString(transform) : undefined;
  
  // TEMPORARILY COMMENTED OUT - DELETE FUNCTIONALITY
  // const combinedTransform = isDeleting
  //   ? 'translateX(100%)'
  //   : swipeOffset !== 0 
  //     ? `translateX(${swipeOffset}px)`
  //     : CSS.Transform.toString(transform);

  // Reset swipe when task changes
  // useEffect(() => {
  //   setSwipeOffset(0);
  //   setIsSwiping(false);
  //   setIsDeleting(false);
  // }, [task.id]);

  // const handleTouchStart = (e: React.TouchEvent) => {
  //   if (isSortableDragging) return;
  //   const touch = e.touches[0];
  //   touchStartRef.current = {
  //     x: touch.clientX,
  //     y: touch.clientY,
  //     time: Date.now()
  //   };
  //   setIsSwiping(true);
  // };

  // const handleTouchMove = (e: React.TouchEvent) => {
  //   if (!touchStartRef.current || isSortableDragging || isDeleting) return;
    
  //   const touch = e.touches[0];
  //   const deltaX = touch.clientX - touchStartRef.current.x;
  //   const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    
  //   // Only allow horizontal swipe right (prevent vertical scrolling interference)
  //   if (Math.abs(deltaX) > deltaY && deltaX > 0) {
  //     e.preventDefault();
  //     setSwipeOffset(Math.min(deltaX, SWIPE_THRESHOLD));
  //   }
  // };

  // const handleTouchEnd = () => {
  //   if (!touchStartRef.current || isSortableDragging || isDeleting) return;
    
  //   const timeDelta = Date.now() - touchStartRef.current.time;
  //   const velocity = Math.abs(swipeOffset) / timeDelta;
    
  //   // Trigger delete if swiped far enough or with enough velocity (positive for right swipe)
  //   if (swipeOffset >= SWIPE_THRESHOLD || (swipeOffset > 40 && velocity > SWIPE_VELOCITY_THRESHOLD)) {
  //     setIsDeleting(true);
      
  //     // Slide out to the right
  //     setTimeout(() => {
  //       onDelete(task.id);
  //     }, 300);
  //   } else {
  //     // Snap back
  //     setSwipeOffset(0);
  //   }
    
  //   setIsSwiping(false);
  //   touchStartRef.current = null;
  // };

  const handleSwapClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering task toggle
    onSwapCategory(task.id);
  };

  // Custom SVG icons
  const TodayIcon = () => (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M0.87594 0.0835124C0.327922 0.152029 -0.0607912 0.651829 0.00772528 1.19985C0.0762417 1.74787 0.576042 2.13658 1.12406 2.06806L1 1.07579L0.87594 0.0835124ZM7 13.5758L6.25671 14.2448C6.44635 14.4555 6.71651 14.5758 7 14.5758C7.28349 14.5758 7.55365 14.4555 7.74329 14.2448L7 13.5758ZM3.24329 7.90682C2.87384 7.49631 2.24155 7.46303 1.83104 7.83249C1.42053 8.20195 1.38725 8.83424 1.75671 9.24475L2.5 8.57579L3.24329 7.90682ZM12.2433 9.24475C12.6128 8.83424 12.5795 8.20195 12.169 7.83249C11.7585 7.46303 11.1262 7.49631 10.7567 7.90682L11.5 8.57579L12.2433 9.24475ZM1 1.07579L1.12406 2.06806C2.95357 1.83933 4.12893 2.20482 4.84149 2.82832C5.55357 3.4514 6 4.50423 6 6.07579H7H8C8 4.14734 7.44643 2.45012 6.15851 1.32318C4.87107 0.196652 3.04643 -0.187855 0.87594 0.0835124L1 1.07579ZM7 6.07579H6V13.5758H7H8V6.07579H7ZM7 13.5758C7.74329 12.9068 7.74328 12.9068 7.74326 12.9068C7.74324 12.9068 7.74321 12.9067 7.74317 12.9067C7.74309 12.9066 7.74296 12.9065 7.74279 12.9063C7.74246 12.9059 7.74196 12.9053 7.7413 12.9046C7.73997 12.9031 7.738 12.9009 7.73537 12.898C7.73013 12.8922 7.72232 12.8835 7.71206 12.8721C7.69155 12.8493 7.66123 12.8156 7.62201 12.7721C7.54359 12.6849 7.42959 12.5583 7.2873 12.4002C7.00272 12.084 6.60497 11.642 6.1523 11.1391C5.24697 10.1331 4.12197 8.88313 3.24329 7.90682L2.5 8.57579L1.75671 9.24475C2.63539 10.2211 3.76039 11.4711 4.66572 12.477C5.11838 12.9799 5.51613 13.4219 5.80071 13.7381C5.943 13.8962 6.057 14.0229 6.13543 14.11C6.17464 14.1536 6.20496 14.1873 6.22548 14.2101C6.23573 14.2214 6.24354 14.2301 6.24878 14.236C6.2514 14.2389 6.25339 14.2411 6.25471 14.2425C6.25537 14.2433 6.25587 14.2438 6.25621 14.2442C6.25637 14.2444 6.2565 14.2445 6.25658 14.2446C6.25662 14.2447 6.25665 14.2447 6.25667 14.2447C6.2567 14.2447 6.25671 14.2448 7 13.5758ZM7 13.5758L7.74329 14.2448L12.2433 9.24475L11.5 8.57579L10.7567 7.90682L6.25671 12.9068L7 13.5758Z" fill="currentColor" />
    </svg>
  );

  const SomedayIcon = () => (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M0.87594 14.4922C0.327922 14.4237 -0.0607912 13.9239 0.00772528 13.3758C0.0762417 12.8278 0.576042 12.4391 1.12406 12.5076L1 13.4999L0.87594 14.4922ZM7 0.999896L6.25671 0.330931C6.44635 0.120217 6.71651 -0.000103944 7 -0.000103951C7.28349 -0.000103957 7.55365 0.120217 7.74329 0.330931L7 0.999896ZM3.24329 6.66886C2.87384 7.07937 2.24155 7.11265 1.83104 6.74319C1.42053 6.37373 1.38725 5.74144 1.75671 5.33093L2.5 5.9999L3.24329 6.66886ZM12.2433 5.33093C12.6128 5.74144 12.5795 6.37373 12.169 6.74319C11.7585 7.11265 11.1262 7.07937 10.7567 6.66886L11.5 5.9999L12.2433 5.33093ZM1 13.4999L1.12406 12.5076C2.95357 12.7364 4.12893 12.3709 4.84149 11.7474C5.55357 11.1243 6 10.0714 6 8.4999H7L8 8.4999C8 10.4283 7.44643 12.1256 6.15851 13.2525C4.87107 14.379 3.04643 14.7635 0.87594 14.4922L1 13.4999ZM7 8.4999H6L6 0.999896H7H8L8 8.4999L7 8.4999ZM7 0.999896C7.74329 1.66886 7.74328 1.66887 7.74326 1.6689C7.74324 1.66892 7.74321 1.66895 7.74317 1.669C7.74309 1.66909 7.74296 1.66923 7.74279 1.66942C7.74246 1.66979 7.74196 1.67034 7.7413 1.67108C7.73997 1.67255 7.738 1.67475 7.73537 1.67766C7.73013 1.68349 7.72232 1.69216 7.71206 1.70356C7.69155 1.72636 7.66123 1.76005 7.62201 1.80362C7.54359 1.89076 7.42959 2.01742 7.2873 2.17552C7.00272 2.49172 6.60497 2.93367 6.1523 3.43663C5.24697 4.44255 4.12197 5.69255 3.24329 6.66886L2.5 5.9999L1.75671 5.33093C2.63539 4.35462 3.76039 3.10462 4.66572 2.0987C5.11838 1.59574 5.51613 1.1538 5.80071 0.837594C5.943 0.679493 6.057 0.552828 6.13543 0.465687C6.17464 0.422117 6.20496 0.388428 6.22548 0.365632C6.23573 0.354235 6.24354 0.345557 6.24878 0.339733C6.2514 0.336822 6.25339 0.334617 6.25471 0.333148C6.25537 0.332412 6.25587 0.331857 6.25621 0.331487C6.25637 0.331301 6.2565 0.331165 6.25658 0.331071C6.25662 0.331024 6.25665 0.330989 6.25667 0.330966C6.2567 0.330943 6.25671 0.330931 7 0.999896ZM7 0.999896L7.74329 0.330931L12.2433 5.33093L11.5 5.9999L10.7567 6.66886L6.25671 1.66886L7 0.999896Z" fill="currentColor" />
    </svg>
  );

  return (
    <div className="relative">
      {/* TEMPORARILY COMMENTED OUT - DELETE ACTION BACKGROUND */}
      {/* <div
        className="absolute inset-0 flex items-center justify-start pl-4 rounded-2xl"
        style={{
          backgroundColor: '#FF3B30',
          transform: `translateX(${swipeOffset > 0 ? '0%' : '-100%'})`,
          transition: swipeOffset === 0 && !isDeleting ? 'transform 0.2s ease-out' : 'none',
          zIndex: 0
        }}
      >
        <IonIcon 
          icon={trashOutline}
          style={{ fontSize: '20px', color: '#FFFFFF' }}
        />
      </div> */}

      {/* Task Item */}
      <div
        ref={setNodeRef}
        {...attributes}
        className="flex items-center gap-3 px-4 py-4 rounded-2xl task-item relative"
        data-task-id={task.id}
        onClick={(e) => {
          // Only toggle if not currently being dragged
          if (!isSortableDragging) {
            onToggle(task.id);
          }
        }}
        style={{
          backgroundColor: 'var(--color-task-bg)',
          transform: combinedTransform || undefined,
          transition: isSortableDragging ? transition : undefined,
          zIndex: isSortableDragging ? 10 : 1,
          opacity: isSortableDragging ? 0.5 : 1
        }}
      >
      {/* Checkbox */}
      <div
        className="task-checkbox"
        style={{
          backgroundColor: task.completed ? 'var(--color-text-primary)' : 'transparent',
          borderColor: task.completed ? 'var(--color-text-primary)' : 'var(--color-checkbox)'
        }}
      >
        {task.completed && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ margin: 'auto', color: 'var(--color-button-white)' }}>
            <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Task Title - Drag Handle Area */}
      <span
        {...listeners}
        className="flex-1 text-base font-medium"
        style={{
          color: 'var(--color-text-primary)',
          textDecoration: task.completed ? 'line-through' : 'none',
          opacity: task.completed ? 0.5 : 1,
          cursor: isSortableDragging ? 'grabbing' : 'grab',
          touchAction: 'none'   // disable browser scroll during drag start
        }}
      >
        {task.title}
      </span>

      {/* Swap Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSwapClick(e);
        }}
        className="swap-button min-w-fit"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '6px',
          transition: 'all 0.2s ease',
          width: '13px',
          height: '15px',
          color: 'var(--color-icon-gray)',
          opacity: 0.6,
          touchAction: 'manipulation'
        }}
        title={`Move to ${task.category === 'today' ? 'someday' : 'today'}`}
      >
        {task.category === 'today' ? <TodayIcon /> : <SomedayIcon />}
      </button>
      </div>
    </div>
  );
};

export default TaskItem;