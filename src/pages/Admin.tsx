import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import AdminResumeSection from '@/components/admin/AdminResumeSection';

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [aboutContent, setAboutContent] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resume, setResume] = useState([]);
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingAbout, setEditingAbout] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingResume, setEditingResume] = useState(null);

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

  const [aboutForm, setAboutForm] = useState({
    title: '',
    content: '',
    subtitle: ''
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: '',
    description: '',
    level: 80,
    icon: ''
  });

  const [experienceForm, setExperienceForm] = useState({
    position: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: ''
  });

  const [resumeForm, setResumeForm] = useState({
    section_key: '',
    title: '',
    content: '',
    file_url: ''
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

  const fetchAboutContent = async () => {
    const { data, error } = await supabase.from('about').select('*').order('section_key');
    if (error) {
      toast({ title: "Hata", description: "Hakkımda içeriği yüklenemedi", variant: "destructive" });
    } else {
      setAboutContent(data || []);
    }
  };

  const fetchSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*').order('category', { ascending: true });
    if (error) {
      toast({ title: "Hata", description: "Beceriler yüklenemedi", variant: "destructive" });
    } else {
      setSkills(data || []);
    }
  };

  const fetchExperiences = async () => {
    const { data, error } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
    if (error) {
      toast({ title: "Hata", description: "Deneyimler yüklenemedi", variant: "destructive" });
    } else {
      setExperiences(data || []);
    }
  };

  const fetchResume = async () => {
    const { data, error } = await supabase.from('resume').select('*').order('section_key');
    if (error) {
      toast({ title: "Hata", description: "CV içeriği yüklenemedi", variant: "destructive" });
    } else {
      setResume(data || []);
    }
  };

  const fetchContactSubmissions = async () => {
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: "Hata", description: "İletişim mesajları yüklenemedi", variant: "destructive" });
    } else {
      setContactSubmissions(data || []);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
      fetchBlogPosts();
      fetchAboutContent();
      fetchSkills();
      fetchExperiences();
      fetchResume();
      fetchContactSubmissions();
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
    setAboutContent([]);
    setSkills([]);
    setExperiences([]);
    setResume([]);
    setContactSubmissions([]);
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

  // About CRUD operations
  const saveAboutContent = async () => {
    setLoading(true);
    const result = await supabase.from('about').update({
      title: aboutForm.title,
      content: aboutForm.content,
      subtitle: aboutForm.subtitle
    }).eq('id', editingAbout.id);

    if (result.error) {
      toast({ title: "Hata", description: "Hakkımda içeriği kaydedilemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Hakkımda içeriği kaydedildi!" });
      setEditingAbout(null);
      setAboutForm({ title: '', content: '', subtitle: '' });
      fetchAboutContent();
    }
    setLoading(false);
  };

  const editAboutContent = (content) => {
    setEditingAbout(content);
    setAboutForm({
      title: content.title || '',
      content: content.content || '',
      subtitle: content.subtitle || ''
    });
  };

  // Skills CRUD operations
  const saveSkill = async () => {
    setLoading(true);
    let result;
    if (editingSkill?.id) {
      result = await supabase.from('skills').update(skillForm).eq('id', editingSkill.id);
    } else {
      result = await supabase.from('skills').insert([skillForm]);
    }

    if (result.error) {
      toast({ title: "Hata", description: "Beceri kaydedilemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Beceri kaydedildi!" });
      setEditingSkill(null);
      setSkillForm({ name: '', category: '', description: '', level: 80, icon: '' });
      fetchSkills();
    }
    setLoading(false);
  };

  const deleteSkill = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) {
      toast({ title: "Hata", description: "Beceri silinemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Beceri silindi!" });
      fetchSkills();
    }
  };

  const editSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name || '',
      category: skill.category || '',
      description: skill.description || '',
      level: skill.level || 80,
      icon: skill.icon || ''
    });
  };

  // Experience CRUD operations
  const saveExperience = async () => {
    setLoading(true);
    console.log('Saving experience:', experienceForm);
    
    // Form validation
    if (!experienceForm.position || !experienceForm.company || !experienceForm.start_date) {
      toast({ title: "Hata", description: "Pozisyon, şirket ve başlangıç tarihi zorunludur", variant: "destructive" });
      setLoading(false);
      return;
    }

    let result;
    if (editingExperience?.id) {
      result = await supabase.from('experience').update(experienceForm).eq('id', editingExperience.id);
    } else {
      result = await supabase.from('experience').insert([experienceForm]);
    }

    console.log('Save result:', result);
    if (result.error) {
      console.error('Experience save error:', result.error);
      toast({ title: "Hata", description: `Deneyim kaydedilemedi: ${result.error.message}`, variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Deneyim kaydedildi!" });
      setEditingExperience(null);
      setExperienceForm({ position: '', company: '', location: '', start_date: '', end_date: '', is_current: false, description: '' });
      fetchExperiences();
    }
    setLoading(false);
  };

  const deleteExperience = async (id) => {
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) {
      toast({ title: "Hata", description: "Deneyim silinemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Deneyim silindi!" });
      fetchExperiences();
    }
  };

  const editExperience = (experience) => {
    setEditingExperience(experience);
    setExperienceForm({
      position: experience.position || '',
      company: experience.company || '',
      location: experience.location || '',
      start_date: experience.start_date || '',
      end_date: experience.end_date || '',
      is_current: experience.is_current || false,
      description: experience.description || ''
    });
  };

  // Resume CRUD operations
  const saveResume = async () => {
    setLoading(true);
    let result;
    if (editingResume?.id) {
      result = await supabase.from('resume').update(resumeForm).eq('id', editingResume.id);
    } else {
      result = await supabase.from('resume').insert([resumeForm]);
    }

    if (result.error) {
      toast({ title: "Hata", description: "CV kaydedilemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "CV kaydedildi!" });
      setEditingResume(null);
      setResumeForm({ section_key: '', title: '', content: '', file_url: '' });
      fetchResume();
    }
    setLoading(false);
  };

  const deleteResume = async (id) => {
    const { error } = await supabase.from('resume').delete().eq('id', id);
    if (error) {
      toast({ title: "Hata", description: "CV silinemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "CV silindi!" });
      fetchResume();
    }
  };

  const editResume = (resume) => {
    setEditingResume(resume);
    setResumeForm({
      section_key: resume.section_key || '',
      title: resume.title || '',
      content: resume.content || '',
      file_url: resume.file_url || ''
    });
  };

  // Contact submissions operations
  const deleteContactSubmission = async (id) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) {
      toast({ title: "Hata", description: "Mesaj silinemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "Mesaj silindi!" });
      fetchContactSubmissions();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen gradient-masculine flex items-center justify-center px-6">
        <Navbar />
        <div className="w-full max-w-md card-masculine shadow-lg rounded-2xl p-8 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gradient-primary mb-2 flex items-center justify-center gap-2">
              <span className="text-3xl">⚙️</span> Admin Paneli
            </h2>
            <p className="text-gradient-accent">Giriş yapın</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gradient-steel">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground focus:border-ring"
                placeholder="E-posta adresiniz"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gradient-steel">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border text-foreground focus:border-ring"
                placeholder="Şifreniz"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-400 text-sm">{loginError}</p>
            )}
            <Button 
              type="submit" 
              className="w-full btn-masculine"
            >
              <span>🔐</span> Giriş Yap
            </Button>
          </form>
        </div>
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
            <span className="text-2xl">⚙️</span>
            <h1 className="text-2xl font-bold">Admin Paneli</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span className="text-sm text-gray-300">Barkın Çeliker</span>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              size="sm"
              className="border-red-400 text-red-300 hover:bg-red-400/20"
            >
              <span className="mr-2">🚪</span>
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid grid-cols-7 w-full bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-1 shadow-2xl">
            <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <span className="mr-2">💻</span>
              Projeler
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <span className="mr-2">📄</span>
              Blog
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <span className="mr-2">👤</span>
              Hakkımda
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <span className="mr-2">⚙️</span>
              Beceriler
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <span className="mr-2">💼</span>
              Deneyim
            </TabsTrigger>
            <TabsTrigger value="resume" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              <span className="mr-2">📄</span>
              CV
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
              <span className="mr-2">📧</span>
              İletişim
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
                <span className="mr-2">➕</span>
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
                      <span>❌</span>
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
                    <span className="mr-2">💾</span>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Project List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <span className="text-4xl text-gray-400 mx-auto mb-4 block">⚠️</span>
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
                          <span>✏️</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteProject(project.id)}
                          className="border-red-400 text-red-200 hover:bg-red-400/20"
                        >
                          <span>🗑️</span>
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
                <span className="mr-2">➕</span>
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
                      <span>❌</span>
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
                    <span className="mr-2">💾</span>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Blog List */}
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl text-gray-400 mx-auto mb-4 block">⚠️</span>
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
                            <span>✏️</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteBlogPost(post.id)}
                            className="border-red-400 text-red-200 hover:bg-red-400/20"
                          >
                            <span>🗑️</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Hakkımda İçeriği</h2>
            </div>

            {/* About Form */}
            {editingAbout && (
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>İçerik Düzenle: {editingAbout.section_key}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingAbout(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <span>❌</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-200">Başlık</Label>
                    <Input
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white"
                      placeholder="Başlık"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Alt Başlık/Emoji</Label>
                    <Input
                      value={aboutForm.subtitle}
                      onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white"
                      placeholder="🚀"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">İçerik</Label>
                    <Textarea
                      value={aboutForm.content}
                      onChange={(e) => setAboutForm({ ...aboutForm, content: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white min-h-32"
                      placeholder="İçerik açıklaması"
                    />
                  </div>
                  <Button 
                    onClick={saveAboutContent}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <span className="mr-2">💾</span>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* About Content List */}
            <div className="space-y-4">
              {aboutContent.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl text-gray-400 mx-auto mb-4 block">⚠️</span>
                  <p className="text-gray-400">Henüz içerik eklenmemiş</p>
                </div>
              ) : (
                aboutContent.map((content) => (
                  <Card key={content.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{content.section_key}</h3>
                          <p className="text-purple-300 mb-2">{content.title}</p>
                          <p className="text-gray-300 text-sm mb-2">{content.content}</p>
                          {content.subtitle && (
                            <Badge className="bg-purple-500/20 text-purple-200 text-xs">
                              {content.subtitle}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => editAboutContent(content)}
                            className="border-blue-400 text-blue-200 hover:bg-blue-400/20"
                          >
                            <span>✏️</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Beceriler</h2>
              <Button 
                onClick={() => {
                  setEditingSkill({ id: null });
                  setSkillForm({ name: '', category: '', description: '', level: 80, icon: '' });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                    <span className="mr-2">➕</span>
                Yeni Beceri
              </Button>
            </div>

            {/* Skills Form */}
            {editingSkill && (
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{editingSkill.id ? 'Beceri Düzenle' : 'Yeni Beceri'}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingSkill(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <span>❌</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Beceri Adı</Label>
                      <Input
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="Python, React, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-200">Kategori</Label>
                      <Input
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="Programming, Design, etc."
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Seviye (0-100)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                        className="bg-white/10 border-purple-500/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-200">İkon/Emoji</Label>
                      <Input
                        value={skillForm.icon}
                        onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="🐍, ⚛️, etc."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Açıklama</Label>
                    <Textarea
                      value={skillForm.description}
                      onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white min-h-20"
                      placeholder="Beceri açıklaması"
                    />
                  </div>
                  <Button 
                    onClick={saveSkill}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <span className="mr-2">💾</span>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Skills List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <span className="text-4xl text-gray-400 mx-auto mb-4 block">⚠️</span>
                  <p className="text-gray-400">Henüz beceri eklenmemiş</p>
                </div>
              ) : (
                skills.map((skill) => (
                  <Card key={skill.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{skill.icon}</span>
                        <h3 className="text-xl font-semibold">{skill.name}</h3>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-200 mb-2">{skill.category}</Badge>
                      <p className="text-gray-300 text-sm mb-4">{skill.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-400">Seviye</span>
                        <Badge className="bg-green-500/20 text-green-200">{skill.level}%</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => editSkill(skill)}
                          className="border-blue-400 text-blue-200 hover:bg-blue-400/20"
                        >
                          <span>✏️</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteSkill(skill.id)}
                          className="border-red-400 text-red-200 hover:bg-red-400/20"
                        >
                          <span>🗑️</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Deneyim</h2>
              <Button 
                onClick={() => {
                  setEditingExperience({ id: null });
                  setExperienceForm({ position: '', company: '', location: '', start_date: '', end_date: '', is_current: false, description: '' });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <span className="mr-2">➕</span>
                Yeni Deneyim
              </Button>
            </div>

            {/* Experience Form */}
            {editingExperience && (
              <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{editingExperience.id ? 'Deneyim Düzenle' : 'Yeni Deneyim'}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingExperience(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <span>❌</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Pozisyon</Label>
                      <Input
                        value={experienceForm.position}
                        onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="Senior Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-200">Şirket</Label>
                      <Input
                        value={experienceForm.company}
                        onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        placeholder="Tech Company"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Konum</Label>
                    <Input
                      value={experienceForm.location}
                      onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white"
                      placeholder="İstanbul, Türkiye"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-200">Başlangıç Tarihi *</Label>
                      <Input
                        type="date"
                        value={experienceForm.start_date}
                        onChange={(e) => setExperienceForm({ ...experienceForm, start_date: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-200">Bitiş Tarihi</Label>
                      <Input
                        type="date"
                        value={experienceForm.end_date}
                        onChange={(e) => setExperienceForm({ ...experienceForm, end_date: e.target.value })}
                        className="bg-white/10 border-purple-500/20 text-white"
                        disabled={experienceForm.is_current}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_current"
                      checked={experienceForm.is_current}
                      onChange={(e) => setExperienceForm({ ...experienceForm, is_current: e.target.checked, end_date: e.target.checked ? '' : experienceForm.end_date })}
                      className="w-4 h-4 text-purple-600 bg-white/10 border-purple-500/20 rounded"
                    />
                    <Label htmlFor="is_current" className="text-gray-200">Şu anda çalışıyorum</Label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Açıklama</Label>
                    <Textarea
                      value={experienceForm.description}
                      onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                      className="bg-white/10 border-purple-500/20 text-white min-h-32"
                      placeholder="İş tanımı ve sorumluluklar"
                    />
                  </div>
                  <Button 
                    onClick={saveExperience}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <span className="mr-2">💾</span>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Experience List */}
            <div className="space-y-4">
              {experiences.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl text-gray-400 mx-auto mb-4 block">⚠️</span>
                  <p className="text-gray-400">Henüz deneyim eklenmemiş</p>
                </div>
              ) : (
                experiences.map((exp) => (
                  <Card key={exp.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{exp.position}</h3>
                            {exp.is_current && (
                              <Badge className="bg-green-500/20 text-green-200">Devam Ediyor</Badge>
                            )}
                          </div>
                          <p className="text-purple-300 mb-2">{exp.company}</p>
                          <p className="text-gray-400 text-sm mb-2">{exp.location}</p>
                          <p className="text-gray-400 text-sm mb-4">
                            {new Date(exp.start_date).toLocaleDateString('tr-TR')} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString('tr-TR') : 'Devam Ediyor'}
                          </p>
                          <p className="text-gray-300 text-sm">{exp.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => editExperience(exp)}
                            className="border-blue-400 text-blue-200 hover:bg-blue-400/20"
                          >
                            <span>✏️</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteExperience(exp.id)}
                            className="border-red-400 text-red-200 hover:bg-red-400/20"
                          >
                            <span>🗑️</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-6">
            <AdminResumeSection 
              resume={resume}
              setResume={setResume}
              loading={loading}
              setLoading={setLoading}
            />
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">İletişim Mesajları</h2>
            </div>

            {/* Contact Submissions List */}
            <div className="space-y-4">
              {contactSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl text-gray-400 mx-auto mb-4 block">⚠️</span>
                  <p className="text-gray-400">Henüz mesaj yok</p>
                </div>
              ) : (
                contactSubmissions.map((submission) => (
                  <Card key={submission.id} className="bg-white/10 backdrop-blur-lg border-purple-500/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{submission.name}</h3>
                            {!submission.is_read && (
                              <Badge className="bg-blue-500/20 text-blue-200">Yeni</Badge>
                            )}
                          </div>
                          <p className="text-purple-300 mb-2">{submission.email}</p>
                          <p className="text-gray-300 text-sm mb-4">{submission.message}</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(submission.created_at).toLocaleString('tr-TR')}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteContactSubmission(submission.id)}
                            className="border-red-400 text-red-200 hover:bg-red-400/20"
                          >
                            <span>🗑️</span>
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
                <span className="text-green-400">✅</span>
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