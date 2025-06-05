import { useState, useEffect } from 'react';
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
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    demo_url: '',
    image_url: ''
  });
  
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    is_published: false,
    publish_date: ''
  });

  // Fetch data from Supabase
  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Hata", description: "Projeler yüklenemedi", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  const fetchBlogPosts = async () => {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Hata", description: "Blog yazıları yüklenemedi", variant: "destructive" });
    } else {
      setBlogPosts(data || []);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
      fetchBlogPosts();
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'barkinclkr@gmail.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
      toast({ title: "Başarılı", description: "Giriş yapıldı!" });
    } else {
      setLoginError('Geçersiz email veya şifre');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setProjects([]);
    setBlogPosts([]);
  };

  // Project CRUD operations
  const saveProject = async () => {
    setLoading(true);
    const projectData = {
      ...projectForm,
      tech: projectForm.tech.split(',').map(t => t.trim()).filter(t => t)
    };

    let result;
    if (editingProject?.id) {
      result = await supabase.from('projects').update(projectData).eq('id', editingProject.id);
    } else {
      result = await supabase.from('projects').insert([projectData]);
    }

    if (result.error) {
      toast({ title: "Hata", description: "Proje kaydedilemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Proje kaydedildi!" });
      setEditingProject(null);
      setProjectForm({ title: '', description: '', tech: '', github: '', demo_url: '', image_url: '' });
      fetchProjects();
    }
    setLoading(false);
  };

  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      toast({ title: "Hata", description: "Proje silinemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Proje silindi!" });
      fetchProjects();
    }
  };

  const editProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
      github: project.github || '',
      demo_url: project.demo_url || '',
      image_url: project.image_url || ''
    });
  };

  // Blog CRUD operations
  const saveBlogPost = async () => {
    setLoading(true);
    const blogData = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    let result;
    if (editingBlog?.id) {
      result = await supabase.from('blog_posts').update(blogData).eq('id', editingBlog.id);
    } else {
      result = await supabase.from('blog_posts').insert([blogData]);
    }

    if (result.error) {
      toast({ title: "Hata", description: "Blog yazısı kaydedilemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Blog yazısı kaydedildi!" });
      setEditingBlog(null);
      setBlogForm({ title: '', content: '', excerpt: '', tags: '', is_published: false, publish_date: '' });
      fetchBlogPosts();
    }
    setLoading(false);
  };

  const deleteBlogPost = async (id) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) {
      toast({ title: "Hata", description: "Blog yazısı silinemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Blog yazısı silindi!" });
      fetchBlogPosts();
    }
  };

  const editBlogPost = (post) => {
    setEditingBlog(post);
    setBlogForm({
      title: post.title || '',
      content: post.content || '',
      excerpt: post.excerpt || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      is_published: post.is_published || false,
      publish_date: post.publish_date || ''
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center px-6">
        <Navbar />
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
      <Navbar />
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-lg mt-16">
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
                onClick={() => {
                  setEditingProject({ id: null });
                  setProjectForm({ title: '', description: '', tech: '', github: '', demo_url: '', image_url: '' });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Proje
              </Button>
            </div>

            {/* Project Form */}
            {editingProject && (
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{editingProject.id ? 'Proje Düzenle' : 'Yeni Proje'}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProject(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Başlık</Label>
                      <Input
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="Proje başlığı"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-200">GitHub URL</Label>
                      <Input
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Açıklama</Label>
                    <Textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white min-h-20"
                      placeholder="Proje açıklaması"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Teknolojiler (virgülle ayırın)</Label>
                      <Input
                        value={projectForm.tech}
                        onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-200">Demo URL</Label>
                      <Input
                        value={projectForm.demo_url}
                        onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="https://demo.example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Görsel URL</Label>
                    <Input
                      value={projectForm.image_url}
                      onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <Button 
                    onClick={saveProject}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Project List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Henüz proje eklenmemiş</p>
                </div>
              ) : (
                projects.map((project) => (
                  <Card key={project.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Array.isArray(project.tech) && project.tech.map((tech) => (
                          <Badge key={tech} className="bg-purple-500/20 text-purple-200">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => editProject(project)}
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
                ))
              )}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Blog Yazıları</h2>
              <Button 
                onClick={() => {
                  setEditingBlog({ id: null });
                  setBlogForm({ title: '', content: '', excerpt: '', tags: '', is_published: false, publish_date: '' });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Yeni Yazı
              </Button>
            </div>

            {/* Blog Form */}
            {editingBlog && (
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{editingBlog.id ? 'Blog Düzenle' : 'Yeni Blog Yazısı'}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingBlog(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Başlık</Label>
                    <Input
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white"
                      placeholder="Blog yazısı başlığı"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Özet</Label>
                    <Textarea
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white min-h-20"
                      placeholder="Kısa özet"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">İçerik</Label>
                    <Textarea
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white min-h-40"
                      placeholder="Blog yazısı içeriği"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Etiketler (virgülle ayırın)</Label>
                      <Input
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="React, JavaScript, Web"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-200">Yayın Tarihi</Label>
                      <Input
                        type="date"
                        value={blogForm.publish_date}
                        onChange={(e) => setBlogForm({ ...blogForm, publish_date: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={blogForm.is_published}
                      onChange={(e) => setBlogForm({ ...blogForm, is_published: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-white/10 border-purple-500/20 rounded"
                    />
                    <Label htmlFor="published" className="text-gray-200">Yayınla</Label>
                  </div>
                  <Button 
                    onClick={saveBlogPost}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Blog List */}
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Henüz blog yazısı eklenmemiş</p>
                </div>
              ) : (
                blogPosts.map((post) => (
                  <Card key={post.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <Badge className={post.is_published ? "bg-green-500/20 text-green-200" : "bg-yellow-500/20 text-yellow-200"}>
                              {post.is_published ? 'Yayınlandı' : 'Taslak'}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{post.excerpt || (post.content && post.content.substring(0, 100) + '...')}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{post.publish_date}</span>
                            {Array.isArray(post.tags) && post.tags.length > 0 && (
                              <div className="flex gap-1">
                                {post.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => editBlogPost(post)}
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
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Success Indicator */}
        <div className="fixed bottom-4 right-4 max-w-sm">
          <Card className="bg-green-500/10 border border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <p className="text-green-200 text-xs">
                  Supabase bağlantısı aktif - Gerçek veriler kullanılıyor
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;