import React from 'react';
import { Drawer } from 'vaul';
import { downloadOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface SettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ 
  isOpen, 
  onClose
}) => {
  const { isInstallable, isInstalled, handleInstall, os } = usePWAInstall();


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
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              maxHeight: '90vh'
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div 
                className="w-10 h-1 rounded-full"
                style={{ backgroundColor: '#D1D1D6' }}
              />
            </div>

            <div className="px-6 py-4 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 60px)' }}>
              {/* Header */}
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                Settings
              </h2>

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
                            color: isInstalled ? '#34C759' : 'var(--color-text-primary)'
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
              <div className="pt-6 border-t" style={{ borderColor: '#E5E5EA' }}>
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SettingsSheet;

