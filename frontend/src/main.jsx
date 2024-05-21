import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// iss ko use kiya tha starting mai....

// createContext ka use kiya , and isAuthorized : false kiya h...ku ki start mai user authorized nhi hoga....
export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  // isAuthorized ---> false h....
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
