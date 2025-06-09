import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Code, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const Skills = () => {
  const [skills, setSkills] = useState<Tables<'skills'>[]>([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching skills:', error);
        return;
      }

      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Tables<'skills'>[]>);

  const defaultSkillCategories = [
    {
      title: "Data Analysis & Statistics",
      skills: [
        { name: "Python", level: 95, description: "Pandas, NumPy, SciPy" },
        { name: "R", level: 85, description: "Statistical analysis, ggplot2" },
        { name: "SQL", level: 90, description: "Complex queries, Optimization" },
        { name: "Excel/VBA", level: 85, description: "Advanced formulas, Macros" }
      ]
    },
    {
      title: "Machine Learning & AI",
      skills: [
        { name: "Scikit-learn", level: 90, description: "Classification, Regression" },
        { name: "TensorFlow", level: 85, description: "Deep learning, Neural networks" },
        { name: "Keras", level: 80, description: "High-level neural networks" },
        { name: "XGBoost", level: 85, description: "Gradient boosting" }
      ]
    }
  ];

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
                <Award className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Beceriler & Teknolojiler
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Veri analizi ve veri biliminde kullandığım teknolojiler ve uzmanlık seviyelerim. 
              Her teknolojide sürekli gelişim göstermeye devam ediyorum.
            </p>
          </div>

          {/* Skills from Database */}
          {Object.keys(skillsByCategory).length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
                <div key={category} className="bg-card border border-border p-8 rounded-2xl animate-fade-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      {category.toLowerCase().includes('data') ? <Database className="w-6 h-6 text-primary" /> : 
                       category.toLowerCase().includes('machine') ? <Code className="w-6 h-6 text-primary" /> : 
                       <Award className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                      <p className="text-sm text-muted-foreground">{categorySkills.length} teknoloji</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="group p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-foreground font-medium">{skill.name}</span>
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                {skill.level}%
                              </Badge>
                            </div>
                            {skill.description && (
                              <p className="text-muted-foreground text-sm">{skill.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Progress 
                            value={skill.level} 
                            className="h-3 bg-muted"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Başlangıç</span>
                            <span>Uzman</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Default skills if database is empty
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {defaultSkillCategories.map((category, index) => (
                <div key={index} className="bg-card border border-border p-8 rounded-2xl animate-fade-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      {category.title.toLowerCase().includes('data') ? <Database className="w-6 h-6 text-primary" /> : 
                       category.title.toLowerCase().includes('machine') ? <Code className="w-6 h-6 text-primary" /> : 
                       <Award className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.skills.length} teknoloji</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-foreground font-medium">{skill.name}</span>
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                {skill.level}%
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{skill.description}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Progress 
                            value={skill.level} 
                            className="h-3 bg-muted"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Başlangıç</span>
                            <span>Uzman</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Summary */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center rounded-2xl border border-border animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Sürekli Öğrenme & Gelişim
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Veri bilimi dünyasının hızla değişen doğasına ayak uydurabilmek için sürekli yeni teknolojiler öğreniyor 
              ve mevcut becerilerimi geliştiriyorum. Her projede öğrendiğim yeni şeyler beni daha iyi bir analiz uzmanı yapıyor.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <div className="text-center p-3 bg-background rounded-lg border border-border">
                <div className="text-sm font-medium text-foreground">Öğrenmeye Açık</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border border-border">
                <div className="text-sm font-medium text-foreground">Problem Çözme</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border border-border">
                <div className="text-sm font-medium text-foreground">Takım Çalışması</div>
              </div>
              <div className="text-center p-3 bg-background rounded-lg border border-border">
                <div className="text-sm font-medium text-foreground">Adaptasyon</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;