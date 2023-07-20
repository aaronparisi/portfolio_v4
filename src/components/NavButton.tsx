import React, { useState, useContext } from 'react';
import { animated, useSpring, config } from 'react-spring';
import { ReducedMotionContext } from '../App';

interface NavButtonProps {
  href: string;
  content: string;
}

const NavButton: React.FC<NavButtonProps> = ({ href, content }) => {
  const reducedMotion = useContext(ReducedMotionContext);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [hoverSpring, _] = useSpring(() => {
    return {
      from: {
        transform: 'scale(1)',
      },
      to: {
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      },
      config: config.wobbly,
      immediate: reducedMotion,
    };
  }, [isHovered, reducedMotion]);

  return (
    <animated.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="button nav-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={hoverSpring}
    >
      {content}
    </animated.a>
  );
};

export default NavButton;
