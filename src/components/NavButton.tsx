import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { animated, useSpring, config } from 'react-spring';
import { ReducedMotionContext } from '../contexts/contexts';

interface NavButtonProps {
  href: string;
  content: string;
  newTab: boolean;
  from: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  content,
  newTab,
  from,
}) => {
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
    <animated.div
      className="button nav-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={hoverSpring}
    >
      <Link to={href} state={{ from: from }}>
        {content}
      </Link>
    </animated.div>
  );
};

export default NavButton;
