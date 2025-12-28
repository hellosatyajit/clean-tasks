import React, { useState, useEffect } from 'react';

/* Theme variables */
import './theme/variables.css';

/* Global CSS with Tailwind */
import './global.css';

/* Pages */
import TaskListPage from './pages/TaskListPage';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      // Check if device is mobile based on screen width and touch capability
      const isMobileDevice = window.innerWidth <= 425 ||
        ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundColor: 'var(--color-page-bg)',
          padding: '2rem'
        }}
      >
        <div
          className="text-center max-w-md"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Hey there! 👋
          </h1>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Clean Tasks is designed for mobile devices.
            Scan the QR code below with your phone instead of typing the URL manually!
          </p>

          {/* QR Code */}
          <div className="inline-block overflow-clip rounded-2xl mb-4"          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="200"
              height="200"
              viewBox="0 0 2000 2000"
              style={{ display: 'block' }}
            >
              <rect x="0" y="0" width="2000" height="2000" fill="#1C1C1E"></rect>
              <rect x="840" y="200" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="200" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="264" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="264" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="264" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="264" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="264" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="264" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="264" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="328" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="328" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="328" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="392" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="392" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="392" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="392" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="392" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="456" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="456" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="456" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="456" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="456" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="456" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="456" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="520" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="520" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="520" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="520" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="584" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="584" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="584" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="584" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="584" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="648" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="648" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="648" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="648" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="648" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="200" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="264" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="392" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="584" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="648" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1608" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="712" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="456" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="520" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="648" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="776" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="200" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="328" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="392" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="456" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="520" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="584" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1288" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1544" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1608" y="840" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="520" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="648" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="904" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="200" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="264" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="328" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="392" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="520" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="584" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1608" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="968" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="328" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="648" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1608" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="1032" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="200" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="392" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="584" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1544" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="1096" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="264" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="392" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="520" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="648" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1288" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="1160" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="200" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="264" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="328" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="456" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="520" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="584" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="648" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1288" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="1224" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1288" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="1288" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="1288" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1288" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1288" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1544" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="1352" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1544" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1608" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="1416" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1288" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1608" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="1480" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1096" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1544" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="840" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1352" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1416" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1544" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1608" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="1608" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="776" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="904" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1032" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1288" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1544" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="1672" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="712" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="968" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1160" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1224" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1480" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1544" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1672" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <rect x="1736" y="1736" width="64" height="64" fill="#EBEBF5"></rect>
              <svg version="1.1" id="Ebene_1" x="200" y="200" width="448" height="448" viewBox="0 0 699.988 699.986" enableBackground="new 0 0 699.988 699.986" xmlSpace="preserve" shapeRendering="auto">
                <path fill="#EBEBF5" d="M600.99,0h-100h-99.997h-0.001h-99.997h-99.998h-99.998H1v99.998v99.998v99.998v99.999v99.997v99.998v99.998  h99.999h99.998h99.998h99.997h0.001h99.997h100h99.998v-99.998V499.99v-99.997v-99.999v-99.998V99.998V0H600.99z M600.99,199.996  v99.998v99.999v99.997v99.998h-100h-99.997h-0.001h-99.997h-99.998h-99.998V499.99v-99.997v-99.999v-99.998V99.998h99.998h99.998  h99.997h0.001h99.997h100V199.996z"></path>
              </svg>
              <svg version="1.0" id="Ebene_1" x="200" y="200" width="448" height="448" viewBox="0 0 699.988 699.988" enableBackground="new 0 0 699.988 699.988" xmlSpace="preserve" shapeRendering="auto">
                <polygon fill="#EBEBF5" points="399.994,199.997 399.992,199.997 299.996,199.997 199.998,199.997 199.998,299.994 199.998,399.994   199.998,499.991 299.996,499.991 399.992,499.991 399.994,499.991 499.99,499.991 499.99,399.994 499.99,299.994 499.99,199.997 "></polygon>
              </svg>
              <svg version="1.1" id="Ebene_1" x="1352" y="200" width="448" height="448" viewBox="0 0 699.988 699.986" enableBackground="new 0 0 699.988 699.986" xmlSpace="preserve" shapeRendering="auto">
                <path fill="#EBEBF5" d="M600.99,0h-100h-99.997h-0.001h-99.997h-99.998h-99.998H1v99.998v99.998v99.998v99.999v99.997v99.998v99.998  h99.999h99.998h99.998h99.997h0.001h99.997h100h99.998v-99.998V499.99v-99.997v-99.999v-99.998V99.998V0H600.99z M600.99,199.996  v99.998v99.999v99.997v99.998h-100h-99.997h-0.001h-99.997h-99.998h-99.998V499.99v-99.997v-99.999v-99.998V99.998h99.998h99.998  h99.997h0.001h99.997h100V199.996z"></path>
              </svg>
              <svg version="1.0" id="Ebene_1" x="1352" y="200" width="448" height="448" viewBox="0 0 699.988 699.988" enableBackground="new 0 0 699.988 699.988" xmlSpace="preserve" shapeRendering="auto">
                <polygon fill="#EBEBF5" points="399.994,199.997 399.992,199.997 299.996,199.997 199.998,199.997 199.998,299.994 199.998,399.994   199.998,499.991 299.996,499.991 399.992,499.991 399.994,499.991 499.99,499.991 499.99,399.994 499.99,299.994 499.99,199.997 "></polygon>
              </svg>
              <svg version="1.1" id="Ebene_1" x="200" y="1352" width="448" height="448" viewBox="0 0 699.988 699.986" enableBackground="new 0 0 699.988 699.986" xmlSpace="preserve" shapeRendering="auto">
                <path fill="#EBEBF5" d="M600.99,0h-100h-99.997h-0.001h-99.997h-99.998h-99.998H1v99.998v99.998v99.998v99.999v99.997v99.998v99.998  h99.999h99.998h99.998h99.997h0.001h99.997h100h99.998v-99.998V499.99v-99.997v-99.999v-99.998V99.998V0H600.99z M600.99,199.996  v99.998v99.999v99.997v99.998h-100h-99.997h-0.001h-99.997h-99.998h-99.998V499.99v-99.997v-99.999v-99.998V99.998h99.998h99.998  h99.997h0.001h99.997h100V199.996z"></path>
              </svg>
              <svg version="1.0" id="Ebene_1" x="200" y="1352" width="448" height="448" viewBox="0 0 699.988 699.988" enableBackground="new 0 0 699.988 699.988" xmlSpace="preserve" shapeRendering="auto">
                <polygon fill="#EBEBF5" points="399.994,199.997 399.992,199.997 299.996,199.997 199.998,199.997 199.998,299.994 199.998,399.994   199.998,499.991 299.996,499.991 399.992,499.991 399.994,499.991 499.99,499.991 499.99,399.994 499.99,299.994 499.99,199.997 "></polygon>
              </svg>
            </svg>
          </div>

          <p
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Much easier than typing, right? :)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <TaskListPage />
    </div>
  );
};

export default App;
