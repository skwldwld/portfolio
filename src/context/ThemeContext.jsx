import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../theme/themes';

const STORAGE_KEY = 'portfolio_theme';

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children }) {
  const [mode, setModeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = useCallback((next) => {
    setModeState(next === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme = useMemo(() => {
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  const value = useMemo(() => {
    return { mode, setMode, toggleTheme, theme };
  }, [mode, setMode, toggleTheme, theme]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
}

