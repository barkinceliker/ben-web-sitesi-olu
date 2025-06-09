import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Github className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Projelerim
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Veri analizi ve veri bilimi alanında tamamladığım projeler. Her proje farklı teknolojiler ve yaklaşımlar kullanarak çeşitli problem alanlarına çözüm getiriyor.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
                <ExternalLink className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Projeler Yükleniyor</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Henüz proje eklenmemiş. Admin panelinden proje ekleyebilirsiniz.
              </p>
              <div className="p-6 bg-muted rounded-lg max-w-md mx-auto">
                <p className="text-sm text-muted-foreground">
                  Bu alanda tamamladığım veri analizi projelerim görüntülenecek.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-full h-48 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 flex items-center justify-center relative overflow-hidden border border-border">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="text-center">
                          <ExternalLink className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
                          <span className="text-muted-foreground font-medium">Proje Görseli</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                       {project.github && (
                        <div 
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-primary hover:text-primary-foreground shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://github.com/barkinceliker?tab=repositories`, '_blank');
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </div>
                      )}
                      {project.demo_url && (
                        <div 
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/80 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-primary hover:text-primary-foreground shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demo_url, '_blank');
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors text-foreground">
                      {project.title}
                    </h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.github && <Github className="w-4 h-4 text-muted-foreground" />}
                      {project.demo_url && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description || 'Bu proje için henüz açıklama eklenmemiş. Detaylar için GitHub linkini ziyaret edebilirsiniz.'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech && project.tech.length > 0 ? (
                      project.tech.map((tech) => (
                        <Badge key={tech} className="bg-secondary text-secondary-foreground border-border text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <Badge className="bg-muted text-muted-foreground border-border text-xs">
                        Teknoloji belirtilmemiş
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      {project.github && (
                        <span className="flex items-center gap-1">
                          <Github className="w-3 h-3" />
                          Kaynak Kod
                        </span>
                      )}
                      {project.demo_url && (
                        <span className="flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Canlı Demo
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      Detaylar için tıkla
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl border border-border">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Yeni Projeler Geliyor
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Sürekli olarak yeni veri analizi ve makine öğrenmesi projeleri üzerinde çalışıyorum. 
                En güncel projelerim için GitHub profilimi takip edebilirsiniz.
              </p>
              <Button
                onClick={() => window.open('https://github.com/barkinceliker?tab=repositories', '_blank')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium flex items-center gap-2 mx-auto"
              >
                <Github className="w-5 h-5" />
                GitHub'da Takip Et
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;