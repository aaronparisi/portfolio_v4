import React from 'react';
import { animated, useSpring } from 'react-spring';
import '../stylesheets/reducedMotion.css';

interface ReducedMotionToggleProps {
  toggleReducedMotion: () => void;
  reducedMotion: boolean;
}

const ReducedMotionToggle: React.FC<ReducedMotionToggleProps> = ({
  toggleReducedMotion,
  reducedMotion,
}) => {
  const springProps = useSpring({
    transform: reducedMotion ? 'translateX(-30%)' : 'translateX(0%)',
  });

  return (
    <section className="toggle-switch-container">
      <div className="toggle-switch" onClick={toggleReducedMotion}>
        <animated.div className="toggle-switch-track" style={springProps}>
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
    </section>
  );
};

export default ReducedMotionToggle;
