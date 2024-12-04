import React, { createContext, useState } from 'react';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(false); 

    const toggleTheme = () => {
        setTheme(prevTheme => !prevTheme);
        
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children && children.toggle}
        </ThemeContext.Provider>
    );
};
