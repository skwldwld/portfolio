import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, getText } from '../translations';

const STORAGE_KEY = 'portfolio_lang';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'ko';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang === 'en' ? 'en' : 'ko');
  }, []);

  const t = useCallback((key) => {
    const item = translations[key];
    if (!item) return key;
    return getText(item, language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    getText: (val) => getText(val, language),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
