import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  // Font scale: -1 (small), 0 (normal), 1 (large), 2 (extra-large)
  const [fontScale, setFontScale] = useState(() => {
    return parseInt(localStorage.getItem('aicte_font_scale') || '0', 10);
  });

  // Contrast: 'normal' | 'high-contrast'
  const [contrast, setContrast] = useState(() => {
    return localStorage.getItem('aicte_contrast') || 'normal';
  });

  // Language: 'EN' | 'HI'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('aicte_lang') || 'EN';
  });

  useEffect(() => {
    localStorage.setItem('aicte_font_scale', fontScale.toString());
    const root = document.documentElement;
    if (fontScale === -1) root.style.fontSize = '14px';
    else if (fontScale === 0) root.style.fontSize = '16px';
    else if (fontScale === 1) root.style.fontSize = '18px';
    else if (fontScale === 2) root.style.fontSize = '20px';
  }, [fontScale]);

  useEffect(() => {
    localStorage.setItem('aicte_contrast', contrast);
    const body = document.body;
    if (contrast === 'high-contrast') {
      body.classList.add('high-contrast-mode');
    } else {
      body.classList.remove('high-contrast-mode');
    }
  }, [contrast]);

  useEffect(() => {
    localStorage.setItem('aicte_lang', lang);
  }, [lang]);

  const decreaseFont = () => setFontScale((prev) => Math.max(prev - 1, -1));
  const resetFont = () => setFontScale(0);
  const increaseFont = () => setFontScale((prev) => Math.min(prev + 1, 2));

  const toggleContrast = () => {
    setContrast((prev) => (prev === 'normal' ? 'high-contrast' : 'normal'));
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'EN' ? 'HI' : 'EN'));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        decreaseFont,
        resetFont,
        increaseFont,
        contrast,
        toggleContrast,
        lang,
        toggleLanguage
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};