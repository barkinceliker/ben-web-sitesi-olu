import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen gradient-masculine">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary flex items-center justify-center gap-3">
              <span className="text-5xl">🏢</span> Deneyim
            </h2>
            <p className="text-xl text-gradient-accent max-w-3xl mx-auto">
              Profesyonel gelişimim ve iş deneyimlerim
            </p>
          </div>

          <div className="space-y-8">
            {experiencesToShow.map((exp, index) => (
              <div key={('id' in exp ? exp.id : index) as string} className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gradient-primary mb-1">{exp.position}</h3>
                        <h4 className="text-lg font-semibold text-gradient-steel mb-2">{exp.company}</h4>
                      </div>
                      <div className="flex flex-col gap-2">
                        {exp.is_current && (
                          <Badge className="gradient-accent text-foreground border-border self-start">
                            Güncel
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gradient-accent">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📅</span>
                        <span>
                          {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Güncel'}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">📍</span>
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                    
                    {exp.description && (
                      <p className="text-gradient-accent leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {experiences.length === 0 && (
            <div className="text-center mt-12 animate-fade-in">
              <div className="text-6xl mb-4"><span>⚡</span></div>
              <p className="text-gradient-accent">
                Daha fazla deneyim veritabanından yüklenecek. Admin panelinden deneyim ekleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Experience;