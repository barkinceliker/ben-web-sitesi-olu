import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Coffee, Lightbulb, Users, Target, Heart } from 'lucide-react';
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
      icon: Code,
      title: "Veri Analizi",
      description: "Python, R ve SQL ile kapsamlı veri analizi ve istatistiksel modelleme"
    },
    {
      icon: Coffee,
      title: "Problem Çözme",
      description: "Karmaşık veri problemlerini basit ve etkili çözümlere dönüştürme yeteneği"
    },
    {
      icon: Lightbulb,
      title: "İnovasyon",
      description: "Yeni veri teknolojilerini öğrenme ve projelerimde uygulama konusunda tutku"
    },
    {
      icon: Users,
      title: "Takım Çalışması",
      description: "Ekip çalışması ve agile metodolojilerle verimli proje yönetimi"
    },
    {
      icon: Target,
      title: "Hedef Odaklı",
      description: "Hedef odaklı yaklaşım ve deadline'ları karşılama konusunda başarı"
    },
    {
      icon: Heart,
      title: "Tutku",
      description: "Veri bilimine olan tutkum sayesinde sürekli gelişim"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hakkımda
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veri bilimi dünyasında kendimi sürekli geliştiren, yaratıcı çözümler üreten bir analiz uzmanı
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Personal Story */}
            <div className="space-y-6">
              <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-600">
                    {aboutContent.passion?.subtitle || '🚀'} {aboutContent.passion?.title || 'Hikayem'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {aboutContent.passion?.content || 'Veri bilimi ve analitik alanında 3+ yıllık deneyimle modern veri teknolojileri konusunda uzmanlaşmış bir analiz uzmanıyım. Verileri anlamlı içgörülere dönüştürerek, karar verme süreçlerini optimize eden çözümler üretiyorum.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                    {aboutContent.approach?.subtitle || '💡'} {aboutContent.approach?.title || 'Yaklaşımım'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {aboutContent.approach?.content || 'Veri toplama ve temizlemeden görselleştirme ve makine öğrenmesine kadar veri analizi sürecinin her aşamasında deneyim sahibiyim. Sürekli öğrenmeyi seven ve veriyi iş değerine dönüştürmek için kullanan biriyim.'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values */}
            <div className="space-y-6">
              <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-600">Değerlerim</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-100 text-purple-800">Kalite</Badge>
                      <span className="text-gray-700">Her projede mükemmellik arayışı</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-800">İnovasyon</Badge>
                      <span className="text-gray-700">Yeni teknolojilere açık olmak</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-pink-100 text-pink-800">Sürdürülebilirlik</Badge>
                      <span className="text-gray-700">Uzun vadeli çözümler üretmek</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm text-purple-600 font-medium">Hedef Odaklı</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-sm text-purple-600 font-medium">Hızlı Çözüm</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-2">🤝</div>
                  <div className="text-sm text-purple-600 font-medium">Takım Çalışması</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-sm text-purple-600 font-medium">Sürekli Gelişim</div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;