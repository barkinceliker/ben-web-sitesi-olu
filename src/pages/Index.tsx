import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'CSS/SCSS',
    'Tailwind CSS', 'Git', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'
  ];

  const projects = [
    {
      title: 'E-Ticaret Platformu',
      description: 'Modern React ve Node.js ile geliştirilmiş full-stack e-ticaret uygulaması',
      tech: ['React', 'Node.js', 'MongoDB'],
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Task Management App',
      description: 'Takım işbirliği için geliştirilmiş proje yönetim aracı',
      tech: ['TypeScript', 'Express', 'PostgreSQL'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Portfolio Website',
      description: 'Responsive ve modern tasarımlı kişisel portfolio sitesi',
      tech: ['React', 'Tailwind', 'Framer Motion'],
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-4xl">👋</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Merhaba, Ben Ali
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-6">
            Full Stack Developer & UI/UX Designer
          </p>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Modern web teknolojileri ile kullanıcı dostu çözümler geliştiriyorum. 
            Yaratıcılık ve kod arasında köprü kurarak projelerinizi hayata geçiriyorum.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Projelerimi Gör
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('contact')}
              className="border-purple-400 text-purple-200 hover:bg-purple-400/20 px-8 py-3 rounded-full transition-all duration-300"
            >
              İletişime Geç
            </Button>
          </div>
          
          <div className="flex gap-6 justify-center">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown 
            size={32} 
            className="text-purple-300 cursor-pointer" 
            onClick={() => scrollToSection('about')}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Hakkımda
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                5+ yıllık deneyimle modern web teknolojileri alanında uzmanlaşmış bir yazılım geliştiricisiyim. 
                Kullanıcı deneyimini ön planda tutarak, performanslı ve ölçeklenebilir çözümler üretiyorum.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Frontend'den backend'e, tasarımdan deployment'a kadar yazılım geliştirme sürecinin her aşamasında 
                deneyim sahibiyim. Sürekli öğrenmeyi seven ve teknolojiyi hayatımızı kolaylaştırmak için kullanan biriyim.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
                  <p className="text-gray-300">React, Vue.js, TypeScript ile modern kullanıcı arayüzleri</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
                  <p className="text-gray-300">Node.js, Python, PostgreSQL ile güçlü backend sistemleri</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Palette className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                  <p className="text-gray-300">Kullanıcı odaklı, modern ve etkileyici tasarımlar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Teknolojiler & Beceriler
          </h2>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <Badge 
                key={skill}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-200 px-4 py-2 text-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-default"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Projelerim
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                <CardContent className="p-6">
                  <div className={`w-full h-48 rounded-lg bg-gradient-to-r ${project.gradient} mb-6 flex items-center justify-center`}>
                    <Code className="w-16 h-16 text-white opacity-80" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} className="bg-purple-500/20 text-purple-200 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            İletişim
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Bir projeniz mi var? Hadi birlikte konuşalım!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Mail className="w-5 h-5 mr-2" />
              Email Gönder
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-400 text-purple-200 hover:bg-purple-400/20 px-8 py-3 rounded-full transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-purple-500/20">
        <p className="text-gray-400">
          © 2024 Ali. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
};

export default Index;