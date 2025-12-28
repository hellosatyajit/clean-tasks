import React, { useState, useEffect } from 'react';
import { downloadOutline, closeOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed/running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;

    if (isStandalone || isIOSStandalone) {
      setIsVisible(false);
      return;
    }

    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show banner after a delay if prompt is available
    const timer = setTimeout(() => {
      if (deferredPrompt) {
        setIsVisible(true);
      }
    }, 3000); // Show after 3 seconds

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Don't show if already installed, dismissed, or no prompt available
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = (window.navigator as any).standalone === true;

  if (!isVisible || isDismissed || !deferredPrompt || isStandalone || isIOSStandalone) {
    return null;
  }

  return (
    <div className="mx-4 mt-4 z-30">
      <div
        className="flex items-center justify-between px-4 py-3 rounded-3xl shadoww-lg"
        style={{
          backgroundColor: 'var(--color-card-bg)',
          boxShadow: `0 4px 16px var(--color-shadow-strong)`
        }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ backgroundColor: 'var(--color-input-bg)' }}
          >
            <IonIcon
              icon={downloadOutline}
              style={{ fontSize: '20px', color: 'var(--color-text-primary)' }}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Install App
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Add to home screen for quick access
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 rounded-xl font-semibold text-sm"
            style={{
              backgroundColor: 'var(--color-text-primary)',
              color: 'var(--color-card-bg)'
            }}
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 flex items-center justify-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <IonIcon
              icon={closeOutline}
              style={{ fontSize: '20px' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;

