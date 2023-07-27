import React, { useContext } from 'react';
import { config, useTrail } from 'react-spring';
import '../stylesheets/about.css';

import { ReducedMotionContext } from '../contexts/contexts';

import Prompt from './Prompt';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const reducedMotion = useContext(ReducedMotionContext);
  const prompts: { question: string; answer: string }[] = [
    { question: "Why I'm a great hire", answer: 'because...' },
    { question: "What I'm good at", answer: 'because...' },
    { question: 'What needs improvement', answer: 'because...' },
    { question: 'How I got here', answer: 'because...' },
    { question: 'Why this career path', answer: 'because...' },
  ];

  // page load
  const loadingSprings = useTrail(prompts.length, {
    from: { opacity: 1, transform: 'translateY(50%)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
    config: config.wobbly,
    immediate: reducedMotion,
  });

  return (
    <div className="about">
      <h1>About Me</h1>
      <section className="about-prompts-container">
        {loadingSprings.map((spring, idx) => (
          <Prompt prompt={prompts[idx]} key={idx} spring={spring}></Prompt>
        ))}
      </section>
    </div>
  );
};

export default About;
