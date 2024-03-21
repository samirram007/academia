/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
    theme: "light",
    setTheme: () => {},
});
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") == null
            ? "light"
            : localStorage.getItem("theme")
    );

    useEffect(() => {
        // Apply the theme on initial load
        // document.documentElement.classList.add(theme);
        if (theme == "dark") {
            document.querySelector("html").classList.remove("dark", "light");
            document.querySelector("html").classList.add(theme);
        } else {
            document.querySelector("html").classList.remove("dark", "light");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme,setTheme,}}>
            {children}
        </ThemeContext.Provider>
    );
};
export const useTheme = () => useContext(ThemeContext);
