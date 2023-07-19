import React, { Dispatch, SetStateAction, useState, useContext } from 'react';
import { config, animated, useTrail, useSpring } from 'react-spring';
import { ReducedMotionContext } from '../App';

import '../stylesheets/loading.css';

interface LoadingProps {
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

const Loading: React.FC<LoadingProps> = ({ setIsLoaded }) => {
  const reducedMotion = useContext(ReducedMotionContext);

  const [toFade, setToFade] = useState<boolean>(false);

  let loadingFrom, loadingTo;
  if (toFade && reducedMotion) {
    loadingFrom = { opacity: 1 };
    loadingTo = { opacity: 0 };
  } else if (reducedMotion) {
    // loadingFrom = { opacity: 1 };  // NOTE this messed something up idk why
    // loadingTo = { opacity: 0 };
    loadingFrom = { scaleY: 1 }; // TODO don't love that it JUST sits there...
    loadingTo = { scaleY: 1 };
  } else if (toFade) {
    loadingFrom = { scaleY: 1 };
    loadingTo = { scaleY: 0 };
  } else {
    loadingFrom = { scaleY: 1 };
    loadingTo = { scaleY: 8 };
  }
  const loadingSprings = useTrail(4, {
    from: loadingFrom,
    to: loadingTo,
    config: config.wobbly,
    loop: toFade ? false : { reverse: true },
    immediate: reducedMotion,
    delay: reducedMotion ? 1000 : 0,
  });

  // NOTE this is simulated - we aren't waiting on any data etc.
  setTimeout(() => {
    console.log('time to fade');
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
