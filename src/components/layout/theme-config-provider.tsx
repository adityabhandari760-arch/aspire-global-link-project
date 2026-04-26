"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeConfig } from "@/lib/theme-data";

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  getStyles: (section: keyof ThemeConfig) => React.CSSProperties;
  getClasses: (section: keyof ThemeConfig) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isCssColor = (str: string) => /^(#|rgb|rgba|hsl|hsla)/.test(str.trim());

export function ThemeConfigProvider({ initialTheme, children }: { initialTheme: ThemeConfig, children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);

  const getStyles = (section: keyof ThemeConfig): React.CSSProperties => {
    const config = theme[section] as any;
    if (!config) return {};
    
    const styles: any = {};
    if (config.bg && isCssColor(config.bg)) styles.backgroundColor = config.bg;
    if (config.text && isCssColor(config.text)) styles.color = config.text;
    
    if (section === 'card' || section === 'border') {
      if (config.border && isCssColor(config.border)) styles.borderColor = config.border;
      if (config.shadowColor && isCssColor(config.shadowColor)) {
        styles['--tw-shadow-color'] = config.shadowColor;
        styles.boxShadow = `var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`;
      }
    }
    return styles;
  };

  const getClasses = (section: keyof ThemeConfig): string => {
    const config = theme[section] as any;
    if (!config) return '';
    
    const classes: string[] = [];
    if (config.bg && !isCssColor(config.bg)) classes.push(config.bg);
    if (config.text && !isCssColor(config.text)) classes.push(config.text);
    if (section === 'card') {
      if (config.border && !isCssColor(config.border)) classes.push(config.border);
      if (config.borderStyle) classes.push(`border ${config.borderStyle}`);
      if (config.shadow) classes.push(config.shadow);
      if (config.shadowColor && !isCssColor(config.shadowColor)) classes.push(config.shadowColor);
    }
    if (section === 'border' && config.color && !isCssColor(config.color)) {
      classes.push(config.color);
    }
    return classes.join(' ');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getStyles, getClasses }}>
      <style dangerouslySetInnerHTML={{ __html: `
        ${theme.body?.bg && isCssColor(theme.body.bg) ? `body { background-color: ${theme.body.bg} !important; }` : ''}
        ${theme.body?.text && isCssColor(theme.body.text) ? `body { color: ${theme.body.text} !important; }` : ''}
        ${theme.border?.color && isCssColor(theme.border.color) ? `*, ::before, ::after { border-color: ${theme.border.color} !important; }` : ''}
        ${theme.links?.text && isCssColor(theme.links.text) ? `a { color: ${theme.links.text} !important; }` : ''}
      `}} />
      <div className={getClasses('body')} style={getStyles('body')}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useCustomTheme must be used within ThemeConfigProvider");
  return context;
};
