import React, { useState, useEffect } from 'react';

import '../stylesheets/greeting.css';

import SelfTaught from './SelfTaught';
import DeepThought from './DeepThought';
import Namecard from './GreetingNamecard';

interface GreetingProps {}

const Greeting: React.FC<GreetingProps> = () => {
  // TODO this feels hacky
  const [renderDeepThought, setRenderDeepThought] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setRenderDeepThought(true);
    }, 1800);
  }, []);

  return (
    <section className="greeting">
      <section className="greeting-taglines">
        <SelfTaught />
        {renderDeepThought ? <DeepThought /> : ''}
      </section>
      <Namecard />
    </section>
  );
};

export default Greeting;
