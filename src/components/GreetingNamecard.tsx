import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface NamecardProps {}

const Namecard: React.FC<NamecardProps> = () => {
  const [revealing, setRevealing] = useState<boolean>(false);
  const [concealing, setConcealing] = useState<boolean>(false);
  const [teasing, setTeasing] = useState<boolean>(false);
  const [hiding, setHiding] = useState<boolean>(false);

  let headerFrom: string, headerTo: string;
  if (revealing) {
    headerFrom = 'translate(0%, 0%)';
    headerTo = 'translate(0%, -115%)';
  } else if (concealing) {
    headerFrom = 'translate(0%, -115%)';
    headerTo = 'translate(0%, 0%)';
  } else if (teasing) {
    headerFrom = 'translate(0%, 0%)';
    headerTo = 'translate(0%, 10%)';
  } else if (hiding) {
    headerFrom = 'translate(0%, 10%)';
    headerTo = 'translate(0%, 0%)';
  } else {
    headerFrom = 'translate(0%, 0%)';
    headerTo = 'translate(0%, 0%)';
  }
  const headerProps = useSpring({
    from: {
      transform: headerFrom,
    },
    to: {
      transform: headerTo,
    },
    config: { mass: 1, friction: 15, tension: 170 },
  });

  const revealProps = useSpring({
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0%)' },
    delay: 3000,
    config: { mass: 1, friction: 15, tension: 170 },
  });

  const handleSubtitleMouseEnter = () => {
    setRevealing(true);
    setConcealing(false);
  };
  const handleSubtitleMouseLeave = () => {
    setRevealing(false);
    setConcealing(true);
  };

  // TODO this feels soooo hacky
  useEffect(() => {
    setTimeout(() => {
      setTeasing(true);
      setTimeout(() => {
        setTeasing(false);
        setHiding(true);
      }, 300);
    }, 3500);
  }, []);

  return (
    <animated.section style={revealProps} className="greeting-namecard">
      <h1>Aaron Parisi</h1>
      <div
        className="subtitles"
        onMouseEnter={handleSubtitleMouseEnter}
        onMouseLeave={handleSubtitleMouseLeave}
      >
        <animated.h2 style={headerProps}>Web Developer </animated.h2>
        <animated.h2 style={headerProps} className="pronouns">
          he / she / they
        </animated.h2>
      </div>
    </animated.section>
  );
};

export default Namecard;
