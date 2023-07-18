import React, { Dispatch, SetStateAction, useState } from 'react';

import '../stylesheets/loading.css';

interface LoadingProps {
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

const Loading: React.FC<LoadingProps> = ({ setIsLoaded }) => {
  const [toFade, setToFade] = useState<boolean>(false);

  // TODO also feels hacky... do all this w spring?
  setTimeout(() => {
    setToFade(true);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, 2500);

  return (
    <div className="loading">
      <div
        className={`loading-bar-container ${
          toFade ? 'loading-bar-container-fade' : ''
        }`}
      >
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default Loading;
