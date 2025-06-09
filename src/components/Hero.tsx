import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Profile Image */}
        <div className="mb-8 relative group">
          <div className="w-40 h-40 mx-auto rounded-full gradient-purple-pink p-1 animate-scale-in group-hover:gradient-blue-green transition-all duration-500">
            <div className="w-full h-full rounded-full gradient-masculine flex items-center justify-center text-6xl hover:scale-110 transition-transform duration-300">
              👨‍💻
            </div>
          </div>
          <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full gradient-purple-pink blur-lg opacity-50 animate-pulse group-hover:gradient-orange-red transition-all duration-500"></div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient-rainbow animate-fade-in hover:animate-pulse transition-all duration-500">
          Barkın Çeliker
        </h1>
        
        <p className="text-2xl md:text-3xl mb-4 animate-fade-in delay-200">
          <span className="text-gradient-purple font-semibold hover:text-gradient-blue transition-all duration-300">
            Yönetim Bilişim Sistemleri Öğrencisi & Developer
          </span>
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300">
          Yaşar Üniversitesi Yönetim Bilişim Sistemleri 3. sınıf öğrencisiyim. 
          Modern web teknolojileri ile kullanıcı deneyimini ön planda tutan uygulamalar geliştiriyorum.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in delay-500">
          <Button className="gradient-purple-pink hover:gradient-blue-green text-white px-8 py-3 rounded-full hover-scale transition-all duration-500 border-0">
            <Download className="w-4 h-4 mr-2" />
            CV İndir
          </Button>
          <Button variant="outline" className="border-2 border-transparent gradient-warning text-foreground hover:gradient-accent px-8 py-3 rounded-full hover-scale transition-all duration-500">
            Projelerimi Gör
          </Button>
        </div>
        
        <div className="flex justify-center gap-6 animate-fade-in delay-700">
          <a 
            href="https://github.com/barkinceliker" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full gradient-masculine-subtle backdrop-blur-lg border border-ring hover:gradient-primary transition-all duration-300 hover-scale group"
          >
            <Github className="w-6 h-6 text-gradient-accent group-hover:text-gradient-purple transition-all duration-300" />
          </a>
          <a 
            href="https://www.linkedin.com/in/celikerbarkin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full gradient-masculine-subtle backdrop-blur-lg border border-ring hover:gradient-info transition-all duration-300 hover-scale group"
          >
            <Linkedin className="w-6 h-6 text-gradient-blue group-hover:text-gradient-orange transition-all duration-300" />
          </a>
          <a 
            href="mailto:barkinclkr@gmail.com"
            className="p-3 rounded-full gradient-masculine-subtle backdrop-blur-lg border border-ring hover:gradient-accent transition-all duration-300 hover-scale group"
          >
            <Mail className="w-6 h-6 text-gradient-accent group-hover:text-gradient-primary transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;