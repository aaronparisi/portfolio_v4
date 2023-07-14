import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import './App.css';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedDarkMode: string | undefined = Cookies.get('ap_dark_mode');

    if (storedDarkMode !== undefined) {
      return JSON.parse(storedDarkMode);
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return true;
    } else {
      return false;
    }
  });

  const toggleDarkMode = () => {
    Cookies.set('ap_dark_mode', JSON.stringify(!darkMode));
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    console.log('inside useEffect');
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      if (!Cookies.get('ap_dark_mode')) setDarkMode(e.matches);
    };

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', handleChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="App">
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h1>Hello from app</h1>
    </div>
  );
}

export default App;
