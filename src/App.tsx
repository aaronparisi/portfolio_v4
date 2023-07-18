import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

import './stylesheets/reset.css';
import './stylesheets/App.css';
import DarkModeToggle from './components/DarkModeToggle';
import Home from './components/Home';

const getInitialDarkMode = () => {
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
};

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);
  const toggleDarkMode = () => {
    Cookies.set('ap_dark_mode', JSON.stringify(!darkMode));
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.remove('dark-mode');
    if (darkMode) document.documentElement.classList.add('dark-mode');
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
      <Router>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
