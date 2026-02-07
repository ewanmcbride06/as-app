import { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  isExpanded: false,
  setIsExpanded: () => {},
});

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <LayoutContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
