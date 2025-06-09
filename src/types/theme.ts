export interface Theme {
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

export interface ThemeContextType {
  currentTheme: Theme | null;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}