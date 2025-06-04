import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern bir e-ticaret platformu. React, Node.js ve PostgreSQL kullanılarak geliştirildi. Ödeme entegrasyonu, admin paneli ve real-time bildirimlere sahip.",
      longDescription: "Tam özellikli e-ticaret platformu. Kullanıcı authentication, sepet yönetimi, ödeme işlemleri, admin dashboard ve envanter yönetimi sistemi içerir.",
      image: "🛒",
      github: "https://github.com/username/ecommerce-platform",
      demo: "https://ecommerce-demo.vercel.app",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redux", "Material-UI"],
      status: "Tamamlandı",
      stars: 45,
      forks: 12,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Takım çalışması için geliştirilmiş görev yönetim uygulaması. Real-time collaboration, drag & drop ve gelişmiş filtreleme özellikleri.",
      longDescription: "Agile takımlar için özel olarak tasarlanmış proje yönetim aracı. Kanban board, sprint planning ve team collaboration özellikleri.",
      image: "📋",
      github: "https://github.com/username/task-manager",
      demo: "https://taskmanager-demo.vercel.app",
      technologies: ["React", "TypeScript", "Socket.io", "MongoDB", "Express", "Tailwind"],
      status: "Geliştiriliyor",
      stars: 32,
      forks: 8,
      gradient: "from-green-500 to-blue-500"
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Sosyal medya hesaplarını tek yerden yönetmek için analitik dashboard. Çoklu platform desteği ve detaylı raporlama.",
      longDescription: "Instagram, Twitter, Facebook ve LinkedIn hesaplarını tek dashboard'dan yönetme imkanı sunan analitik platform.",
      image: "📊",
      github: "https://github.com/username/social-dashboard",
      demo: "https://social-demo.vercel.app",
      technologies: ["Next.js", "Chart.js", "API Integration", "Tailwind", "Vercel"],
      status: "Tamamlandı",
      stars: 67,
      forks: 23,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Weather Forecast App",
      description: "Gelişmiş hava durumu uygulaması. 7 günlük tahmin, haritalar ve push bildirimleri. PWA özellikli.",
      longDescription: "Detaylı hava durumu bilgileri, interaktif haritalar, hava radar görüntüleri ve kişiselleştirilmiş bildirimler.",
      image: "🌤️",
      github: "https://github.com/username/weather-app",
      demo: "https://weather-demo.vercel.app",
      technologies: ["React", "PWA", "OpenWeather API", "Geolocation", "Service Workers"],
      status: "Tamamlandı",
      stars: 28,
      forks: 5,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      id: 5,
      title: "Real-time Chat App",
      description: "WebSocket tabanlı gerçek zamanlı mesajlaşma uygulaması. Grup chatleri, dosya paylaşımı ve emoji desteği.",
      longDescription: "End-to-end şifreleme, sesli/görüntülü arama, dosya paylaşımı ve bot entegrasyonu olan modern chat platformu.",
      image: "💬",
      github: "https://github.com/username/chat-app",
      demo: "https://chat-demo.vercel.app",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC"],
      status: "Geliştiriliyor",
      stars: 54,
      forks: 15,
      gradient: "from-pink-500 to-red-500"
    },
    {
      id: 6,
      title: "Cryptocurrency Tracker",
      description: "Kripto para takip uygulaması. Real-time fiyatlar, portfolio yönetimi ve teknik analiz araçları.",
      longDescription: "Binlerce kripto para birimini takip etme, portfolio oluşturma, fiyat alarmları ve detaylı analiz grafikleri.",
      image: "₿",
      github: "https://github.com/username/crypto-tracker",
      demo: "https://crypto-demo.vercel.app",
      technologies: ["React", "CoinGecko API", "Chart.js", "LocalStorage", "PWA"],
      status: "Tamamlandı",
      stars: 89,
      forks: 34,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const handleGithubClick = (githubUrl: string) => {
    window.open(githubUrl, '_blank', 'noopener noreferrer');
  };

  const handleDemoClick = (demoUrl: string) => {
    window.open(demoUrl, '_blank', 'noopener noreferrer');
  };

  return (
    <section className="py-20 px-6" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Projelerim
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Farklı teknolojiler kullanarak geliştirdiğim projeler ve açık kaynak katkılarım
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300 hover-scale group"
            >
              <CardContent className="p-6">
                {/* Project Header */}
                <div className={`w-full h-48 rounded-lg bg-gradient-to-r ${project.gradient} mb-6 flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-6xl opacity-80">{project.image}</div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className={`text-xs ${
                      project.status === 'Tamamlandı' 
                        ? 'bg-green-500/20 text-green-200 border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* GitHub Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {project.forks}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} className="bg-purple-500/20 text-purple-200 text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge className="bg-gray-500/20 text-gray-300 text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => handleGithubClick(project.github)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDemoClick(project.demo)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Daha Fazla Proje</h3>
              <p className="text-gray-300 mb-6">
                GitHub profilimde daha fazla açık kaynak proje ve kod örneği bulabilirsiniz.
              </p>
              <Button 
                onClick={() => handleGithubClick('https://github.com/username')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub Profilim
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;