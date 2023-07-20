import React, { useState, useEffect } from 'react';

import '../stylesheets/greeting.css';

import SelfTaught from './SelfTaught';
import DeepThought from './DeepThought';
import Namecard from './GreetingNamecard';
import GreetingFooter from './GreetingFooter';

interface GreetingProps {}

const Greeting: React.FC<GreetingProps> = () => {
  // TODO this feels hacky
  const [renderDeepThought, setRenderDeepThought] = useState<boolean>(false);

  // TODO hacky?
  useEffect(() => {
    setTimeout(() => {
      setRenderDeepThought(true);
    }, 1800);
  }, []);

  return (
    <section className="greeting">
      <SelfTaught />
      {renderDeepThought ? <DeepThought /> : ''}

      <Namecard />
      <GreetingFooter />
    </section>
  );
};

export default Greeting;
