import React, { useState } from 'react';

import Greeting from './Greeting';
import Loading from './Loading';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // return isLoaded ? <Greeting /> : <Loading setIsLoaded={setIsLoaded} />;
  return (
    <section className="home">
      {isLoaded ? <Greeting /> : <Loading setIsLoaded={setIsLoaded} />}
    </section>
  );
};

export default Home;
