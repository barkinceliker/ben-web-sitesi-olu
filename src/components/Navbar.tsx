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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-gray-900 font-bold text-lg">Barkın Çeliker</span>
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
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
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
              className="text-gray-700 hover:text-gray-900"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-lg rounded-lg mt-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
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