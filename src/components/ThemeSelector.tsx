import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/ThemeProvider';
import { predefinedThemes } from '@/data/predefinedThemes';
import { Check, Palette } from 'lucide-react';

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, themes } = useTheme();

  const handleThemeSelect = (theme: typeof predefinedThemes[0]) => {
    setTheme(theme);
  };

  return (
    <div className="card-masculine animate-fade-in rounded-lg">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-gradient-primary flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Settings
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {predefinedThemes.map((theme) => (
            <div
              key={theme.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 card-masculine ${
                currentTheme?.id === theme.id 
                  ? 'border-ring gradient-accent' 
                  : 'border-border hover:border-ring'
              }`}
              onClick={() => handleThemeSelect(theme)}
            >
              {currentTheme?.id === theme.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-foreground" />
                </div>
              )}
              
              <div className="space-y-2">
                <div 
                  className="w-full h-8 rounded"
                  style={{ 
                    background: theme.colors.gradient 
                  }}
                />
                <div className="flex gap-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                  />
                </div>
                <p className="text-sm font-medium truncate text-gradient-accent">{theme.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 gradient-masculine-subtle rounded-lg border border-border">
          <h4 className="font-medium mb-2 text-gradient-steel">Current Theme</h4>
          {currentTheme ? (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-gradient-accent border-border">{currentTheme.name}</Badge>
              <div 
                className="w-6 h-6 rounded-full border border-border"
                style={{ 
                  background: currentTheme.colors.gradient 
                }}
              />
            </div>
          ) : (
            <p className="text-gradient-accent">No theme selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;