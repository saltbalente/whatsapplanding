import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  hasInitialAnimationPlayed: boolean;
  setInitialAnimationPlayed: (played: boolean) => void;
  resetAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] = useState(false);

  const setInitialAnimationPlayed = (played: boolean) => {
    setHasInitialAnimationPlayed(played);
  };

  const resetAnimations = () => {
    setHasInitialAnimationPlayed(false);
  };

  const value = {
    hasInitialAnimationPlayed,
    setInitialAnimationPlayed,
    resetAnimations,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};