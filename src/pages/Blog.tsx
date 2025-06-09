import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen gradient-masculine">
      <Navbar />
      {/* Header */}
      <header className="py-8 px-6 border-b border-border pt-24">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button className="btn-masculine">
              <span className="mr-2">⬅️</span>
              🏠 Ana Sayfa
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gradient-primary flex items-center gap-2">
            <span className="text-4xl">📝</span> Blog & Makaleler
          </h1>
          <div></div>
        </div>
      </header>

      {/* Blog Posts */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-gradient-steel flex items-center justify-center gap-3">
              <span className="text-5xl">📝</span> Teknoloji & Geliştirme
            </h2>
            <p className="text-xl text-gradient-accent max-w-2xl mx-auto">
              Web geliştirme, yeni teknolojiler ve en iyi uygulamalar hakkındaki makalelerim
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {postsToShow.map((post, index) => (
              <div 
                key={('id' in post ? post.id : index) as string}
                className="card-masculine p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full h-48 rounded-lg gradient-primary mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl opacity-80">📝</div>
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/30 transition-colors"></div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gradient-accent mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">📅</span>
                    {post.publish_date ? formatDate(post.publish_date) : (post.date || 'Tarih yok')}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">⏰</span>
                    {'readTime' in post ? post.readTime : '5 dk'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">👤</span>
                    {'author' in post ? post.author : 'Barkın Çeliker'}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient-steel transition-colors text-gradient-primary">
                  {post.title}
                </h3>
                <p className="text-gradient-accent mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(post.tags || []).map((tag, tagIndex) => (
                    <Badge key={tagIndex} className="gradient-secondary text-foreground border-border text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                  <div className="text-xs text-gradient-steel opacity-0 group-hover:opacity-100 transition-opacity">
                    Devamını oku →
                  </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="gradient-masculine-subtle p-8 rounded-2xl border border-border animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 text-gradient-primary flex items-center justify-center gap-2">
                <span className="text-3xl">🚀</span> Yeni İçerikler İçin Takipte Kalın
              </h3>
              <p className="text-gradient-accent mb-6">
                Web geliştirme dünyasındaki en son trendler ve en iyi uygulamalar hakkında düzenli olarak makaleler paylaşıyorum.
              </p>
              <Button className="btn-masculine px-8 py-3 rounded-full">
                📧 Email Bildirimleri
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;