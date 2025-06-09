import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Calendar, Clock, User, ArrowRight, Linkedin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<Tables<'blog_posts'>[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('publish_date', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const defaultBlogPosts = [
    {
      id: 1,
      title: 'React 18 ile Yeni Özellikler',
      excerpt: 'React 18 ile gelen concurrent features, suspense ve automatic batching gibi yenilikleri keşfedelim.',
      content: `React 18, React ekosisteminde büyük bir dönüm noktası. Bu yazıda React 18'in en önemli özelliklerini inceleyeceğiz...`,
      author: 'Ali',
      date: '2024-01-15',
      readTime: '5 dk',
      tags: ['React', 'JavaScript', 'Frontend'],
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      title: 'TypeScript Best Practices',
      excerpt: 'Modern TypeScript projelerinde uygulanması gereken en iyi pratikleri ve ipuçlarını öğrenin.',
      content: `TypeScript, JavaScript projelerinde tip güvenliği sağlayan güçlü bir dil. Bu yazıda...`,
      author: 'Ali',
      date: '2024-01-10',
      readTime: '7 dk',
      tags: ['TypeScript', 'Best Practices', 'Development'],
      gradient: 'from-green-500 to-blue-500'
    },
    {
      id: 3,
      title: 'Modern CSS Teknikleri',
      excerpt: 'CSS Grid, Flexbox ve CSS Variables kullanarak modern web tasarımı yapmanın yolları.',
      content: `Modern CSS, web tasarımında devrim yaratmış durumda. Bu yazıda en yeni CSS tekniklerini...`,
      author: 'Ali',
      date: '2024-01-05',
      readTime: '6 dk',
      tags: ['CSS', 'Web Design', 'Frontend'],
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const postsToShow = blogPosts.length > 0 ? blogPosts : defaultBlogPosts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

      {/* Header */}
      <header className="py-8 px-6 border-b border-border pt-24 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border">
              Ana Sayfa
            </Button>
          </Link>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Book className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Blog & Makaleler
            </h1>
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Blog Posts */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Teknoloji & Geliştirme
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Veri bilimi, teknoloji trendleri ve en iyi uygulamalar hakkındaki makalelerim. 
              Deneyimlerimi ve öğrendiklerimi sizlerle paylaşıyorum.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {postsToShow.map((post, index) => (
              <div 
                key={('id' in post ? post.id : index) as string}
                className="bg-card border border-border p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full h-48 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 flex items-center justify-center relative overflow-hidden border border-border">
                  <Book className="w-16 h-16 text-primary" />
                  <div className="absolute inset-0 bg-background/10 group-hover:bg-background/20 transition-colors"></div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 bg-muted/50 p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.publish_date ? formatDate(post.publish_date) : (post.date || 'Tarih yok')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {'readTime' in post ? post.readTime : '5 dk'}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {'author' in post ? post.author : 'Barkın Çeliker'}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors text-foreground">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(post.tags || []).map((tag, tagIndex) => (
                    <Badge key={tagIndex} className="bg-secondary text-secondary-foreground border-border text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ArrowRight className="w-3 h-3" />
                    Devamını oku
                  </div>
                  <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    Detaylar için tıkla
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl border border-border animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Book className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Yeni İçerikler İçin Takipte Kalın
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Veri bilimi dünyasındaki en son trendler, teknikler ve en iyi uygulamalar hakkında 
                düzenli olarak makaleler paylaşıyorum. Bilgiyi paylaştıkça çoğalıyor!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open('https://www.linkedin.com/in/celikerbarkin/', '_blank')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn'de Takip Et
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/contact'}
                  className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full font-medium"
                >
                  İletişime Geç
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;