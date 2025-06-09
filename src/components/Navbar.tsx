import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Award, Calendar, FileText, Mail, Book, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Ana Sayfa', href: '/', icon: Home },
    { name: 'Hakkımda', href: '/about', icon: User },
    { name: 'Projelerim', href: '/projects', icon: Briefcase },
    { name: 'Beceriler', href: '/skills', icon: Award },
    { name: 'Deneyim', href: '/experience', icon: Calendar },
    { name: 'CV', href: '/resume', icon: FileText },
    { name: 'İletişim', href: '/contact', icon: Mail },
    { name: 'Blog', href: '/blog', icon: Book },
    { name: 'Admin', href: '/admin', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 gradient-masculine-subtle/95 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold">BC</span>
              </div>
              <span className="font-bold text-lg text-gradient-steel">Barkın Çeliker</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive(item.href)
                        ? 'bg-accent text-foreground border border-ring'
                        : 'text-gradient-accent hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gradient-accent hover:text-gradient-primary"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 gradient-masculine-subtle/95 backdrop-blur-lg rounded-lg mt-2 border border-border">
              {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive(item.href)
                        ? 'bg-accent text-foreground border border-ring'
                        : 'text-gradient-accent hover:bg-secondary hover:text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;