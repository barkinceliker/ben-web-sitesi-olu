import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [aboutContent, setAboutContent] = useState<{[key: string]: Tables<'about'>}>({});

  useEffect(() => {
    setIsVisible(true);
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about')
        .select('*');

      if (error) {
        console.error('Error fetching about content:', error);
        return;
      }

      const contentMap: {[key: string]: Tables<'about'>} = {};
      data?.forEach(item => {
        contentMap[item.section_key] = item;
      });
      setAboutContent(contentMap);
    } catch (error) {
      console.error('Error fetching about content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground gradient-daylight-subtle">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-25 animate-pulse delay-500"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 right-20 w-20 h-20 gradient-primary rounded-lg rotate-45 opacity-10 animate-bounce"></div>
          <div className="absolute bottom-32 left-16 w-16 h-16 bg-accent rounded-full opacity-15 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 gradient-primary transform rotate-12 opacity-20"></div>
        </div>
        
        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Profile Image */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto rounded-full gradient-primary p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-5xl">
                🧑‍💼
              </div>
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full gradient-primary blur-lg opacity-50 animate-pulse"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gradient leading-tight animate-fade-in-up">
            {aboutContent.hero_title?.title || 'Hello, I\'m Barkın Çeliker'}
          </h1>
          
          <p className="text-2xl md:text-4xl mb-6 font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-gradient-secondary">
              {aboutContent.hero_subtitle?.title || 'MIS Student & Data Analyst'}
            </span>
          </p>
          
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up text-gradient-accent" style={{ animationDelay: '0.4s' }}>
            {aboutContent.hero_description?.title || 'I\'m a 3rd year Management Information Systems student at Yasar University. I create value-added insights for businesses using modern data analysis technologies.'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              onClick={() => window.location.href = '/projects'}
              className="btn-masculine text-primary-foreground px-8 py-4 rounded-full text-lg font-medium animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              View My Projects
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/barkinceliker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-secondary hover:bg-accent border border-border hover:border-ring transition-all duration-300 transform hover:scale-110 group"
            >
              <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
            </a>
            <a 
              href="https://www.linkedin.com/in/celikerbarkin/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-secondary hover:bg-accent border border-border hover:border-ring transition-all duration-300 transform hover:scale-110 group"
            >
              <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
            </a>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div 
              onClick={() => window.location.href = '/about'}
              className="p-6 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group hover-lift animate-scale-in"
              style={{ animationDelay: '1.2s' }}
            >
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto transform transition-transform duration-300 group-hover:rotate-6">
                <span className="text-primary-foreground text-xl">🎯</span>
              </div>
                <h3 className="text-lg font-semibold mb-2 text-gradient-primary transition-colors">About Me</h3>
                <p className="text-sm text-gradient-accent">My educational background and personal approach</p>
            </div>
            
            <div 
              onClick={() => window.location.href = '/skills'}
              className="p-6 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group hover-lift animate-scale-in"
              style={{ animationDelay: '1.4s' }}
            >
              <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center mb-4 mx-auto transform transition-transform duration-300 group-hover:rotate-6">
                <span className="text-primary-foreground text-xl">⚡</span>
              </div>
                <h3 className="text-lg font-semibold mb-2 text-gradient-secondary transition-colors">Skills</h3>
                <p className="text-sm text-gradient-accent">My technical abilities and areas of expertise</p>
            </div>
            
            <div 
              onClick={() => window.location.href = '/experience'}
              className="p-6 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 cursor-pointer group hover-lift animate-scale-in"
              style={{ animationDelay: '1.6s' }}
            >
              <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center mb-4 mx-auto transform transition-transform duration-300 group-hover:rotate-6">
                <span className="text-primary-foreground text-xl">🏆</span>
              </div>
                <h3 className="text-lg font-semibold mb-2 text-gradient-accent transition-colors">Experience</h3>
                <p className="text-sm text-gradient-primary">My professional work experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border bg-muted">
        <p className="text-sm text-gradient-accent">
          © 2024 Barkın Çeliker. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;