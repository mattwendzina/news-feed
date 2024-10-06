"use client";
import React, { createContext, useReducer, useContext } from "react";
import { type Action, initialState, reducer } from "./store";

interface StoreContextType {
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
};
