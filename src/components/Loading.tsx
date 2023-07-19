import React, { Dispatch, SetStateAction, useState } from 'react';
import { config, animated, useTrail, useSpring } from 'react-spring';

import '../stylesheets/loading.css';

interface LoadingProps {
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

const Loading: React.FC<LoadingProps> = ({ setIsLoaded }) => {
  const [toFade, setToFade] = useState<boolean>(false);

  // TODO this "works" but only the first bar loops... figure out what's going on
  const loadingSprings = useTrail(4, {
    from: { scaleY: 1 },
    to: toFade ? { scaleY: 0 } : { scaleY: 8 },
    config: config.wobbly,
    loop: toFade ? false : { reverse: true },
    reset: true,
  });

  // NOTE this is simulated - we aren't waiting on any data etc.
  setTimeout(() => {
    setToFade(true);
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, 3500);

  return (
    <div className="loading">
      <div
        className={`loading-bar-container ${
          toFade ? 'loading-bar-container-fade' : ''
        }`}
      >
        {loadingSprings.map((spring, idx) => (
          <animated.div
            className="loading-bar"
            key={idx}
            style={spring}
          ></animated.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
