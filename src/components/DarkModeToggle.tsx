import React from 'react';

interface DarkModeToggleProps {
  darkMode: Boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`
        bg-transparent
        hover:bg-blue-500
        text-blue-700
        font-semibold
        hover:text-white
        py-2
        px-4
        border
        border-blue-500
        hover:border-transparent
        rounded
      `}
    >
      {darkMode ? 'O' : 'X'}
    </button>
  );
};

export default DarkModeToggle;
