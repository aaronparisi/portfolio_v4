import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

import './stylesheets/reset.css';
import './stylesheets/App.css';
import Home from './components/Home';
import ToggleButtons from './components/ToggleButtons';
import Loading from './components/Loading';

const getInitialThemePreference = () => {
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
const getInitialMotionPreference = () => {
  const storedMotion: string | undefined = Cookies.get('ap_reduced_motion');

  if (storedMotion !== undefined) {
    return JSON.parse(storedMotion);
  } else if (
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return true;
  } else {
    return false;
  }
};

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialThemePreference);
  const [reducedMotion, setReducedMotion] = useState<boolean>(
    getInitialMotionPreference
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // motion helpers
  const toggleReducedMotion = () => {
    Cookies.set('ap_reduced_motion', JSON.stringify(!reducedMotion));
    setReducedMotion((prev) => !prev);
  };
  useEffect(() => {
    document.documentElement.classList.remove('reduced-motion');
    if (reducedMotion) document.documentElement.classList.add('reduced-motion');
  }, [reducedMotion]);
  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      if (!Cookies.get('ap_reduced_motion')) setReducedMotion(e.matches);
    };

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    reducedMotionQuery.addEventListener('change', handleChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // dark mode helpers
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
      {isLoaded ? (
        <Router>
          <ToggleButtons
            toggleReducedMotion={toggleReducedMotion}
            reducedMotion={reducedMotion}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      ) : (
        <Loading setIsLoaded={setIsLoaded} />
      )}
    </div>
  );
}

export default App;
