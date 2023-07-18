import React from 'react';

import Greeting from './Greeting';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="home">
      <Greeting />
    </section>
  );
};

export default Home;
