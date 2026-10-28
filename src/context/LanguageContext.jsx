import React, { createContext, useContext, useState, useEffect } from 'react';
import siteData from '../data/siteData.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Try to get saved language from localStorage, default to 'ar'
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved === 'en' || saved === 'ar' ? saved : 'ar';
  });

  const setLanguage = (lang) => {
    if (lang === 'ar' || lang === 'en') {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    }
  };

  // Dynamically update document lang and direction
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Translation helper function
  const t = (path) => {
    if (!path) return '';
    const keys = path.split('.');
    let result = siteData[language];
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        // Return path if key not found to help debug
        return path;
      }
    }
    return result;
  };

  const equipments = siteData.equipments || [];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, equipments }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
