import React, { createContext, useState, useEffect } from "react";
import 'bulma/css/bulma.css';
export const ThemeContext = createContext();

const initialState = {
  isLightTheme: true,
  light: " has-text-black",
  dark: " has-background-black has-text-white",
  navLight: "is-white",
  navDark: "is-dark",
  cardLight: " has-text-black",
  cardDark: "has-background-dark has-text-white",
  pageLight: " has-text-black",
  pageDark: "has-text-white",
};

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(() => {
    const item = localStorage.getItem('lightTheme') 
    const localTheme = item ? (item === 'true') : true;
    return { ...initialState, isLightTheme: localTheme };
  });
  
  useEffect(() => {
    localStorage.setItem('lightTheme', theme.isLightTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevState => ({...prevState, isLightTheme: !prevState.isLightTheme}))
  };

  return (
    <ThemeContext.Provider
      value={{ ...theme, toggleTheme: toggleTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;