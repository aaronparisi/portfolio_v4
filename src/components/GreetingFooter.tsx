import React, { useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { ReducedMotionContext } from '../App';
import NavButton from './NavButton';

interface GreetingFooterProps {}

const GreetingFooter: React.FC<GreetingFooterProps> = () => {
  const reducedMotion = useContext(ReducedMotionContext);

  const [revealSpring, _] = useSpring(() => {
    return {
      from: {
        transform: 'translateY(350%)',
      },
      to: {
        transform: 'translateY(0%)',
      },
      delay: 6000,
      immediate: reducedMotion,
    };
  }, [reducedMotion]);

  return (
    <animated.section style={revealSpring} className="greeting-footer">
      <NavButton
        href="https://www.linkedin.com/in/aaron-parisi"
        content="Contact Me"
      />
    </animated.section>
  );
};

export default GreetingFooter;
