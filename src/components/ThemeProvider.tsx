import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Theme, ThemeContextType } from '@/types/theme';
import { predefinedThemes } from '@/data/predefinedThemes';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [themes] = useState<Theme[]>(predefinedThemes);

  useEffect(() => {
    fetchActiveTheme();
  }, []);

  const fetchActiveTheme = async () => {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching active theme:', error);
        return;
      }

      if (data && typeof data.colors === 'object') {
        const theme: Theme = {
          id: data.id,
          name: data.name,
          colors: data.colors as Theme['colors']
        };
        setCurrentTheme(theme);
        applyTheme(theme);
      } else {
        // Set default theme if no active theme found
        const defaultTheme = predefinedThemes[0];
        setCurrentTheme(defaultTheme);
        applyTheme(defaultTheme);
      }
    } catch (error) {
      console.error('Error fetching active theme:', error);
    }
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (key !== 'gradient') {
        root.style.setProperty(`--${key}`, value);
      }
    });
  };

  const setTheme = async (theme: Theme) => {
    try {
      // Deactivate all themes first
      await supabase
        .from('themes')
        .update({ is_active: false })
        .neq('id', '');

      // Check if theme exists in database
      const { data: existingTheme } = await supabase
        .from('themes')
        .select('*')
        .eq('name', theme.name)
        .single();

      if (existingTheme) {
        // Update existing theme
        await supabase
          .from('themes')
          .update({ is_active: true, colors: theme.colors })
          .eq('id', existingTheme.id);
      } else {
        // Insert new theme
        await supabase
          .from('themes')
          .insert([{
            name: theme.name,
            colors: theme.colors,
            is_active: true
          }]);
      }

      setCurrentTheme(theme);
      applyTheme(theme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};