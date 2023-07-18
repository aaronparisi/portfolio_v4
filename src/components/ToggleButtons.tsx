import React from 'react';
import '../stylesheets/toggleButtons.css';

import ReducedMotionToggle from './ReducedMotionToggle';
import DarkModeToggle from './DarkModeToggle';
import { useSpring, animated } from 'react-spring';

interface ToggleButtonsProps {
  toggleReducedMotion: () => void;
  reducedMotion: boolean;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  toggleReducedMotion,
  reducedMotion,
  toggleDarkMode,
  darkMode,
}) => {
  const appearProps = useSpring({
    from: { transform: 'translateY(-90%)' },
    to: { transform: 'translateY(0%)' },
    delay: 6000,
  });

  return (
    <animated.section className="toggle-buttons" style={appearProps}>
      <ReducedMotionToggle
        toggleReducedMotion={toggleReducedMotion}
        reducedMotion={reducedMotion}
      />
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </animated.section>
  );
};

export default ToggleButtons;
