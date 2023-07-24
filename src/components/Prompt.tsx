import React from 'react';
import { animated, SpringValue, SpringValues } from 'react-spring';
import '../stylesheets/prompt.css';

interface PromptProps {
  prompt: { question: string; answer: string };
  spring: { opacity: SpringValue<number>; transform: SpringValue<string> };
}

const Prompt: React.FC<PromptProps> = ({ prompt, spring }) => {
  return (
    <animated.div className="prompt" style={spring}>
      <h2>{prompt.question}</h2>
    </animated.div>
  );
};

export default Prompt;
