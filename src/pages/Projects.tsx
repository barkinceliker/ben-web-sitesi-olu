import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Code } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const Projects = () => {
  const [projects, setProjects] = useState<Tables<'projects'>[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const gradients = [
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-cyan-500 to-blue-500'
  ];

  return (
    <div className="min-h-screen gradient-masculine">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary flex items-center justify-center gap-3">
              <span className="text-5xl emoji-gradient-projects">⚙️</span> Projelerim
            </h2>
            <p className="text-xl text-gradient-accent max-w-3xl mx-auto">
              Veri analizi ve veri bilimi alanında tamamladığım projeler
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="text-6xl mb-4"><span className="emoji-gradient-projects">🛠️</span></div>
              <p className="text-gradient-accent text-lg">
                Henüz proje eklenmemiş. Admin panelinden proje ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="card-masculine p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-full h-48 rounded-lg gradient-primary mb-6 flex items-center justify-center relative overflow-hidden">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl opacity-80 emoji-gradient-projects">⚙️</span>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                       {project.github && (
                        <div 
                          className="opacity-0 group-hover:opacity-100 transition-opacity gradient-accent backdrop-blur-sm rounded-full p-2 cursor-pointer hover:gradient-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://github.com/barkinceliker?tab=repositories`, '_blank');
                          }}
                        >
                          <Github className="w-4 h-4 text-foreground" />
                        </div>
                      )}
                      {project.demo_url && (
                        <div 
                          className="opacity-0 group-hover:opacity-100 transition-opacity gradient-accent backdrop-blur-sm rounded-full p-2 cursor-pointer hover:gradient-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demo_url, '_blank');
                          }}
                        >
                          <ExternalLink className="w-4 h-4 text-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient-steel transition-colors text-gradient-primary">
                    {project.title}
                  </h3>
                  <p className="text-gradient-accent mb-4 text-sm leading-relaxed">
                    {project.description || 'Açıklama eklenmemiş'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech && project.tech.length > 0 ? (
                      project.tech.map((tech) => (
                        <Badge key={tech} className="gradient-secondary text-foreground border-border text-xs">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <Badge className="gradient-accent text-foreground border-border text-xs">
                        Teknoloji belirtilmemiş
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    {project.github && (
                      <div className="text-xs text-gradient-steel opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <Github className="w-3 h-3" />
                        GitHub
                      </div>
                    )}
                    {project.demo_url && (
                      <div className="text-xs text-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;