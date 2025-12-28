import { settingsOutline, addOutline, checkmarkOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface BottomNavProps {
  onCompleteChecked: () => void;
  onAddTask: () => void;
  onSettingsClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onCompleteChecked, onAddTask, onSettingsClick }) => {
  return (
    <div className="flex items-center justify-between px-4 py-5" style={{ backgroundColor: 'var(--color-page-bg)' }}>
      {/* Settings Button */}
      <button 
        className="flex items-center justify-center" 
        style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--color-button-gray)' }}
        onClick={onSettingsClick}
      >
        <IonIcon 
          icon={settingsOutline}
          style={{ fontSize: '26px', color: 'var(--color-text-primary)' }}
        />
      </button>
      
      {/* Add Button */}
      <button 
        className="flex items-center justify-center" 
        style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--color-button-white)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
        onClick={onAddTask}
      >
        <IonIcon 
          icon={addOutline}
          style={{ fontSize: '30px', color: 'var(--color-text-primary)' }}
        />
      </button>
      
      {/* Complete Button */}
      <button 
        className="flex items-center justify-center" 
        style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--color-button-gray)' }}
        onClick={onCompleteChecked}
      >
        <IonIcon 
          icon={checkmarkOutline}
          style={{ fontSize: '28px', color: 'var(--color-text-primary)' }}
        />
      </button>
    </div>
  );
};

export default BottomNav;