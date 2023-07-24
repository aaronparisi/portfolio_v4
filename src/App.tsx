import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  ReducedMotionContext,
  VisitedPagesContext,
  LoadingScreenContext,
} from './contexts/contexts';
import {
  getInitialThemePreference,
  getInitialMotionPreference,
} from './utils/userPreferencesUtils';

import './stylesheets/reset.css';
import './stylesheets/App.css';

import ToggleButtons from './components/ToggleButtons';
import Greeting from './components/Greeting';
import About from './components/About';
import Loading from './components/Loading';

function App() {
  // visited pages
  const [visitedPages, setVisitedPages] = useState<Set<string>>(
    new Set<string>([])
  );
  const addVisitedPage = (page: string) => {
    setVisitedPages((prev) => new Set<string>(prev).add(page));
  };

  // motion
  const [reducedMotion, setReducedMotion] = useState<boolean>(
    getInitialMotionPreference
  );
  const toggleReducedMotion = () => {
    // respond to clicks on toggle switch
    Cookies.set('ap_reduced_motion', JSON.stringify(!reducedMotion));
    setReducedMotion((prev) => !prev);
  };
  useEffect(() => {
    // respond to chnages in reducedMotion global state
    document.documentElement.classList.remove('reduced-motion');
    if (reducedMotion) document.documentElement.classList.add('reduced-motion');
  }, [reducedMotion]);
  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      // respond to changes in user preferences
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

  // dark mode
  const [darkMode, setDarkMode] = useState<boolean>(getInitialThemePreference);
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

  // loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasHadInitialLoad, setHasHadInitialLoad] = useState<boolean>(false);
  const [toFadeLoader, setToFadeLoader] = useState<boolean>(false);
  const onLoaderFade = () => {
    setTimeout(() => {
      // TODO: this fn gets called from <Loader /> component spring's onRest
      //       but the loader is still bouncing when onRest is executed
      //       Find out if that is expected behavior
      setHasHadInitialLoad(true); // TODO happens every time...
      setIsLoading(false);
    }, 1000);
  };
  const onLoadComplete = () => setToFadeLoader(true);
  const onLoadBegin = () => {
    setIsLoading(true);
  };

  return (
    <div className="App">
      <ReducedMotionContext.Provider value={reducedMotion}>
        <VisitedPagesContext.Provider
          value={{ visitedPages: visitedPages, addVisitedPage: addVisitedPage }}
        >
          <LoadingScreenContext.Provider
            value={{
              onLoadBegin: onLoadBegin,
              onLoadComplete: onLoadComplete,
              hasHadInitialLoad: hasHadInitialLoad,
            }}
          >
            <ToggleButtons
              toggleReducedMotion={toggleReducedMotion}
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
            />
            {isLoading ? (
              <Loading toFade={toFadeLoader} onFade={onLoaderFade} />
            ) : (
              <Router>
                <Routes>
                  <Route path="/" element={<Greeting />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Router>
            )}
          </LoadingScreenContext.Provider>
        </VisitedPagesContext.Provider>
      </ReducedMotionContext.Provider>
    </div>
  );
}

export default App;
