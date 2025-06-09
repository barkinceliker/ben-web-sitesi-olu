import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Coffee, Lightbulb, Users, Target, Heart, Paintbrush, GraduationCap, Star, Award, Clock } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Temiz, okunabilir ve sürdürülebilir kod yazma prensiplerine uygun geliştirme"
    },
    {
      icon: Coffee,
      title: "Problem Solving",
      description: "Karmaşık problemleri basit ve etkili çözümlere dönüştürme yeteneği"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Yeni teknolojileri öğrenme ve projelerimde uygulama konusunda tutku"
    },
    {
      icon: Users,
      title: "Team Work",
      description: "Ekip çalışması ve agile metodolojilerle verimli proje yönetimi"
    },
    {
      icon: Target,
      title: "Goal Oriented",
      description: "Hedef odaklı yaklaşım ve deadline'ları karşılama konusunda başarı"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Kodlama ve teknolojiye olan tutkum sayesinde sürekli gelişim"
    }
  ];

  const experience = [
    {
      year: "2023-2024",
      title: "Senior Full Stack Developer",
      company: "Tech Startup",
      description: "React, Node.js ve PostgreSQL kullanarak ölçeklenebilir web uygulamaları geliştirdim.",
      icon: Code
    },
    {
      year: "2021-2023",
      title: "Frontend Developer",
      company: "Digital Agency",
      description: "Modern frontend teknolojileri ile kullanıcı deneyimini optimize eden projeler yürüttüm.",
      icon: Paintbrush
    },
    {
      year: "2020-2021",
      title: "Junior Developer",
      company: "Software Company",
      description: "Web geliştirme kariyerime başladığım ilk profesyonel deneyimim.",
      icon: GraduationCap
    }
  ];

  return (
    <section className="py-20 px-6" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Hakkımda
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Teknoloji dünyasında kendimi sürekli geliştiren, yaratıcı çözümler üreten bir yazılım geliştiricisi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <div className="space-y-6">
            <Card className="card-masculine hover:gradient-primary transition-all duration-500 group border-2 border-ring hover:border-transparent">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full gradient-purple-pink flex items-center justify-center group-hover:gradient-orange-red transition-all duration-300">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gradient-purple group-hover:text-gradient-orange transition-all duration-300">Hikayem</h3>
                </div>
                <p className="text-gradient-accent leading-relaxed mb-4 group-hover:text-gradient-blue transition-all duration-300">
                  Web geliştirme dünyasına olan tutkum, küçük yaşlarda bilgisayarlarla tanışmamla başladı. 
                  İlk kodlarımı yazdığım günden bu yana, teknolojinin insanların hayatını nasıl 
                  kolaylaştırabileceği konusunda hep heyecan duydum.
                </p>
                <p className="text-gradient-steel leading-relaxed group-hover:text-gradient-primary transition-all duration-300">
                  Bugün, modern web teknolojileri kullanarak kullanıcı deneyimini ön planda tutan, 
                  performanslı ve ölçeklenebilir uygulamalar geliştirme konusunda uzmanlaştım.
                </p>
              </CardContent>
            </Card>

            <Card className="card-masculine hover:gradient-accent transition-all duration-500 group border-2 border-ring hover:border-transparent">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full gradient-blue-green flex items-center justify-center group-hover:gradient-warning transition-all duration-300">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gradient-blue group-hover:text-gradient-orange transition-all duration-300">Değerlerim</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="gradient-purple-pink text-white hover:gradient-info transition-all duration-300">Kalite</Badge>
                    <span className="text-gradient-accent group-hover:text-gradient-blue transition-all duration-300">Her projede mükemmellik arayışı</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="gradient-info text-white hover:gradient-success transition-all duration-300">İnovasyon</Badge>
                    <span className="text-gradient-accent group-hover:text-gradient-blue transition-all duration-300">Yeni teknolojilere açık olmak</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="gradient-warning text-white hover:gradient-purple-pink transition-all duration-300">Sürdürülebilirlik</Badge>
                    <span className="text-gradient-accent group-hover:text-gradient-blue transition-all duration-300">Uzun vadeli çözümler üretmek</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full gradient-info flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gradient-blue hover:text-gradient-rainbow transition-all duration-300">Profesyonel Deneyim</h3>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => {
                const gradients = ['gradient-purple-pink', 'gradient-blue-green', 'gradient-warning'];
                const hoverGradients = ['gradient-info', 'gradient-orange-red', 'gradient-success'];
                const currentGradient = gradients[index % gradients.length];
                const currentHoverGradient = hoverGradients[index % hoverGradients.length];
                
                return (
                  <Card key={index} className={`card-masculine hover:${currentHoverGradient} transition-all duration-500 hover-scale group border-2 border-ring hover:border-transparent`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full ${currentGradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                          <exp.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gradient-primary mb-1 group-hover:text-gradient-orange transition-all duration-300">{exp.title}</h4>
                          <p className="text-gradient-blue mb-2 group-hover:text-gradient-accent transition-all duration-300">{exp.company}</p>
                          <p className="text-gradient-steel text-sm group-hover:text-gradient-primary transition-all duration-300">{exp.description}</p>
                          <Badge className={`mt-2 ${currentGradient} text-white text-xs hover:${currentHoverGradient} transition-all duration-300`}>{exp.year}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const gradients = ['gradient-purple-pink', 'gradient-blue-green', 'gradient-warning', 'gradient-info', 'gradient-orange-red', 'gradient-success'];
            const hoverGradients = ['gradient-orange-red', 'gradient-purple-pink', 'gradient-info', 'gradient-accent', 'gradient-blue-green', 'gradient-warning'];
            const currentGradient = gradients[index % gradients.length];
            const currentHoverGradient = hoverGradients[index % hoverGradients.length];
            
            return (
              <Card key={index} className={`card-masculine hover:${currentHoverGradient} transition-all duration-500 hover-scale group border-2 border-ring hover:border-transparent`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${currentGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:${hoverGradients[(index + 1) % hoverGradients.length]}`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gradient-primary group-hover:text-gradient-orange transition-all duration-300">{item.title}</h3>
                  <p className="text-gradient-steel text-sm leading-relaxed group-hover:text-gradient-accent transition-all duration-300">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;