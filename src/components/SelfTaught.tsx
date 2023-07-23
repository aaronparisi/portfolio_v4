import React, { useContext, useEffect } from 'react';
import {
  useTransition,
  animated,
  config,
  useSpringRef,
  useSpring,
  useChain,
} from 'react-spring';
import { ReducedMotionContext } from '../contexts/contexts';

interface SelfTaughtProps {
  onComplete: () => void;
}

const SelfTaught: React.FC<SelfTaughtProps> = ({ onComplete }) => {
  const reducedMotion = useContext(ReducedMotionContext);

  const entranceRef = useSpringRef();
  const entranceSpring = useTransition(['Self-taught'], {
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
    immediate: reducedMotion,
  });

  const swipeRef = useSpringRef();
  const [swipeSpring, _] = useSpring(() => {
    return {
      from: { backgroundPosition: '0 0' },
      to: { backgroundPosition: reducedMotion ? '0 0' : '115% 0' },
      config: { duration: 2000 },
      delay: 500, // TODO I thought useChain was supposed to take care of delay
      loop: true,
    };
  }, [reducedMotion]);

  useChain([entranceRef, swipeRef]);

  // TODO this is hacky.  See if I can key in on "the first onRest" of swipeSpring
  useEffect(() => {
    setTimeout(() => {
      onComplete();
    }, 1000);
  }, []);

  return entranceSpring((style, item) => (
    <animated.div style={style} className="self-taught">
      {<animated.h2 style={swipeSpring}>{item}</animated.h2>}
    </animated.div>
  ));
};

export default SelfTaught;
