import fs from 'fs';
import path from 'path';
import { ThemeConfig, defaultThemeConfig } from './theme-data';

export function getThemeConfig(): ThemeConfig {
  try {
    const filePath = path.join(process.cwd(), 'theme-config.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as ThemeConfig;
    }
  } catch (error) {
    console.error('Error loading theme config:', error);
  }
  return defaultThemeConfig;
}
