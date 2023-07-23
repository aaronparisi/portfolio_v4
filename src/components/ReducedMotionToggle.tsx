import React, { useContext, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import '../stylesheets/reducedMotion.css';

import { ReducedMotionContext } from '../contexts/contexts';

interface ReducedMotionToggleProps {
  toggleReducedMotion: () => void;
}

const ReducedMotionToggle: React.FC<ReducedMotionToggleProps> = ({
  toggleReducedMotion,
}) => {
  const reducedMotion = useContext(ReducedMotionContext);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleSpring = useSpring({
    transform: reducedMotion ? 'translateX(-30%)' : 'translateX(0%)',
  });
  const [hoverSpring, _] = useSpring(() => {
    return {
      from: { transform: 'scale(1)' },
      to: { transform: isHovered ? 'scale(1.1)' : 'scale(1)' },
      config: config.wobbly,
      immediate: reducedMotion,
    };
  }, [isHovered, reducedMotion]);

  return (
    <animated.section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={hoverSpring}
      className="toggle-switch-container"
    >
      <div className="toggle-switch" onClick={toggleReducedMotion}>
        <animated.div className="toggle-switch-track" style={toggleSpring}>
          <div className="toggle-switch-handle" />
        </animated.div>
        <div className="toggle-switch-labels">
          <svg className="toggle-switch-label-icon" viewBox="0 0 24 24">
            {/* TODO: svg */}
          </svg>
          <svg className="toggle-switch-label-icon" viewBox="0 0 24 24">
            {/* TODO: svg */}
          </svg>
        </div>
      </div>
    </animated.section>
  );
};

export default ReducedMotionToggle;
