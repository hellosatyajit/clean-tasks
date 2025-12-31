import { settingsOutline, addOutline, checkmarkOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface DesktopActionButtonsProps {
  onCompleteChecked: () => void;
  onAddTask: () => void;
  onSettingsClick: () => void;
}

const DesktopActionButtons: React.FC<DesktopActionButtonsProps> = ({ 
  onCompleteChecked, 
  onAddTask, 
  onSettingsClick 
}) => {
  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10"
      style={{ display: 'flex' }}
    >
      {/* Add Button */}
      <button 
        className="flex items-center justify-center transition-transform hover:scale-105 cursor-pointer" 
        style={{ 
          width: '56px', 
          height: '56px', 
          borderRadius: '16px', 
          backgroundColor: 'var(--color-button-white)', 
          boxShadow: '0 2px 8px var(--color-shadow)' 
        }}
        onClick={onAddTask}
        title="Add Task"
      >
        <IonIcon 
          icon={addOutline}
          style={{ fontSize: '30px', color: 'var(--color-text-primary)' }}
        />
      </button>
      
      {/* Complete Button */}
      <button 
        className="flex items-center justify-center transition-transform hover:scale-105 cursor-pointer" 
        style={{ 
          width: '56px', 
          height: '56px', 
          borderRadius: '16px', 
          backgroundColor: 'var(--color-button-gray)' 
        }}
        onClick={onCompleteChecked}
        title="Complete Checked"
      >
        <IonIcon 
          icon={checkmarkOutline}
          style={{ fontSize: '28px', color: 'var(--color-text-primary)' }}
        />
      </button>

      {/* Settings Button */}
      <button 
        className="flex items-center justify-center transition-transform hover:scale-105 cursor-pointer" 
        style={{ 
          width: '56px', 
          height: '56px', 
          borderRadius: '16px', 
          backgroundColor: 'var(--color-button-gray)' 
        }}
        onClick={onSettingsClick}
        title="Settings"
      >
        <IonIcon 
          icon={settingsOutline}
          style={{ fontSize: '26px', color: 'var(--color-text-primary)' }}
        />
      </button>
    </div>
  );
};

export default DesktopActionButtons;

