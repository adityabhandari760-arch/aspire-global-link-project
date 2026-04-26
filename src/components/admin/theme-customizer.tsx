"use client";

import React, { useState } from 'react';
import { ThemeConfig, defaultThemeConfig } from '@/lib/theme-data';
import { useCustomTheme } from '@/components/layout/theme-config-provider';

export function ThemeCustomizer() {
  const { theme, setTheme } = useCustomTheme();
  // Safe init in case theme is somehow undefined during hydration
  const [localTheme, setLocalTheme] = useState<ThemeConfig>(theme || defaultThemeConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (section: keyof ThemeConfig, property: string, value: string) => {
    const updated = { ...localTheme, [section]: { ...localTheme[section], [property]: value } };
    setLocalTheme(updated);
    setTheme(updated); // Update context for live preview immediately
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localTheme)
      });
      if (res.ok) {
        setMessage('Theme saved successfully! Changes are live.');
      } else {
        setMessage('Error saving theme.');
      }
    } catch (err) {
      setMessage('Network error.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setLocalTheme(defaultThemeConfig);
    setTheme(defaultThemeConfig);
  };

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Theme Customizer</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Accepts Hex codes (e.g. <code>#000000</code>) or Tailwind classes (e.g. <code>bg-red-500</code>).
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="px-4 py-2 border rounded-md hover:bg-muted text-sm font-medium transition-colors">
            Reset
          </button>
          <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            {isSaving ? 'Saving...' : 'Save Theme'}
          </button>
        </div>
      </div>
      
      {message && (
        <div className={`p-3 mb-6 text-sm rounded border font-medium ${
          message.includes('Error') 
            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
            : 'bg-green-500/10 text-green-500 border-green-500/20'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {(['header', 'footer', 'body', 'card', 'border', 'links'] as (keyof ThemeConfig)[]).map((section) => (
          <div key={section} className="border border-border/50 bg-muted/10 p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold capitalize mb-4 pb-2 border-b flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/70"></div>
              {section}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.keys(defaultThemeConfig[section]).map((prop) => (
                <div key={prop}>
                  <label className="block text-sm font-medium mb-1.5 capitalize text-foreground/80">
                    {prop}
                  </label>
                  <input
                    type="text"
                    value={(localTheme[section] as any)[prop] || ''}
                    onChange={(e) => handleChange(section, prop, e.target.value)}
                    placeholder={prop.includes('color') || prop.includes('bg') || prop.includes('text') ? '#000000 or bg-black' : 'e.g. shadow-lg'}
                    className="w-full px-3 py-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
