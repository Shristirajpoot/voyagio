// src/contexts/ItineraryContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ItineraryResponseType } from "../types/ResponseTypes";

interface ItineraryContextType {
  response: ItineraryResponseType | null;
  isSaved: boolean;
  setIsSaved: (value: boolean) => void;
  setResponse: (response: ItineraryResponseType | null) => void;
}

interface ItineraryProviderProps {
  children: ReactNode;
}

const ItineraryContext = createContext<ItineraryContextType | null>(null);

const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error("useItinerary must be used within a ItineraryProvider");
  }
  return context;
};

const ItineraryProvider: React.FC<ItineraryProviderProps> = ({ children }) => {
  const [response, setResponse] = useState<ItineraryResponseType | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Example function that updates the context state
  const updateResponse = (newResponse: ItineraryResponseType | null) => {
    setResponse(newResponse);
  };

  return (
    <ItineraryContext.Provider
      value={{ response, setResponse: updateResponse, isSaved, setIsSaved }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export { useItinerary, ItineraryProvider };
