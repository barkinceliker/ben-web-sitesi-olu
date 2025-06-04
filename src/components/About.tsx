import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Coffee, Lightbulb, Users, Target, Heart } from 'lucide-react';

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
      description: "React, Node.js ve PostgreSQL kullanarak ölçeklenebilir web uygulamaları geliştirdim."
    },
    {
      year: "2021-2023",
      title: "Frontend Developer",
      company: "Digital Agency",
      description: "Modern frontend teknolojileri ile kullanıcı deneyimini optimize eden projeler yürüttüm."
    },
    {
      year: "2020-2021",
      title: "Junior Developer",
      company: "Software Company",
      description: "Web geliştirme kariyerime başladığım ilk profesyonel deneyimim."
    }
  ];

  return (
    <section className="py-20 px-6" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Hakkımda
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Teknoloji dünyasında kendimi sürekli geliştiren, yaratıcı çözümler üreten bir yazılım geliştiricisi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-purple-300">Hikayem</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Web geliştirme dünyasına olan tutkum, küçük yaşlarda bilgisayarlarla tanışmamla başladı. 
                  İlk kodlarımı yazdığım günden bu yana, teknolojinin insanların hayatını nasıl 
                  kolaylaştırabileceği konusunda hep heyecan duydum.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Bugün, modern web teknolojileri kullanarak kullanıcı deneyimini ön planda tutan, 
                  performanslı ve ölçeklenebilir uygulamalar geliştirme konusunda uzmanlaştım.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-purple-300">Değerlerim</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-purple-500/20 text-purple-200">Kalite</Badge>
                    <span className="text-gray-300">Her projede mükemmellik arayışı</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/20 text-blue-200">İnovasyon</Badge>
                    <span className="text-gray-300">Yeni teknolojilere açık olmak</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-pink-500/20 text-pink-200">Sürdürülebilirlik</Badge>
                    <span className="text-gray-300">Uzun vadeli çözümler üretmek</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 text-purple-300">Profesyonel Deneyim</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300 hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {exp.year.split('-')[0]}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{exp.title}</h4>
                        <p className="text-purple-300 mb-2">{exp.company}</p>
                        <p className="text-gray-400 text-sm">{exp.description}</p>
                        <Badge className="mt-2 bg-purple-500/20 text-purple-200 text-xs">{exp.year}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300 hover-scale group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;