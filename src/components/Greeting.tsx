import React from 'react';

interface GreetingProps {
  darkMode: boolean;
}

const Greeting: React.FC<GreetingProps> = ({ darkMode }) => {
  return (
    <section>
      <div
        className={`
          self-taught
        `}
      >
        Self-taught.
      </div>
    </section>
  );
};

export default Greeting;
