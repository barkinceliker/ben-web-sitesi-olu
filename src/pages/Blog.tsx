import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      {/* Header */}
      <header className="py-8 px-6 border-b border-gray-200 pt-24">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="outline" className="border-purple-400 text-purple-600 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Blog & Articles
          </h1>
          <div></div>
        </div>
      </header>

      {/* Blog Posts */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Technology & Development
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My articles about web development, new technologies and best practices
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {postsToShow.map((post, index) => (
              <Card 
                key={('id' in post ? post.id : index) as string}
                className="bg-gray-50 border-gray-200 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className={`w-full h-48 rounded-lg bg-gradient-to-r ${post.gradient || 'from-purple-500 to-pink-500'} mb-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-6xl opacity-80">📝</div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publish_date ? formatDate(post.publish_date) : (post.date || 'No date')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {'readTime' in post ? post.readTime : '5 min'}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {'author' in post ? post.author : 'Barkın Çeliker'}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(post.tags || []).map((tag, tagIndex) => (
                      <Badge key={tagIndex} className="bg-purple-100 text-purple-800 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                    <div className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more →
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-2xl border border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Stay Tuned for New Content</h3>
              <p className="text-gray-600 mb-6">
                I regularly share articles about the latest trends and best practices in the web development world.
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full">
                Email Notifications
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;