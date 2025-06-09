import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Building } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional development and work experiences
            </p>
          </div>

          <div className="space-y-8">
            {experiencesToShow.map((exp, index) => (
              <Card key={('id' in exp ? exp.id : index) as string} className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                      <Building className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{exp.position}</h3>
                          <h4 className="text-lg font-semibold text-purple-600 mb-2">{exp.company}</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                          {exp.is_current && (
                            <Badge className="bg-green-100 text-green-800 self-start">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          <span>
                            {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Current'}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {exp.description && (
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {experiences.length === 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-600">
                More experience will be loaded from the database. You can add experience from the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Experience;