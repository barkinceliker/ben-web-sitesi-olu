import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-muted rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-25"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 relative z-10 pt-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number with gradient */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold mb-4 text-gradient-primary animate-fade-in">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full"></div>
          </div>

          {/* Error message */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-steel">
              Sayfa Bulunamadı
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönüp tekrar deneyebilirsiniz.
            </p>
          </div>

          {/* Attempted path info */}
          <div className="mb-8 p-4 bg-muted rounded-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Search className="w-4 h-4" />
              <span>Aranan sayfa: <code className="bg-background px-2 py-1 rounded text-foreground">{location.pathname}</code></span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Ana Sayfaya Dön
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Geri Git
            </Button>
          </div>

          {/* Additional help */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-muted-foreground mb-4">
              Yardıma mı ihtiyacınız var?
            </p>
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/contact'}
              className="text-primary hover:text-primary/80 hover:bg-accent/50"
            >
              Benimle İletişime Geçin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
