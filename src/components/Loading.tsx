import React, { Dispatch, SetStateAction } from 'react';

import '../stylesheets/loading.css';

interface LoadingProps {
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

const Loading: React.FC<LoadingProps> = ({ setIsLoaded }) => {
  setTimeout(() => {
    setIsLoaded(true);
  }, 2500); // TODO implement animation, timing

  return (
    <div className="loading">
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default Loading;
