import React, { useEffect, useState } from 'react';

interface GreetingProps {
  darkMode: boolean;
}

const Greeting: React.FC<GreetingProps> = ({ darkMode }) => {
  const [charIdx, setCharIdx] = useState<number>(-1);
  const [thoughtIdx, setThoughtIdx] = useState<number>(0);
  const [typing, setTyping] = useState<boolean>(true);

  const thoughts: string[] = [
    'Deep in thought.',
    'Sometimes distraught.',
    'Overwraught.',
    'Works a lot.',
  ];

  const deleteChar = () => {
    if (charIdx <= -1) {
      setThoughtIdx((prev) => (prev + 1) % thoughts.length);
      setTyping(true);
    } else {
      setCharIdx((prev) => prev - 1);
    }
  };
  const typeChar = () => {
    if (charIdx >= thoughts[thoughtIdx].length) {
      setTyping(false);
    } else {
      setCharIdx((prev) => prev + 1);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (typing) {
        typeChar();
      } else {
        deleteChar();
      }
    }, Math.floor(Math.random() * 200) + 20);
  }, [typing, charIdx]);

  return (
    <section className="greeting">
      <div
        className={`
          self-taught
        `}
      >
        Self-taught.
      </div>
      <div
        className={`
          deep-thought
        `}
      >
        {thoughts[thoughtIdx].slice(0, charIdx + 1)}_
      </div>
    </section>
  );
};

export default Greeting;
