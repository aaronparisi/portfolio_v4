import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

import '../stylesheets/greeting.css';

interface GreetingProps {
  darkMode: boolean;
}

const Greeting: React.FC<GreetingProps> = ({ darkMode }) => {
  const [charIdx, setCharIdx] = useState<number>(-1);
  const [thoughtIdx, setThoughtIdx] = useState<number>(0);
  const [typing, setTyping] = useState<boolean>(true);
  const [isSubtitleHovered, setIsSubtitleHovered] = useState<boolean>(false);

  // subtitle transition stuff
  const springProps = useSpring({
    transform: isSubtitleHovered ? 'translate(0%, -115%)' : 'translate(0%, 0%)',
    config: { mass: 1, friction: 15, tension: 170 },
  });
  const handleSubtitleMouseEnter = () => {
    setIsSubtitleHovered(true);
  };
  const handleSubtitleMouseLeave = () => {
    setIsSubtitleHovered(false);
  };

  // typeing aniation stuff
  const thoughts: string[] = [
    'Deep in thought.',
    'Often distraught.',
    'Works a lot.',
  ];
  const deleteChar = () => {
    if (charIdx <= -1) {
      setThoughtIdx((prev) => (prev + 1) % thoughts.length);
      setTyping(true);
    } else {
      setCharIdx((prev) => prev - 1);
    }
  };
  const typeChar = () => {
    if (charIdx >= thoughts[thoughtIdx].length) {
      setTimeout(() => {
        setTyping(false);
      }, 2000);
    } else {
      setCharIdx((prev) => prev + 1);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (typing) {
        typeChar();
      } else {
        deleteChar();
      }
    }, Math.floor(Math.random() * 100) + 20);
  }, [typing, charIdx]);

  return (
    <section className="greeting">
      <section className="greeting-taglines">
        <div
          className={`
          self-taught
        `}
        >
          Self-taught.
        </div>
        <div
          className={`
          deep-thought
        `}
        >
          {thoughts[thoughtIdx].slice(0, charIdx + 1)}_
        </div>
      </section>
      <section className="greeting-namecard">
        <h1>Aaron Parisi</h1>
        <div
          className="subtitles"
          onMouseEnter={handleSubtitleMouseEnter}
          onMouseLeave={handleSubtitleMouseLeave}
        >
          <animated.h2 style={springProps}>Web Developer </animated.h2>
          <animated.h2 style={springProps} className="pronouns">
            he / she / they
          </animated.h2>
        </div>
      </section>
    </section>
  );
};

export default Greeting;
