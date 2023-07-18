import React, { Dispatch, SetStateAction } from 'react';

import '../stylesheets/loading.css';

interface LoadingProps {
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

const Loading: React.FC<LoadingProps> = ({ setIsLoaded }) => {
  setTimeout(() => {
    setIsLoaded(true);
  }, 500); // TODO implement animation, timing

  return <div className="loading">Loading...</div>;
};

export default Loading;
