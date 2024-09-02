import React from "react";

const Context = React.createContext(null);

export const useDataProvider = () => {
  const contextState = React.useContext(Context);
  if (contextState === null) {
    throw new Error("useItemData must be used within a DataProvider tag");
  }
  return contextState.value;
};

export const DataProvider = (props) => {
  return (
    <Context.Provider value={{ ...props }}>{props.children}</Context.Provider>
  );
};
