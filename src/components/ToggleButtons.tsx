import React, { useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { ReducedMotionContext } from '../App';

import '../stylesheets/toggleButtons.css';

import ReducedMotionToggle from './ReducedMotionToggle';
import DarkModeToggle from './DarkModeToggle';

interface ToggleButtonsProps {
  toggleReducedMotion: () => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  toggleReducedMotion,
  toggleDarkMode,
  darkMode,
}) => {
  const reducedMotion = useContext(ReducedMotionContext);
  const [revealSpring, _] = useSpring(() => {
    return {
      from: {
        transform: 'translateY(-90%)',
      },
      to: {
        transform: 'translateY(0%)',
      },
      delay: 6000,
      immediate: reducedMotion,
    };
  }, [reducedMotion]);

  return (
    <animated.section className="toggle-buttons" style={revealSpring}>
      <ReducedMotionToggle toggleReducedMotion={toggleReducedMotion} />
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </animated.section>
  );
};

export default ToggleButtons;
