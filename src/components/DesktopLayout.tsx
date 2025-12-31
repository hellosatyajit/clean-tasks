import React from 'react';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  return (
    <div 
      className="w-full min-h-screen flex justify-center"
      style={{ backgroundColor: 'var(--color-page-bg)' }}
    >
      <div className="w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
};

export default DesktopLayout;

