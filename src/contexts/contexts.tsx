import React, { createContext } from 'react';

interface VisitedPagesContextProps {
  visitedPages: Set<string>;
  addVisitedPage: (page: string) => void;
}
interface LoadingScreenContextProps {
  onLoadBegin: () => void;
  onLoadComplete: () => void;
  hasHadInitialLoad: boolean;
}

export const ReducedMotionContext = createContext<boolean>(false);
export const VisitedPagesContext = createContext<VisitedPagesContextProps>({
  visitedPages: new Set<string>([]),
  addVisitedPage: (page) => {},
});
export const LoadingScreenContext = createContext<LoadingScreenContextProps>({
  onLoadBegin: () => {},
  onLoadComplete: () => {},
  hasHadInitialLoad: false,
});
