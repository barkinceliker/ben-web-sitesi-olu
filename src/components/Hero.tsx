import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Simple background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-muted rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-25"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Profile Image */}
        <div className="mb-8 relative group">
          <div className="w-40 h-40 mx-auto rounded-full border-2 border-border p-1 hover:border-primary transition-all duration-300">
            <div className="w-full h-full rounded-full bg-accent flex items-center justify-center text-6xl hover:scale-105 transition-transform duration-300">
              👨‍💻
            </div>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient-primary">
          Barkın Çeliker
        </h1>
        
        <p className="text-2xl md:text-3xl mb-4">
          <span className="text-gradient font-semibold">
            Yönetim Bilişim Sistemleri Öğrencisi & Developer
          </span>
        </p>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Yaşar Üniversitesi Yönetim Bilişim Sistemleri 3. sınıf öğrencisiyim. 
          Modern web teknolojileri ile kullanıcı deneyimini ön planda tutan uygulamalar geliştiriyorum.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button className="btn-light px-8 py-3 rounded-full">
            <Download className="w-4 h-4 mr-2" />
            CV İndir
          </Button>
          <Button variant="outline" className="px-8 py-3 rounded-full border-primary hover:bg-primary hover:text-primary-foreground">
            Projelerimi Gör
          </Button>
        </div>
        
        <div className="flex justify-center gap-6">
          <a 
            href="https://github.com/barkinceliker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-accent border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/celikerbarkin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-accent border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="mailto:barkinclkr@gmail.com"
            className="p-3 rounded-full bg-accent border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;