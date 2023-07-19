import React from 'react';
import { useTransition, animated, config } from 'react-spring';

interface SelfTaughtProps {}

const SelfTaught: React.FC<SelfTaughtProps> = () => {
  const transitions = useTransition(['Self-taught'], {
    from: {
      fontSize: '30rem',
      transform: 'scale(20) rotate(0deg)',
      opacity: 0,
    },
    enter: {
      fontSize: '6rem',
      transform: 'scale(1) rotate(-10deg)',
      opacity: 1,
    },
    config: { ...config.wobbly, clamp: true },
  });
  // return <div className="self-taught">Self-taught.</div>;
  return transitions((style, item) => (
    <animated.h2 style={style} className="self-taught">
      {item}
    </animated.h2>
  ));
};

export default SelfTaught;
