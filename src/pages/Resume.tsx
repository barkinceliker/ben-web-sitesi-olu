import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, User, GraduationCap, Briefcase, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const Resume = () => {
  const [resumeContent, setResumeContent] = useState<{[key: string]: Tables<'resume'>}>({});

  useEffect(() => {
    fetchResumeContent();
  }, []);

  const fetchResumeContent = async () => {
    try {
      const { data, error } = await supabase
        .from('resume')
        .select('*');

      if (error) {
        console.error('Error fetching resume content:', error);
        return;
      }

      const contentMap: {[key: string]: Tables<'resume'>} = {};
      data?.forEach(item => {
        contentMap[item.section_key] = item;
      });
      setResumeContent(contentMap);
    } catch (error) {
      console.error('Error fetching resume content:', error);
    }
  };

  const resumeSections = [
    {
      key: 'personal_info',
      icon: User,
      title: 'Kişisel Bilgiler',
      defaultContent: 'Ad: Barkın Çeliker\nE-posta: barkinclkr@gmail.com\nTelefon: +90 XXX XXX XX XX\nLinkedIn: linkedin.com/in/celikerbarkin\nGitHub: github.com/barkinceliker'
    },
    {
      key: 'education',
      icon: GraduationCap,
      title: 'Eğitim',
      defaultContent: 'Yaşar Üniversitesi\nYönetim Bilişim Sistemleri\n2022 - 2026 (Devam Ediyor)\nİzmir, Türkiye'
    },
    {
      key: 'experience',
      icon: Briefcase,
      title: 'Deneyim',
      defaultContent: 'Freelance Veri Analisti\n2023 - Devam Ediyor\n• Python, Excel ve Tableau ile veri analizi\n• İş zekası raporları hazırlama\n• KPI dashboard geliştirme'
    },
    {
      key: 'skills',
      icon: Award,
      title: 'Beceriler',
      defaultContent: 'Teknik Beceriler:\n• Python (Pandas, NumPy, Matplotlib)\n• SQL (PostgreSQL, MySQL)\n• Excel (VBA, Pivot Tables)\n• Tableau, Power BI\n• R, SPSS\n\nKişisel Beceriler:\n• Analitik düşünme\n• Problem çözme\n• Takım çalışması\n• İletişim becerileri'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CV / Özgeçmiş
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Profesyonel deneyimlerim ve becerilerim hakkında detaylı bilgiler
            </p>
            
            {resumeContent.download_link?.file_url && (
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => window.open(resumeContent.download_link.file_url, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                CV İndir
              </Button>
            )}
          </div>

          <div className="space-y-8">
            {resumeSections.map((section) => {
              const content = resumeContent[section.key];
              const Icon = section.icon;
              
              return (
                <Card key={section.key} className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {content?.title || section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {content?.content || section.defaultContent}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Resume Info */}
          <Card className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {resumeContent.summary?.title || 'Özet'}
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                {resumeContent.summary?.content || 'Veri analizi ve bilimi alanında uzmanlaşan, yaratıcı çözümler üreten ve sürekli öğrenmeyi seven bir öğrenciyim. Modern veri teknolojileri ile işletmelere değer katan içgörüler üretme konusunda tutkulu bir yaklaşım sergilerim.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-purple-200 text-purple-800">Veri Analizi</Badge>
                <Badge className="bg-blue-200 text-blue-800">Business Intelligence</Badge>
                <Badge className="bg-pink-200 text-pink-800">Machine Learning</Badge>
                <Badge className="bg-green-200 text-green-800">Veri Görselleştirme</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Resume;