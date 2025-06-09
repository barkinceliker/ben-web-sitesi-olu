import { useState } from 'react';
import { Menu, X, Home, BookOpen, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Ana Sayfa', href: '/', icon: Home },
    { name: 'Hakkımda', href: '/about', icon: User },
    { name: 'Projelerim', href: '/projects', icon: BookOpen },
    { name: 'Beceriler', href: '/skills', icon: Shield },
    { name: 'Deneyim', href: '/experience', icon: Shield },
    { name: 'CV', href: '/resume', icon: Shield },
    { name: 'İletişim', href: '/contact', icon: Shield },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <User size={16} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-gradient">Barkın Çeliker</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'bg-accent text-accent-foreground border border-ring'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-lg rounded-lg mt-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'bg-accent text-accent-foreground border border-ring'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;