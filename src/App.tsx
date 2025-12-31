import React from 'react';

/* Theme variables */
import './theme/variables.css';

/* Global CSS with Tailwind */
import './global.css';

/* Pages */
import TaskListPage from './pages/TaskListPage';
import DesktopLayout from './components/DesktopLayout';

const App: React.FC = () => {
  return (
    <DesktopLayout>
      <div className="app">
        <TaskListPage />
      </div>
    </DesktopLayout>
  );
};

export default App;
