import React, { useContext, useEffect } from 'react';
import { config, animated, useTrail } from 'react-spring';
import { ReducedMotionContext } from '../contexts/contexts';

import '../stylesheets/loading.css';

interface LoadingProps {
  toFadeLoader: boolean;
  onLoaderFade: () => void;
}

const Loading: React.FC<LoadingProps> = ({ toFadeLoader, onLoaderFade }) => {
  const reducedMotion = useContext(ReducedMotionContext);

  let loadingFrom, loadingTo;
  if (toFadeLoader && reducedMotion) {
    loadingFrom = { opacity: 1 };
    loadingTo = { opacity: 0 };
  } else if (reducedMotion) {
    // loadingFrom = { opacity: 1 };  // NOTE this messed something up idk why
    // loadingTo = { opacity: 0 };
    loadingFrom = { scaleY: 1 }; // TODO don't love that it JUST sits there...
    loadingTo = { scaleY: 1 };
  } else if (toFadeLoader) {
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
    loop: toFadeLoader ? false : { reverse: true },
    immediate: reducedMotion,
    delay: reducedMotion ? 1000 : 0,
  });

  useEffect(() => {
    if (toFadeLoader) {
      console.log('fading loader now');
      setTimeout(() => {
        onLoaderFade();
      }, 2000);
    }
  }, [toFadeLoader, onLoaderFade]);

  return (
    <div className="loading">
      <div className={'loading-bar-container'}>
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
