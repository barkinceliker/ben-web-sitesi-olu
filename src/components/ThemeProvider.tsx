import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    gradient: string;
  };
}

interface ThemeContextType {
  currentTheme: Theme | null;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const predefinedThemes: Theme[] = [
  {
    id: 'default',
    name: 'Default Purple',
    colors: {
      primary: '261 83% 58%',
      secondary: '210 40% 98%',
      accent: '210 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '210 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '214.3 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(261 83% 58%) 0%, hsl(314 100% 76%) 100%)'
    }
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    colors: {
      primary: '200 95% 45%',
      secondary: '200 40% 98%',
      accent: '200 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '200 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '200 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(200 95% 45%) 0%, hsl(180 100% 76%) 100%)'
    }
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '142 76% 36%',
      secondary: '142 40% 98%',
      accent: '142 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '142 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '142 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(120 100% 76%) 100%)'
    }
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    colors: {
      primary: '25 95% 53%',
      secondary: '25 40% 98%',
      accent: '25 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '25 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '25 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(25 95% 53%) 0%, hsl(45 100% 76%) 100%)'
    }
  },
  {
    id: 'crimson-red',
    name: 'Crimson Red',
    colors: {
      primary: '348 83% 47%',
      secondary: '348 40% 98%',
      accent: '348 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '348 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '348 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(348 83% 47%) 0%, hsl(0 100% 76%) 100%)'
    }
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: {
      primary: '271 91% 65%',
      secondary: '271 40% 98%',
      accent: '271 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '271 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '271 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(271 91% 65%) 0%, hsl(290 100% 76%) 100%)'
    }
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    colors: {
      primary: '221 83% 53%',
      secondary: '221 40% 98%',
      accent: '221 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '221 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '221 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(240 100% 76%) 100%)'
    }
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    colors: {
      primary: '160 84% 39%',
      secondary: '160 40% 98%',
      accent: '160 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '160 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '160 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(160 84% 39%) 0%, hsl(140 100% 76%) 100%)'
    }
  },
  {
    id: 'golden-yellow',
    name: 'Golden Yellow',
    colors: {
      primary: '48 96% 53%',
      secondary: '48 40% 98%',
      accent: '48 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '48 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '48 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(48 96% 53%) 0%, hsl(60 100% 76%) 100%)'
    }
  },
  {
    id: 'rose-pink',
    name: 'Rose Pink',
    colors: {
      primary: '330 81% 60%',
      secondary: '330 40% 98%',
      accent: '330 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '330 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '330 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(330 81% 60%) 0%, hsl(350 100% 76%) 100%)'
    }
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    colors: {
      primary: '195 100% 50%',
      secondary: '195 40% 98%',
      accent: '195 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '195 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '195 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(195 100% 50%) 0%, hsl(210 100% 76%) 100%)'
    }
  },
  {
    id: 'lavender-purple',
    name: 'Lavender Purple',
    colors: {
      primary: '280 70% 65%',
      secondary: '280 40% 98%',
      accent: '280 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '280 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '280 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(280 70% 65%) 0%, hsl(300 100% 76%) 100%)'
    }
  },
  {
    id: 'teal-green',
    name: 'Teal Green',
    colors: {
      primary: '173 80% 40%',
      secondary: '173 40% 98%',
      accent: '173 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '173 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '173 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(173 80% 40%) 0%, hsl(150 100% 76%) 100%)'
    }
  },
  {
    id: 'coral-orange',
    name: 'Coral Orange',
    colors: {
      primary: '16 90% 60%',
      secondary: '16 40% 98%',
      accent: '16 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '16 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '16 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(16 90% 60%) 0%, hsl(30 100% 76%) 100%)'
    }
  },
  {
    id: 'indigo-blue',
    name: 'Indigo Blue',
    colors: {
      primary: '238 83% 67%',
      secondary: '238 40% 98%',
      accent: '238 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '238 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '238 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(238 83% 67%) 0%, hsl(250 100% 76%) 100%)'
    }
  },
  {
    id: 'mint-green',
    name: 'Mint Green',
    colors: {
      primary: '151 83% 45%',
      secondary: '151 40% 98%',
      accent: '151 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '151 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '151 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(151 83% 45%) 0%, hsl(130 100% 76%) 100%)'
    }
  },
  {
    id: 'magenta-pink',
    name: 'Magenta Pink',
    colors: {
      primary: '300 85% 60%',
      secondary: '300 40% 98%',
      accent: '300 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '300 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '300 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(300 85% 60%) 0%, hsl(320 100% 76%) 100%)'
    }
  },
  {
    id: 'amber-yellow',
    name: 'Amber Yellow',
    colors: {
      primary: '45 93% 47%',
      secondary: '45 40% 98%',
      accent: '45 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '45 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '45 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(45 93% 47%) 0%, hsl(55 100% 76%) 100%)'
    }
  },
  {
    id: 'cyan-blue',
    name: 'Cyan Blue',
    colors: {
      primary: '188 94% 43%',
      secondary: '188 40% 98%',
      accent: '188 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '188 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '188 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(188 94% 43%) 0%, hsl(200 100% 76%) 100%)'
    }
  },
  {
    id: 'lime-green',
    name: 'Lime Green',
    colors: {
      primary: '84 81% 44%',
      secondary: '84 40% 98%',
      accent: '84 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '84 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '84 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(84 81% 44%) 0%, hsl(100 100% 76%) 100%)'
    }
  },
  {
    id: 'violet-purple',
    name: 'Violet Purple',
    colors: {
      primary: '263 70% 50%',
      secondary: '263 40% 98%',
      accent: '263 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '263 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '263 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(263 70% 50%) 0%, hsl(280 100% 76%) 100%)'
    }
  },
  {
    id: 'turquoise-blue',
    name: 'Turquoise Blue',
    colors: {
      primary: '174 100% 29%',
      secondary: '174 40% 98%',
      accent: '174 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '174 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '174 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(174 100% 29%) 0%, hsl(190 100% 76%) 100%)'
    }
  },
  {
    id: 'cherry-red',
    name: 'Cherry Red',
    colors: {
      primary: '355 78% 60%',
      secondary: '355 40% 98%',
      accent: '355 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '355 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '355 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(355 78% 60%) 0%, hsl(10 100% 76%) 100%)'
    }
  },
  {
    id: 'sage-green',
    name: 'Sage Green',
    colors: {
      primary: '95 38% 62%',
      secondary: '95 40% 98%',
      accent: '95 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '95 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '95 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(95 38% 62%) 0%, hsl(110 100% 76%) 100%)'
    }
  },
  {
    id: 'periwinkle-blue',
    name: 'Periwinkle Blue',
    colors: {
      primary: '235 85% 70%',
      secondary: '235 40% 98%',
      accent: '235 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '235 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '235 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(235 85% 70%) 0%, hsl(245 100% 76%) 100%)'
    }
  },
  {
    id: 'peach-orange',
    name: 'Peach Orange',
    colors: {
      primary: '20 100% 70%',
      secondary: '20 40% 98%',
      accent: '20 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '20 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '20 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(20 100% 70%) 0%, hsl(35 100% 76%) 100%)'
    }
  },
  {
    id: 'slate-blue',
    name: 'Slate Blue',
    colors: {
      primary: '248 53% 58%',
      secondary: '248 40% 98%',
      accent: '248 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '248 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '248 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(248 53% 58%) 0%, hsl(260 100% 76%) 100%)'
    }
  },
  {
    id: 'seafoam-green',
    name: 'Seafoam Green',
    colors: {
      primary: '158 64% 52%',
      secondary: '158 40% 98%',
      accent: '158 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '158 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '158 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(158 64% 52%) 0%, hsl(170 100% 76%) 100%)'
    }
  },
  {
    id: 'plum-purple',
    name: 'Plum Purple',
    colors: {
      primary: '292 84% 61%',
      secondary: '292 40% 98%',
      accent: '292 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '292 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '292 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(292 84% 61%) 0%, hsl(310 100% 76%) 100%)'
    }
  },
  {
    id: 'steel-blue',
    name: 'Steel Blue',
    colors: {
      primary: '207 44% 49%',
      secondary: '207 40% 98%',
      accent: '207 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      muted: '207 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '207 31.8% 91.4%',
      gradient: 'linear-gradient(135deg, hsl(207 44% 49%) 0%, hsl(220 100% 76%) 100%)'
    }
  },
  {
    id: 'masculine-gray',
    name: 'Masculine Gray',
    colors: {
      primary: '210 10% 35%',
      secondary: '210 10% 96%',
      accent: '210 10% 90%',
      background: '0 0% 100%',
      foreground: '210 20% 15%',
      card: '0 0% 100%',
      cardForeground: '210 20% 15%',
      muted: '210 10% 96%',
      mutedForeground: '210 10% 45%',
      border: '210 10% 88%',
      gradient: 'linear-gradient(135deg, hsl(210 10% 35%) 0%, hsl(210 8% 50%) 50%, hsl(210 12% 65%) 100%)'
    }
  }
];

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