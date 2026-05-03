import { createContext, use, useContext, useState } from "react";

export const TEMAS = {
    normal: { primaria: '#BF3B5E', fundo: '#404040' },
    claro:  { primaria: '#F23064', fundo: '#FFFFFF' },
    dark:   { primaria: '#BF3B5E', fundo: '#262626' },
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [temaSelecionado, setTemaSelecionado] = useState('normal');

    return (
        <ThemeContext.Provider value={{temaSelecionado, setTemaSelecionado, 
            tema: TEMAS[temaSelecionado]}}>
            {children}
            </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}