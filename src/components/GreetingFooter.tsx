import React from 'react';
import { useSpring, animated } from 'react-spring';

interface GreetingFooterProps {}

const GreetingFooter: React.FC<GreetingFooterProps> = () => {
  const fadeSpring = useSpring({
    from: {
      transform: 'translateY(350%)',
    },
    to: {
      transform: 'translateY(0%)',
    },
    delay: 6000,
  });
  return (
    <animated.section style={fadeSpring} className="greeting-footer">
      <a
        href="https://www.linkedin.com/in/aaron-parisi"
        target="_blank"
        rel="noreferrer"
        className="button nav-button"
      >
        Connect!
      </a>
    </animated.section>
  );
};

export default GreetingFooter;
