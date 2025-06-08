
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'english' | 'arabic';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('english');

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update document direction and lang attribute
    document.documentElement.dir = newLanguage === 'arabic' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage === 'arabic' ? 'ar' : 'en';
  };

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'english' || savedLanguage === 'arabic')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const isRTL = language === 'arabic';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
