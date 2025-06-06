import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState<Tables<'projects'>[]>([]);

  useEffect(() => {
    setIsVisible(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const skillCategories = [
    {
      title: 'Veri Analizi',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Jupyter', 'Google Colab', 'Excel'],
      icon: '📊'
    },
    {
      title: 'Machine Learning',
      skills: ['Scikit-learn', 'TensorFlow', 'Keras', 'XGBoost', 'Random Forest', 'Linear Regression', 'Classification'],
      icon: '🤖'
    },
    {
      title: 'Databases & Big Data',
      skills: ['SQL', 'PostgreSQL', 'MongoDB', 'Apache Spark', 'Hadoop', 'Redis', 'Data Warehousing'],
      icon: '💾'
    },
    {
      title: 'Veri Görselleştirme',
      skills: ['Tableau', 'Power BI', 'D3.js', 'React Charts', 'Dash', 'Streamlit', 'Grafana'],
      icon: '📈'
    }
  ];

  const gradients = [
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-cyan-500 to-blue-500'
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
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
            Merhaba, Ben Barkın
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-6">
            YBS Öğrencisi & Developer
          </p>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Yaşar Üniversitesi Yönetim Bilişim Sistemleri 3. sınıf öğrencisiyim. 
            Modern web teknolojileri ile kullanıcı dostu çözümler geliştiriyorum.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
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
            <a href="https://github.com/barkinceliker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/celikerbarkin/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:barkinclkr@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
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
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">🚀 Tutkum</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  5+ yıllık deneyimle modern web teknolojileri alanında uzmanlaşmış bir yazılım geliştiricisiyim. 
                  Kullanıcı deneyimini ön planda tutarak, performanslı ve ölçeklenebilir çözümler üretiyorum.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-2xl border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-4 text-blue-300">💡 Yaklaşımım</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Frontend'den backend'e, tasarımdan deployment'a kadar yazılım geliştirme sürecinin her aşamasında 
                  deneyim sahibiyim. Sürekli öğrenmeyi seven ve teknolojiyi hayatımızı kolaylaştırmak için kullanan biriyim.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm text-purple-300">Hedef Odaklı</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-sm text-purple-300">Hızlı Çözüm</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="text-sm text-purple-300">Takım Çalışması</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-sm text-purple-300">Sürekli Gelişim</div>
                </div>
              </div>
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
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Teknolojiler & Beceriler
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <Card key={category.title} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                 <div className="text-center mb-6">
                   <div className="text-4xl mb-3">{category.icon}</div>
                   <h3 className="text-xl font-bold text-purple-300">{category.title}</h3>
                 </div>
                  
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skill}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-200 text-xs hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-default w-full justify-center"
                        style={{
                          animationDelay: `${(categoryIndex * category.skills.length + skillIndex) * 0.05}s`
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
             {projects.length === 0 ? (
               <div className="col-span-full text-center text-gray-400 py-12">
                 <p>Henüz proje eklenmemiş. Admin panelinden proje ekleyebilirsiniz.</p>
               </div>
             ) : (
               projects.map((project, index) => (
                 <Card 
                   key={project.id} 
                   className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                   onClick={() => project.github && window.open(project.github, '_blank')}
                 >
                   <CardContent className="p-6">
                    <div className={`w-full h-48 rounded-lg bg-gradient-to-r ${gradients[index % gradients.length]} mb-6 flex items-center justify-center relative overflow-hidden`}>
                      <Code className="w-16 h-16 text-white opacity-80" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                    </div>
                     
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                     <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                       {project.description || 'Açıklama eklenmemiş'}
                     </p>
                     
                     <div className="flex flex-wrap gap-2 mb-4">
                       {project.tech && project.tech.length > 0 ? (
                         project.tech.map((tech) => (
                           <Badge key={tech} className="bg-purple-500/20 text-purple-200 text-xs">
                             {tech}
                           </Badge>
                         ))
                       ) : (
                         <Badge className="bg-gray-500/20 text-gray-300 text-xs">
                           Teknoloji belirtilmemiş
                         </Badge>
                       )}
                     </div>
                     
                     {project.github && (
                       <div className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                         GitHub'da görüntüle →
                       </div>
                     )}
                   </CardContent>
                 </Card>
               ))
             )}
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
          © 2024 Barkın Çeliker. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
};

export default Index;