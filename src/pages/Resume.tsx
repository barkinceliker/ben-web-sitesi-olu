import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin, Calendar, Building } from 'lucide-react';
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

  const getContactInfo = () => {
    const personalInfo = resumeContent.personal_info?.content || 
      'Name: Barkın Çeliker\nEmail: barkinclkr@gmail.com\nPhone: +90 XXX XXX XX XX\nLinkedIn: linkedin.com/in/celikerbarkin\nGitHub: github.com/barkinceliker';
    
    const lines = personalInfo.split('\n');
    const contact = {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: ''
    };

    lines.forEach(line => {
      if (line.includes('Name:')) contact.name = line.replace('Name:', '').trim();
      if (line.includes('Email:')) contact.email = line.replace('Email:', '').trim();
      if (line.includes('Phone:')) contact.phone = line.replace('Phone:', '').trim();
      if (line.includes('LinkedIn:')) contact.linkedin = line.replace('LinkedIn:', '').trim();
      if (line.includes('GitHub:')) contact.github = line.replace('GitHub:', '').trim();
    });

    return contact;
  };

  const contact = getContactInfo();

  return (
    <div className="min-h-screen gradient-masculine">
      <Navbar />
      <div className="pt-20">
        {/* Download Button - More Visible */}
        <div className="text-center mb-6 animate-fade-in">
          {resumeContent.download_link?.file_url ? (
            <Button 
              onClick={() => window.open(resumeContent.download_link.file_url, '_blank')}
              className="btn-masculine px-8 py-4 rounded-full text-lg font-medium"
            >
              <Download className="w-5 h-5 mr-2" />
              📋 CV'mi PDF Olarak İndir
            </Button>
          ) : (
            <p className="text-gradient-accent text-sm">
              PDF indirme linki admin panelinden eklenebilir
            </p>
          )}
        </div>

        {/* Professional CV Layout */}
        <div className="max-w-4xl mx-auto card-masculine shadow-xl rounded-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="gradient-primary text-primary-foreground p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-5xl">📋</span>
                  {contact.name || 'Barkın Çeliker'}
                </h1>
                <p className="text-xl opacity-90">
                  {resumeContent.personal_info?.title || '🛠️ YBS Öğrencisi & Veri Analisti'}
                </p>
              </div>
              <div className="text-right space-y-2 text-sm">
                {contact.email && (
                  <div className="flex items-center justify-end gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center justify-end gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.linkedin && (
                  <div className="flex items-center justify-end gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span>{contact.linkedin}</span>
                  </div>
                )}
                {contact.github && (
                  <div className="flex items-center justify-end gap-2">
                    <Github className="w-4 h-4" />
                    <span>{contact.github}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            
            {/* Summary Section */}
            <section className="animate-fade-in">
              <h2 className="text-2xl font-bold text-gradient-primary mb-4 border-b-2 border-ring pb-2 flex items-center gap-2">
                <span className="text-3xl">📊</span> ÖZET
              </h2>
              <p className="text-gradient-accent leading-relaxed">
                {resumeContent.summary?.content || 
                  'Veri bilimi ve analitik alanında uzmanlaşmış, yaratıcı çözümler üreten ve sürekli öğrenmeyi seven bir öğrenciyim. Modern veri teknolojileri ile işletmeler için değerli içgörüler üretmeye tutkulu bir yaklaşım sergiliyorum.'}
              </p>
            </section>

            <Separator />

            {/* Education Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
                EĞİTİM
              </h2>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>2022 - 2026</span>
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="font-semibold text-lg">
                        {resumeContent.education?.title || 'Yaşar Üniversitesi'}
                      </h3>
                      <p className="text-muted-foreground">
                        {resumeContent.education?.content || 'Yönetim Bilişim Sistemleri\nİzmir, Türkiye'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Experience Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
                DENEYİM
              </h2>
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>2023 - Devam</span>
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">Freelance Veri Analisti</h3>
                      </div>
                      <div className="whitespace-pre-line text-muted-foreground">
                        {resumeContent.experience?.content || 
                          '• Python, Excel ve Tableau ile veri analizi\n• İş zekası raporları hazırlama\n• KPI dashboard geliştirme'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Skills Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 border-b-2 border-primary pb-2">
                YETKİNLİKLER
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-primary">Teknik Yetenekler</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">SQL</Badge>
                      <Badge variant="secondary">Excel</Badge>
                      <Badge variant="secondary">Tableau</Badge>
                      <Badge variant="secondary">Power BI</Badge>
                      <Badge variant="secondary">R</Badge>
                      <Badge variant="secondary">SPSS</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-primary">Kişisel Yetenekler</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Analitik Düşünme</Badge>
                      <Badge variant="outline">Problem Çözme</Badge>
                      <Badge variant="outline">Takım Çalışması</Badge>
                      <Badge variant="outline">İletişim</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {resumeContent.skills?.content && (
                <div className="mt-4 whitespace-pre-line text-muted-foreground">
                  {resumeContent.skills.content}
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;