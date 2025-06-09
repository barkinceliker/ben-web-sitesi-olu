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
    <div className="min-h-screen gradient-masculine">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              Beceriler & Teknolojiler
            </h2>
            <p className="text-xl text-gradient-accent max-w-3xl mx-auto">
              Veri analizi ve veri biliminde kullandığım teknolojiler ve uzmanlık seviyelerim
            </p>
          </div>

          {/* Skills from Database */}
          {Object.keys(skillsByCategory).length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
                <div key={category} className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                      {category.toLowerCase().includes('data') ? <Database className="w-5 h-5" /> : 
                       category.toLowerCase().includes('machine') ? <Code className="w-5 h-5" /> : 
                       <Award className="w-5 h-5" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gradient-primary">{category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-gradient-steel font-medium">{skill.name}</span>
                            {skill.description && (
                              <p className="text-gradient-accent text-xs">{skill.description}</p>
                            )}
                          </div>
                          <Badge className="gradient-secondary text-foreground border-border text-xs">
                            {skill.level}%
                          </Badge>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2 bg-border"
                        />
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
                <div key={index} className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                      {category.title.toLowerCase().includes('data') ? <Database className="w-5 h-5" /> : 
                       category.title.toLowerCase().includes('machine') ? <Code className="w-5 h-5" /> : 
                       <Award className="w-5 h-5" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gradient-primary">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-gradient-steel font-medium">{skill.name}</span>
                            <p className="text-gradient-accent text-xs">{skill.description}</p>
                          </div>
                          <Badge className="gradient-secondary text-foreground border-border text-xs">
                            {skill.level}%
                          </Badge>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2 bg-border"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Summary */}
          <div className="gradient-masculine-subtle p-8 text-center rounded-2xl border border-border animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
              Sürekli Öğrenme
            </h3>
            <p className="text-gradient-accent mb-6 max-w-2xl mx-auto">
              Veri bilimi dünyasının hızla değişen doğasına ayak uydurabilmek için sürekli yeni teknolojiler öğreniyor ve mevcut becerilerimi geliştiriyorum. Her projede öğrendiğim yeni şeyler beni daha iyi bir analiz uzmanı yapıyor.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="gradient-primary text-foreground border-border">Öğrenmeye Açık</Badge>
              <Badge className="gradient-secondary text-foreground border-border">Problem Çözme</Badge>
              <Badge className="gradient-accent text-foreground border-border">Takım Çalışması</Badge>
              <Badge className="gradient-masculine text-foreground border-border">Adaptasyon</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;