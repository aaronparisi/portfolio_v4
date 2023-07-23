import React, { useState, useEffect, useContext } from 'react';
import { VisitedPagesContext } from '../contexts/contexts';

import '../stylesheets/greeting.css';

import SelfTaught from './SelfTaught';
import DeepThought from './DeepThought';
import Namecard from './GreetingNamecard';
import GreetingFooter from './GreetingFooter';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';

interface GreetingProps {}

const Greeting: React.FC<GreetingProps> = () => {
  // visited pages
  const location = useLocation();
  const { visitedPages, addVisitedPage } = useContext(VisitedPagesContext);
  useEffect(() => {
    console.log('inside Greeting; checking for previous page');
    // TODO add page if necessary
    if (location.state) {
      // this seems odd... should app be doing this?
      addVisitedPage(location.state.from);
    }
  }, []); // TODO deps

  // loading
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    // NOTE: this is contrived.  Normally whether or not we
    // render a loading screen would depend on whether we need
    // to await some data, etc.
    // => for now, we just render a loading screen if this is
    //    "the first" page visited
    return visitedPages.size === 0;
  });
  const [toFadeLoader, setToFadeLoader] = useState<boolean>(false);
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setToFadeLoader(true);
      }, 2000);
    }
  }, [isLoading]);
  const onLoaderFade = () => {
    setIsLoading(false);
  };

  // TODO this feels hacky
  const [renderDeepThought, setRenderDeepThought] = useState<boolean>(false);
  const onSelfTaughtComplete = () => {
    setRenderDeepThought(true);
  };

  return isLoading ? (
    <Loading toFadeLoader={toFadeLoader} onLoaderFade={onLoaderFade} />
  ) : (
    <section className="greeting">
      <SelfTaught onComplete={onSelfTaughtComplete} />
      {renderDeepThought ? <DeepThought /> : ''}
      <Namecard />
      <GreetingFooter />
    </section>
  );
};

export default Greeting;
