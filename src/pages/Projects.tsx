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
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Projects I have completed in the field of data analysis and data science
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No projects have been added yet. You can add projects from the admin panel.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className={`w-full h-48 rounded-lg bg-gradient-to-r ${gradients[index % gradients.length]} mb-6 flex items-center justify-center relative overflow-hidden`}>
                      {project.image_url ? (
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Code className="w-16 h-16 text-white opacity-80" />
                      )}
                      <div className="absolute top-4 right-4 flex gap-2">
                         {project.github && (
                          <div 
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://github.com/barkinceliker?tab=repositories`, '_blank');
                            }}
                          >
                            <Github className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {project.demo_url && (
                          <div 
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.demo_url, '_blank');
                            }}
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {project.description || 'No description added'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech && project.tech.length > 0 ? (
                        project.tech.map((tech) => (
                          <Badge key={tech} className="bg-purple-100 text-purple-800 text-xs">
                            {tech}
                          </Badge>
                        ))
                      ) : (
                        <Badge className="bg-gray-200 text-gray-600 text-xs">
                          No technology specified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      {project.github && (
                        <div className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <Github className="w-3 h-3" />
                          GitHub
                        </div>
                      )}
                      {project.demo_url && (
                        <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Demo
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;