import React from 'react';
import '../stylesheets/darkMode.css';

interface DarkModeToggleProps {
  darkMode: Boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {darkMode ? 'Dark' : 'Light'}
    </button>
  );
};

export default DarkModeToggle;
