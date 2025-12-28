import React from 'react';

/* Theme variables */
import './theme/variables.css';

/* Global CSS with Tailwind */
import './global.css';

/* Pages */
import TaskListPage from './pages/TaskListPage';

const App: React.FC = () => (
  <div className="app">
    <TaskListPage />
  </div>
);

export default App;
