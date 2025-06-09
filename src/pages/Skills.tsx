import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
      icon: "📊",
      gradient: "from-blue-500 to-purple-500",
      skills: [
        { name: "Python", level: 95, description: "Pandas, NumPy, SciPy" },
        { name: "R", level: 85, description: "Statistical analysis, ggplot2" },
        { name: "SQL", level: 90, description: "Complex queries, Optimization" },
        { name: "Excel/VBA", level: 85, description: "Advanced formulas, Macros" }
      ]
    },
    {
      title: "Machine Learning & AI",
      icon: "🤖",
      gradient: "from-green-500 to-blue-500",
      skills: [
        { name: "Scikit-learn", level: 90, description: "Classification, Regression" },
        { name: "TensorFlow", level: 85, description: "Deep learning, Neural networks" },
        { name: "Keras", level: 80, description: "High-level neural networks" },
        { name: "XGBoost", level: 85, description: "Gradient boosting" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technologies I use in data analysis and data science and my expertise levels
            </p>
          </div>

          {/* Skills from Database */}
          {Object.keys(skillsByCategory).length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <Card key={category} className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                        {categorySkills[0]?.icon || '💻'}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="text-gray-900 font-medium">{skill.name}</span>
                              {skill.description && (
                                <p className="text-gray-600 text-xs">{skill.description}</p>
                              )}
                            </div>
                            <Badge className="bg-purple-100 text-purple-800 text-xs">
                              {skill.level}%
                            </Badge>
                          </div>
                          <Progress 
                            value={skill.level} 
                            className="h-2 bg-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Default skills if database is empty
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {defaultSkillCategories.map((category, index) => (
                <Card key={index} className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center text-2xl`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="text-gray-900 font-medium">{skill.name}</span>
                              <p className="text-gray-600 text-xs">{skill.description}</p>
                            </div>
                            <Badge className="bg-purple-100 text-purple-800 text-xs">
                              {skill.level}%
                            </Badge>
                          </div>
                          <Progress 
                            value={skill.level} 
                            className="h-2 bg-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Skills Summary */}
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Continuous Learning</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                I continuously learn new technologies and improve my existing skills to keep up with the rapidly changing nature of the data science world. The new things I learn in each project make me a better analysis specialist.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-purple-200 text-purple-800">Open to Learning</Badge>
                <Badge className="bg-blue-200 text-blue-800">Problem Solving</Badge>
                <Badge className="bg-pink-200 text-pink-800">Team Work</Badge>
                <Badge className="bg-green-200 text-green-800">Adaptation</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Skills;