import React, { useState, useContext, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { ReducedMotionContext } from '../contexts/contexts';

interface NamecardProps {}

const Namecard: React.FC<NamecardProps> = () => {
  const reducedMotion = useContext(ReducedMotionContext);

  const [revealing, setRevealing] = useState<boolean>(false);
  const [concealing, setConcealing] = useState<boolean>(false);
  const [teasing, setTeasing] = useState<boolean>(false);
  const [hiding, setHiding] = useState<boolean>(false);

  let headerFrom: string, headerTo: string;
  let headerImmediate = reducedMotion;
  if (revealing) {
    headerFrom = 'translate(0%, 0%)';
    headerTo = 'translate(0%, -115%)';
  } else if (concealing) {
    headerFrom = 'translate(0%, -115%)';
    headerTo = 'translate(0%, 0%)';
  } else if (teasing) {
    headerFrom = 'translate(0%, 0%)';
    headerTo = 'translate(0%, -115%)';
  } else if (hiding) {
    headerFrom = 'translate(0%, -115%)';
    headerTo = 'translate(0%, 0%)';
  } else {
    headerFrom = 'translate(0%, 0%)';
    headerTo = 'translate(0%, 0%)';
  }
  const subtitleSpring = useSpring({
    from: {
      transform: headerFrom,
    },
    to: {
      transform: headerTo,
    },
    immediate: headerImmediate,
    config: { mass: 1, friction: 15, tension: 170 },
  });

  const [titleRevealSpring, _] = useSpring(() => {
    return {
      from: { transform: 'translateY(150%)' },
      to: { transform: 'translateY(0%)' },
      delay: 2000,
      config: { mass: 1, friction: 15, tension: 170 },
      immediate: reducedMotion,
    };
  }, [reducedMotion]);

  const handleSubtitleMouseEnter = () => {
    setRevealing(true);
    setConcealing(false);
  };
  const handleSubtitleMouseLeave = () => {
    setRevealing(false);
    setConcealing(true);
  };

  // TODO this feels soooo hacky
  // perhaps I can do this w conditional delays on spring
  useEffect(() => {
    setTimeout(() => {
      setTeasing(true);
      setTimeout(() => {
        setTeasing(false);
        setHiding(true);
      }, 900);
    }, 2800);
  }, []);

  return (
    <animated.section style={titleRevealSpring} className="greeting-namecard">
      <h1>Aaron Parisi</h1>
      <div
        className="subtitles"
        onMouseEnter={handleSubtitleMouseEnter}
        onMouseLeave={handleSubtitleMouseLeave}
      >
        <animated.h2 style={subtitleSpring}>Web Developer </animated.h2>
        <animated.h2 style={subtitleSpring} className="pronouns">
          he / she / they
        </animated.h2>
      </div>
    </animated.section>
  );
};

export default Namecard;
