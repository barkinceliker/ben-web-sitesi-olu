import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Müşteri Segmentasyonu AI",
      description: "Machine learning algoritmaları ile müşteri davranışlarını analiz eden segmentasyon sistemi. K-means ve hierarchical clustering teknikleri kullanıldı.",
      longDescription: "E-ticaret verilerini analiz ederek müşteri segmentasyonu yapan AI sistemi. RFM analizi, demographic segmentation ve behavior-based clustering.",
      github: "https://github.com/barkinceliker/customer-segmentation",
      demo: "https://customer-segmentation-demo.vercel.app",
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "PostgreSQL", "Flask"],
      status: "Tamamlandı",
      stars: 45,
      forks: 12,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      title: "Satış Tahmin Modeli",
      description: "Time series analizi ile gelecek satış tahminleri yapan makine öğrenmesi modeli. LSTM ve ARIMA modellerini karşılaştırır.",
      longDescription: "Geçmiş satış verilerini analiz ederek gelecek dönem satış tahminleri yapan predictive analytics sistemi.",
      github: "https://github.com/barkinceliker/sales-forecasting",
      demo: "https://sales-forecast-demo.vercel.app",
      technologies: ["Python", "TensorFlow", "Keras", "Pandas", "NumPy", "Plotly"],
      status: "Geliştiriliyor",
      stars: 32,
      forks: 8,
      gradient: "from-green-500 to-blue-500"
    },
    {
      id: 3,
      title: "Finansal Dashboard",
      description: "Real-time finansal verileri görselleştiren interaktif dashboard. Hisse senedi, kripto para ve forex verilerini analiz eder.",
      longDescription: "Finansal piyasa verilerini real-time olarak takip eden ve görselleştiren analytics dashboard. Technical indicators ve risk analizi.",
      github: "https://github.com/barkinceliker/financial-dashboard",
      demo: "https://financial-dashboard-demo.vercel.app",
      technologies: ["React", "D3.js", "Python API", "Alpha Vantage", "Chart.js", "WebSocket"],
      status: "Tamamlandı",
      stars: 67,
      forks: 23,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Sentiment Analysis Tool",
      description: "Sosyal medya verilerini analiz ederek duygu analizi yapan NLP projesi. Twitter ve Reddit verilerini işler.",
      longDescription: "Natural Language Processing teknikleri ile sosyal medya postlarının sentiment analizini yapan tool. Brand monitoring için geliştirildi.",
      github: "https://github.com/barkinceliker/sentiment-analysis",
      demo: "https://sentiment-demo.vercel.app",
      technologies: ["Python", "NLTK", "spaCy", "Transformers", "Twitter API", "Streamlit"],
      status: "Tamamlandı",
      stars: 28,
      forks: 5,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      id: 5,
      title: "Fraud Detection System",
      description: "Kredi kartı işlemlerinde sahte işlemleri tespit eden machine learning sistemi. Anomaly detection algoritmaları kullanır.",
      longDescription: "Finansal işlemlerde fraud detection için geliştirilen ML sistemi. Real-time monitoring ve alert sistemi içerir.",
      github: "https://github.com/barkinceliker/fraud-detection",
      demo: "https://fraud-detection-demo.vercel.app",
      technologies: ["Python", "XGBoost", "Isolation Forest", "Apache Kafka", "PostgreSQL", "Docker"],
      status: "Geliştiriliyor",
      stars: 54,
      forks: 15,
      gradient: "from-pink-500 to-red-500"
    },
    {
      id: 6,
      title: "Supply Chain Analytics",
      description: "Tedarik zinciri optimizasyonu için veri analizi platformu. Inventory management ve demand forecasting özellikleri.",
      longDescription: "Supply chain verilerini analiz ederek optimizasyon önerileri sunan analytics platform. Cost reduction ve efficiency improvement.",
      github: "https://github.com/barkinceliker/supply-chain-analytics",
      demo: "https://supply-chain-demo.vercel.app",
      technologies: ["Python", "OR-Tools", "Pandas", "Tableau", "SQL", "AWS"],
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
                  <div className="text-6xl opacity-80 font-bold text-white">AI</div>
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
                onClick={() => handleGithubClick('https://github.com/barkinceliker')}
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