import React, { useEffect } from 'react';
import { downloadOutline, checkmarkCircleOutline, closeOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose
}) => {
  const { isInstallable, isInstalled, handleInstall, os } = usePWAInstall();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
        className="w-full max-w-md rounded-3xl overflow-hidden outline-none max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: 'var(--color-card-bg)',
          boxShadow: '0 8px 32px var(--color-shadow-strong)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--color-input-bg)',
              color: 'var(--color-text-secondary)'
            }}
            title="Close"
          >
            <IonIcon 
              icon={closeOutline}
              style={{ fontSize: '20px' }}
            />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto flex-1">
          {/* PWA Install Section - Only show on mobile (iOS/Android) and if not already installed */}
          {(os === 'ios' || os === 'android') && !isInstalled && (
            <div className="mb-6">
              <div 
                className="px-5 py-5 rounded-2xl"
                style={{ 
                  backgroundColor: isInstalled ? 'rgba(52, 199, 89, 0.1)' : 'var(--color-task-bg)',
                  border: isInstalled ? '1px solid rgba(52, 199, 89, 0.3)' : 'none'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                    style={{ 
                      backgroundColor: isInstalled ? 'rgba(52, 199, 89, 0.15)' : 'rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <IonIcon 
                      icon={isInstalled ? checkmarkCircleOutline : downloadOutline}
                      style={{ 
                        fontSize: '24px', 
                        color: isInstalled ? 'var(--color-success)' : 'var(--color-text-primary)'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                      {isInstalled ? 'App Installed' : 'Install as App'}
                    </p>
                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                      {isInstalled 
                        ? 'This app is installed on your device. You can access it from your home screen.'
                        : 'Install this app on your device for quick access and a better experience.'}
                    </p>
                    {!isInstalled && isInstallable && (
                      <button
                        onClick={handleInstall}
                        className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
                        style={{
                          backgroundColor: 'var(--color-text-primary)',
                          color: 'var(--color-card-bg)'
                        }}
                      >
                        Install App
                      </button>
                    )}
                    {!isInstalled && !isInstallable && (
                      <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        <p className="mb-2 font-medium">To install:</p>
                        {os === 'ios' && (
                          <p><strong>iOS:</strong> Tap Share → Add to Home Screen</p>
                        )}
                        {os === 'android' && (
                          <p><strong>Android:</strong> Tap Menu → Install App</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Coming Soon Section */}
          <div className="mb-6">
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              More features coming soon...
            </p>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border-divider)' }}>
            <div className="flex justify-center">
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Built by{' '}
                <a
                  href="https://satyajit.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Satyajit
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

