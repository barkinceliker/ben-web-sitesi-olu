import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const About = () => {
  const [aboutContent, setAboutContent] = useState<{[key: string]: Tables<'about'>}>({});

  useEffect(() => {
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

  const highlights = [
    {
      title: "Data Analysis",
      description: "Comprehensive data analysis and statistical modeling with Python, R and SQL"
    },
    {
      title: "Problem Solving",
      description: "Ability to transform complex data problems into simple and effective solutions"
    },
    {
      title: "Innovation",
      description: "Passion for learning new data technologies and applying them in my projects"
    },
    {
      title: "Team Work",
      description: "Efficient project management with teamwork and agile methodologies"
    },
    {
      title: "Goal-Oriented",
      description: "Goal-oriented approach and success in meeting deadlines"
    },
    {
      title: "Passion",
      description: "Continuous development thanks to my passion for data science"
    }
  ];

  return (
    <div className="min-h-screen gradient-masculine">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              Hakkımda
            </h2>
            <p className="text-xl text-gradient-accent max-w-3xl mx-auto">
              Veri bilimi dünyasında sürekli yaratıcı çözümler geliştiren bir uzman
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Personal Story */}
            <div className="space-y-6">
              <div className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-semibold mb-4 text-gradient-steel">
                  {aboutContent.passion?.title || 'Hikayem'}
                </h3>
                <p className="text-gradient-accent leading-relaxed">
                  {aboutContent.passion?.content || 'Veri bilimi ve analitik alanında 3+ yıl deneyime sahip, modern veri teknolojilerinde uzmanlaşmış bir veri analiz uzmanıyım. Veriyi anlamlı içgörülere dönüştürüyor ve karar verme süreçlerini optimize eden çözümler üretiyorum.'}
                </p>
              </div>

              <div className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-2xl font-semibold mb-4 text-gradient-primary">
                  {aboutContent.approach?.title || 'Yaklaşımım'}
                </h3>
                <p className="text-gradient-accent leading-relaxed">
                  {aboutContent.approach?.content || 'Veri toplama ve temizleme aşamasından görselleştirme ve makine öğrenmesine kadar veri analizi sürecinin her aşamasında deneyim sahibiyim. Sürekli öğrenmeyi seviyorum ve veriyi iş değerine dönüştürme konusunda tutkulu bir yaklaşım sergiliyorum.'}
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-6">
              <div className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-2xl font-semibold mb-4 text-gradient-steel">
                  Değerlerim
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="gradient-accent text-foreground border-border">Kalite</Badge>
                    <span className="text-gradient-accent">Her projede mükemmellik arayışı</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="gradient-secondary text-foreground border-border">İnovasyon</Badge>
                    <span className="text-gradient-accent">Yeni teknolojilere açık olmak</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="gradient-primary text-foreground border-border">Sürdürülebilirlik</Badge>
                    <span className="text-gradient-accent">Uzun vadeli çözümler üretmek</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 card-masculine rounded-xl border border-border animate-scale-in" style={{ animationDelay: '0.8s' }}>
                  <div className="text-sm text-gradient-primary font-medium">Hedef Odaklı</div>
                </div>
                <div className="text-center p-4 card-masculine rounded-xl border border-border animate-scale-in" style={{ animationDelay: '1s' }}>
                  <div className="text-sm text-gradient-steel font-medium">Hızlı Çözümler</div>
                </div>
                <div className="text-center p-4 card-masculine rounded-xl border border-border animate-scale-in" style={{ animationDelay: '1.2s' }}>
                  <div className="text-sm text-gradient-accent font-medium">Takım Çalışması</div>
                </div>
                <div className="text-center p-4 card-masculine rounded-xl border border-border animate-scale-in" style={{ animationDelay: '1.4s' }}>
                  <div className="text-sm text-gradient-secondary font-medium">Sürekli Gelişim</div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="card-masculine p-6 text-center rounded-2xl group cursor-pointer animate-scale-in" style={{ animationDelay: `${1.6 + index * 0.1}s` }}>
                <h3 className="text-lg font-semibold mb-2 text-gradient-primary">{item.title}</h3>
                <p className="text-gradient-accent text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;