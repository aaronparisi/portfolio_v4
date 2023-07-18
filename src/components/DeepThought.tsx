import React, { useState, useEffect } from 'react';

interface DeepThoughtProps {}

const DeepThought: React.FC<DeepThoughtProps> = () => {
  const [charIdx, setCharIdx] = useState<number>(-1);
  const [thoughtIdx, setThoughtIdx] = useState<number>(0);
  const [typing, setTyping] = useState<boolean>(true);

  const [blinking, setBlinking] = useState<boolean>(false);

  // typeing aniation stuff
  const thoughts: string[] = [
    'Deep in thought.',
    'Often distraught.',
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
      setTimeout(() => {
        setTyping(false);
      }, 4000);
    } else if (charIdx === -1) {
      // wait a sec
      setTimeout(() => {
        setCharIdx((prev) => prev + 1);
      }, 100);
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
    }, Math.floor(Math.random() * 50) + 20);
  }, [typing, charIdx]);

  useEffect(() => {
    const blink = setInterval(() => {
      setBlinking((prev) => !prev);
    }, 700);

    return () => clearInterval(blink);
  }, []);

  return (
    <div
      className={`
          deep-thought
        `}
    >
      {thoughts[thoughtIdx].slice(0, charIdx + 1)}
      <span
        className={`blinking-cursor ${
          blinking ? 'blinking-cursor-blinking' : ''
        }`}
      ></span>
    </div>
  );
};

export default DeepThought;
