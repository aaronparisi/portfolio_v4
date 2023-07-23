import React, { createContext } from 'react';

export const ReducedMotionContext = createContext<boolean>(false);

interface VisitedPagesContextProps {
  visitedPages: Set<string>;
  addVisitedPage: (page: string) => void;
}
export const VisitedPagesContext = createContext<VisitedPagesContextProps>({
  visitedPages: new Set<string>([]),
  addVisitedPage: (page) => {},
});
