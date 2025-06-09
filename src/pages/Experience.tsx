import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const Experience = () => {
  const [experiences, setExperiences] = useState<Tables<'experience'>[]>([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        console.error('Error fetching experiences:', error);
        return;
      }

      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const defaultExperiences = [
    {
      company: "Yasar University",
      position: "MIS Student",
      start_date: "2022-09-01",
      end_date: null,
      is_current: true,
      description: "I am studying in the field of Management Information Systems. I specialize in data analysis, business intelligence and system analysis.",
      location: "Izmir, Turkey"
    },
    {
      company: "Freelance",
      position: "Data Analyst",
      start_date: "2023-01-01",
      end_date: null,
      is_current: true,
      description: "I conduct data analysis projects for small and medium-sized businesses. I provide data visualization and reporting services using Excel, Python and Tableau.",
      location: "Remote"
    }
  ];

  const experiencesToShow = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-muted rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary rounded-full blur-3xl opacity-25"></div>
      </div>

      <section className="py-20 px-6 pt-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Profesyonel Deneyim
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Akademik ve profesyonel gelişim sürecimde edindiğim deneyimler ve başarılar
            </p>
          </div>

          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border"></div>
            
            <div className="space-y-12">
              {experiencesToShow.map((exp, index) => (
                <div key={('id' in exp ? exp.id : index) as string} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg"></div>
                  
                  <div className="ml-16">
                    <div className="bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Building className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{exp.position}</h3>
                            <h4 className="text-xl font-semibold text-muted-foreground mb-2">{exp.company}</h4>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Güncel'}
                                </span>
                              </div>
                              {exp.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{exp.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {exp.is_current && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 self-start">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                              Güncel Pozisyon
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {exp.description && (
                        <div className="border-t border-border pt-6">
                          <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {experiences.length === 0 && (
            <div className="text-center mt-12 animate-fade-in">
              <div className="bg-muted p-8 rounded-lg max-w-md mx-auto">
                <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Deneyimler Yükleniyor</h3>
                <p className="text-muted-foreground text-sm">
                  Daha fazla deneyim veritabanından yüklenecek. Admin panelinden deneyim ekleyebilirsiniz.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Experience;