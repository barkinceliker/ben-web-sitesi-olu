import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const skillCategories = [
    {
      title: "Veri Analizi & İstatistik",
      icon: "📊",
      gradient: "from-blue-500 to-purple-500",
      skills: [
        { name: "Python", level: 95, description: "Pandas, NumPy, SciPy" },
        { name: "R", level: 85, description: "Statistical analysis, ggplot2" },
        { name: "SQL", level: 90, description: "Complex queries, Optimization" },
        { name: "Excel/VBA", level: 85, description: "Advanced formulas, Macros" },
        { name: "SPSS", level: 75, description: "Statistical software" },
        { name: "Stata", level: 70, description: "Econometric analysis" }
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
        { name: "XGBoost", level: 85, description: "Gradient boosting" },
        { name: "NLTK/spaCy", level: 75, description: "Natural Language Processing" },
        { name: "OpenCV", level: 70, description: "Computer vision" }
      ]
    },
    {
      title: "Veri Görselleştirme",
      icon: "📈",
      gradient: "from-purple-500 to-pink-500",
      skills: [
        { name: "Tableau", level: 85, description: "Business intelligence dashboards" },
        { name: "Power BI", level: 80, description: "Microsoft analytics platform" },
        { name: "Plotly", level: 90, description: "Interactive visualizations" },
        { name: "Matplotlib/Seaborn", level: 95, description: "Python visualization" },
        { name: "D3.js", level: 75, description: "Web-based visualizations" },
        { name: "Grafana", level: 70, description: "Monitoring dashboards" }
      ]
    },
    {
      title: "Veritabanı & Big Data",
      icon: "💾",
      gradient: "from-pink-500 to-red-500",
      skills: [
        { name: "PostgreSQL", level: 90, description: "Advanced SQL, Optimization" },
        { name: "MongoDB", level: 80, description: "NoSQL, Aggregation" },
        { name: "Apache Spark", level: 75, description: "Big data processing" },
        { name: "Hadoop", level: 70, description: "Distributed computing" },
        { name: "Redis", level: 75, description: "In-memory data structure" },
        { name: "Snowflake", level: 65, description: "Cloud data warehouse" }
      ]
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2024",
      badge: "☁️"
    },
    {
      title: "React Developer Certificate",
      issuer: "Meta",
      year: "2023",
      badge: "⚛️"
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      year: "2023",
      badge: "📜"
    }
  ];

  return (
    <section className="py-20 px-6" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Beceriler & Teknolojiler
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Modern web geliştirme alanında kullandığım teknolojiler ve uzmanlık seviyelerim
          </p>
        </div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-white font-medium">{skill.name}</span>
                          <p className="text-gray-400 text-xs">{skill.description}</p>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-200 text-xs">
                          {skill.level}%
                        </Badge>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2 bg-gray-700/50"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-purple-300">
            Sertifikalar & Başarılar
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300 hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{cert.badge}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{cert.title}</h4>
                  <p className="text-purple-300 mb-1">{cert.issuer}</p>
                  <Badge className="bg-purple-500/20 text-purple-200 text-xs">{cert.year}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Sürekli Öğrenme</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Teknoloji dünyasının hızla değişen doğasına ayak uydurmak için sürekli yeni teknolojiler 
              öğreniyor ve mevcut becerilerimi geliştiriyorum. Her projede öğrendiğim yeni şeyler 
              beni daha iyi bir geliştirici yapıyor.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-purple-500/30 text-purple-200">Öğrenmeye Açık</Badge>
              <Badge className="bg-blue-500/30 text-blue-200">Problem Çözme</Badge>
              <Badge className="bg-pink-500/30 text-pink-200">Takım Çalışması</Badge>
              <Badge className="bg-green-500/30 text-green-200">Adaptasyon</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;