import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

interface AdminResumeSectionProps {
  resume: Tables<'resume'>[];
  setResume: (resume: Tables<'resume'>[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AdminResumeSection = ({ resume, setResume, loading, setLoading }: AdminResumeSectionProps) => {
  const { toast } = useToast();
  const [editingResume, setEditingResume] = useState<Tables<'resume'> | null>(null);
  const [resumeForm, setResumeForm] = useState({
    section_key: '',
    title: '',
    content: '',
    file_url: ''
  });

  const fetchResume = async () => {
    const { data, error } = await supabase.from('resume').select('*').order('section_key');
    if (error) {
      toast({ title: "Hata", description: "CV içeriği yüklenemedi", variant: "destructive" });
    } else {
      setResume(data || []);
    }
  };

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

  const deleteResume = async (id: string) => {
    const { error } = await supabase.from('resume').delete().eq('id', id);
    if (error) {
      toast({ title: "Hata", description: "CV silinemedi", variant: "destructive" });
    } else {
      toast({ title: "Başarılı", description: "CV silindi!" });
      fetchResume();
    }
  };

  const editResume = (resume: Tables<'resume'>) => {
    setEditingResume(resume);
    setResumeForm({
      section_key: resume.section_key || '',
      title: resume.title || '',
      content: resume.content || '',
      file_url: resume.file_url || ''
    });
  };

  const resetForm = () => {
    setEditingResume({ id: null } as any);
    setResumeForm({ section_key: '', title: '', content: '', file_url: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">CV İçeriği</h2>
        <Button 
          onClick={resetForm}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Bölüm
        </Button>
      </div>

      {/* Resume Form */}
      {editingResume && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-card-foreground">
              <span>{editingResume.id ? 'CV Bölümünü Düzenle' : 'Yeni CV Bölümü'}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingResume(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Bölüm Anahtarı</Label>
                <select
                  value={resumeForm.section_key}
                  onChange={(e) => setResumeForm({ ...resumeForm, section_key: e.target.value })}
                  className="w-full bg-background border border-border text-foreground p-2 rounded-md"
                >
                  <option value="">Seçiniz...</option>
                  <option value="personal_info">Kişisel Bilgiler</option>
                  <option value="summary">Özet</option>
                  <option value="education">Eğitim</option>
                  <option value="experience">Deneyim</option>
                  <option value="skills">Yetenekler</option>
                  <option value="download_link">İndirme Linki</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Başlık/Pozisyon</Label>
                <Input
                  value={resumeForm.title}
                  onChange={(e) => setResumeForm({ ...resumeForm, title: e.target.value })}
                  className="bg-background border-border text-foreground"
                  placeholder="YBS Öğrencisi & Veri Analisti"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">İçerik</Label>
              <Textarea
                value={resumeForm.content}
                onChange={(e) => setResumeForm({ ...resumeForm, content: e.target.value })}
                className="bg-background border-border text-foreground min-h-32"
                placeholder="CV bölümü içeriği - Personal info için: Name: Ad Soyad\nEmail: email@domain.com\nPhone: +90 XXX XXX XX XX"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Dosya URL (PDF İndirme için)</Label>
              <Input
                value={resumeForm.file_url}
                onChange={(e) => setResumeForm({ ...resumeForm, file_url: e.target.value })}
                className="bg-background border-border text-foreground"
                placeholder="https://example.com/resume.pdf"
              />
            </div>
            <Button 
              onClick={saveResume}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resume List */}
      <div className="grid md:grid-cols-2 gap-4">
        {resume.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Henüz CV bölümü eklenmemiş</p>
            <p className="text-muted-foreground text-sm mt-2">
              CV sayfasının düzgün görünmesi için şu bölümleri eklemeniz önerilir:
            </p>
            <div className="text-left mt-4 bg-muted p-4 rounded-lg inline-block">
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• personal_info - Kişisel bilgiler ve iletişim</li>
                <li>• summary - Özet açıklama</li>
                <li>• education - Eğitim bilgileri</li>
                <li>• experience - İş deneyimi</li>
                <li>• skills - Yetenekler</li>
                <li>• download_link - PDF indirme linki</li>
              </ul>
            </div>
          </div>
        ) : (
          resume.map((item) => (
            <Card key={item.id} className="bg-card border-border hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-accent text-accent-foreground">
                        {item.section_key}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.content}</p>
                    {item.file_url && (
                      <Badge className="bg-primary/10 text-primary">
                        <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                          PDF Linki
                        </a>
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => editResume(item)}
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteResume(item.id)}
                      className="border-destructive text-destructive hover:bg-destructive/10"
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
    </div>
  );
};

export default AdminResumeSection;