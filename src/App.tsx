import React, { useEffect, useState } from 'react';
import './App.css';

import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });

  return (
    <div className="App">
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h1>Hello from app</h1>
    </div>
  );
}

export default App;
