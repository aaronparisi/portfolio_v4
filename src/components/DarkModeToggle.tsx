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
        absolute
        top-0
        right-0
        m-4
        py-2
        px-4
        bg-transparent
        text-blue-700
        font-semibold
        border
        ${darkMode ? 'border-dark-fgPrimary' : 'border-light-fgPrimary'}
        rounded
        hover:border-transparent
        hover:text-white
        hover:bg-blue-500
      `}
    >
      {darkMode ? 'Dark' : 'Light'}
    </button>
  );
};

export default DarkModeToggle;
