import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  LogOut, 
  Settings,
  FileText,
  Code,
  User
} from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Mock data - gerçek uygulamada Supabase'den gelecek
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Ticaret Platformu',
      description: 'Modern React ve Node.js ile geliştirilmiş full-stack e-ticaret uygulaması',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/barkinceliker/ecommerce-platform'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Takım işbirliği için geliştirilmiş proje yönetim aracı',
      tech: ['TypeScript', 'Express', 'PostgreSQL'],
      github: 'https://github.com/barkinceliker/task-management'
    }
  ]);

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: 'React ile Modern Web Geliştirme',
      content: 'React kullanarak modern web uygulamaları geliştirme rehberi...',
      publishDate: '2024-01-15',
      isPublished: true
    },
    {
      id: 2,
      title: 'TypeScript Temelleri',
      content: 'TypeScript ile güvenli kod yazma teknikleri...',
      publishDate: '2024-01-10',
      isPublished: false
    }
  ]);

  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Basit demo login - gerçek uygulamada Supabase auth kullanılacak
    if (email === 'barkinclkr@gmail.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Geçersiz email veya şifre');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(blogPosts.filter(p => p.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-purple-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Admin Paneli
            </CardTitle>
            <p className="text-gray-300">Giriş yapın</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-purple-500/20 text-white"
                  placeholder="barkinclkr@gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-purple-500/20 text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
              {loginError && (
                <p className="text-red-400 text-sm">{loginError}</p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Giriş Yap
              </Button>
            </form>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-200 text-xs">
                Demo: barkinclkr@gmail.com / admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold">Admin Paneli</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm text-gray-300">Barkın Çeliker</span>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm"
              className="border-red-400 text-red-300 hover:bg-red-400/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-500/30">
              <Code className="w-4 h-4 mr-2" />
              Projeler
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-purple-500/30">
              <FileText className="w-4 h-4 mr-2" />
              Blog Yazıları
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Projeler</h2>
              <Button 
                onClick={() => setEditingProject({ id: null, title: '', description: '', tech: [], github: '' })}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Proje
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} className="bg-purple-500/20 text-purple-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingProject(project)}
                        className="border-blue-400 text-blue-200 hover:bg-blue-400/20"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteProject(project.id)}
                        className="border-red-400 text-red-200 hover:bg-red-400/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Blog Yazıları</h2>
              <Button 
                onClick={() => setEditingBlog({ id: null, title: '', content: '', publishDate: '', isPublished: false })}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Yazı
              </Button>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{post.title}</h3>
                          <Badge className={post.isPublished ? "bg-green-500/20 text-green-200" : "bg-yellow-500/20 text-yellow-200"}>
                            {post.isPublished ? 'Yayınlandı' : 'Taslak'}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{post.content.substring(0, 100)}...</p>
                        <p className="text-gray-400 text-xs">{post.publishDate}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEditingBlog(post)}
                          className="border-blue-400 text-blue-200 hover:bg-blue-400/20"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteBlogPost(post.id)}
                          className="border-red-400 text-red-200 hover:bg-red-400/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Supabase Uyarısı */}
      <div className="fixed bottom-4 right-4 max-w-sm">
        <Card className="bg-yellow-500/10 border border-yellow-500/20">
          <CardContent className="p-4">
            <p className="text-yellow-200 text-xs">
              ⚠️ Bu demo admin paneli. Gerçek CRUD işlemleri için Supabase bağlantısı gerekiyor.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;