import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TEMAS = {
  normal: {
    primaria: '#BF3B5E',
    fundo: '#404040',
    card: '#262626',
    texto: '#FFFFFF',
    textoSecundario: '#D1D1D1',
    borda: '#555555',
    tabBar: '#262626',
  },
  claro: {
    primaria: '#F23064',
    fundo: '#FFFFFF',
    card: '#F4F4F4',
    texto: '#1C1C1C',
    textoSecundario: '#666666',
    borda: '#D9D9D9',
    tabBar: '#FFFFFF',
  },
  dark: {
    primaria: '#BF3B5E',
    fundo: '#1C1C1C',
    card: '#262626',
    texto: '#FFFFFF',
    textoSecundario: '#AAAAAA',
    borda: '#444444',
    tabBar: '#262626',
  },
};

const STORAGE_KEY = 'temaSelecionado';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [temaSelecionado, setTemaSelecionado] = useState('normal');

  useEffect(() => {
    async function carregarTema() {
      try {
        const temaSalvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (temaSalvo && TEMAS[temaSalvo]) {
          setTemaSelecionado(temaSalvo);
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
      }
    }

    carregarTema();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, temaSelecionado).catch((error) => {
      console.error('Erro ao salvar tema:', error);
    });
  }, [temaSelecionado]);

  return (
    <ThemeContext.Provider
      value={{
        temaSelecionado,
        setTemaSelecionado,
        tema: TEMAS[temaSelecionado],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}