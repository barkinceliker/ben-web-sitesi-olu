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
        <div className="mb-8 relative">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 animate-scale-in">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          </div>
          <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-50 animate-pulse"></div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
          Ali Developer
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-300 mb-4 animate-fade-in delay-200">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            Full Stack Developer
          </span>
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300">
          Modern web teknolojileri ile kullanıcı deneyimini ön planda tutan, 
          performanslı ve ölçeklenebilir uygulamalar geliştiriyorum.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in delay-500">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full hover-scale">
            <Download className="w-4 h-4 mr-2" />
            CV İndir
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400/20 px-8 py-3 rounded-full hover-scale">
            Projelerimi Gör
          </Button>
        </div>
        
        <div className="flex justify-center gap-6 animate-fade-in delay-700">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-purple-500/20 hover:bg-white/20 transition-all duration-300 hover-scale"
          >
            <Github className="w-6 h-6 text-purple-300" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-purple-500/20 hover:bg-white/20 transition-all duration-300 hover-scale"
          >
            <Linkedin className="w-6 h-6 text-purple-300" />
          </a>
          <a 
            href="mailto:ali@example.com"
            className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-purple-500/20 hover:bg-white/20 transition-all duration-300 hover-scale"
          >
            <Mail className="w-6 h-6 text-purple-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;