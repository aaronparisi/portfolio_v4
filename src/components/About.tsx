import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { VisitedPagesContext } from '../contexts/contexts';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  // visited pages
  const location = useLocation();
  const { visitedPages, addVisitedPage } = useContext(VisitedPagesContext);
  useEffect(() => {
    console.log('inside About; checking for previous page');
    if (location.state) {
      addVisitedPage(location.state.from);
    }
  }, []); // TODO deps

  return <div>Hello from about</div>;
};

export default About;
