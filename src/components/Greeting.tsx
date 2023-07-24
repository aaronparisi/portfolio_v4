import React, { useState, useEffect, useContext } from 'react';
import { LoadingScreenContext } from '../contexts/contexts';

import '../stylesheets/greeting.css';

import SelfTaught from './SelfTaught';
import DeepThought from './DeepThought';
import Namecard from './GreetingNamecard';
import GreetingFooter from './GreetingFooter';

interface GreetingProps {}

const Greeting: React.FC<GreetingProps> = () => {
  // loading
  const { onLoadBegin, onLoadComplete, hasHadInitialLoad } =
    useContext(LoadingScreenContext);
  useEffect(() => {
    // NOTE: the condition to decide whether or not to render
    //       a loading screen could be anything; this is contrived
    if (hasHadInitialLoad) return;

    onLoadBegin();
    setTimeout(() => {
      // NOTE this is a fake delay; irl we would be waiting for some data
      onLoadComplete();
    }, 2000);
  });

  // TODO this feels hacky
  const [renderDeepThought, setRenderDeepThought] = useState<boolean>(false);
  const onSelfTaughtComplete = () => {
    setRenderDeepThought(true);
  };

  return (
    <section className="greeting">
      <SelfTaught onComplete={onSelfTaughtComplete} />
      {renderDeepThought ? <DeepThought /> : ''}
      <Namecard />
      <GreetingFooter />
    </section>
  );
};

export default Greeting;
