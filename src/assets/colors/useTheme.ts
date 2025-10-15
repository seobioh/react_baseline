import { useState, useEffect } from 'react';
import type { Theme } from './theme';
import { getTheme, setTheme, toggleTheme } from './theme';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme());

  useEffect(() => {
    // 초기 테마 설정
    setTheme(currentTheme);
    
    // 시스템 테마 변경 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const systemTheme = e.matches ? 'dark' : 'light';
        setCurrentTheme(systemTheme);
        setTheme(systemTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [currentTheme]);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setTheme(theme);
  };

  const toggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
    return newTheme;
  };

  return {
    theme: currentTheme,
    setTheme: changeTheme,
    toggleTheme: toggle,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
  };
};
