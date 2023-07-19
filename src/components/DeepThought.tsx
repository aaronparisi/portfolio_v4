import React, { useState, useEffect, useContext } from 'react';
import { ReducedMotionContext } from '../App';

interface DeepThoughtProps {}

const DeepThought: React.FC<DeepThoughtProps> = () => {
  // reduced motion
  // const reducedMotion = useContext(ReducedMotionContext);
  const reducedMotion = useContext(ReducedMotionContext);

  // typeing aniation stuff
  const thoughts: string[] = [
    'Deep in thought.',
    'Often distraught.',
    'Works a lot.',
  ];
  const [charIdx, setCharIdx] = useState<number>(-1);
  const [thoughtIdx, setThoughtIdx] = useState<number>(0);
  const [typing, setTyping] = useState<boolean>(true);

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
    if (reducedMotion) return;

    setTimeout(() => {
      if (typing) {
        typeChar();
      } else {
        deleteChar();
      }
    }, Math.floor(Math.random() * 50) + 20);
  }, [typing, charIdx, reducedMotion]);
  useEffect(() => {
    if (reducedMotion) setCharIdx(thoughts[thoughtIdx].length);
  }, [reducedMotion]);

  // blinking cursor
  const [blinking, setBlinking] = useState<boolean>(false);
  useEffect(() => {
    if (reducedMotion) {
      setBlinking(false);
      return;
    }
    const blink = setInterval(() => {
      setBlinking((prev) => !prev);
    }, 700);

    return () => clearInterval(blink);
  }, [reducedMotion]);

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
