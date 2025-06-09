import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Your message has been sent successfully! I will get back to you as soon as possible."
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Message could not be sent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

      <section className="py-20 px-6 pt-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              İletişime Geçin
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Proje tekliflerinizi, iş birliği önerilerinizi veya sorularınızı paylaşın. 
              Her mesajınızı dikkatle okuyor ve en kısa sürede geri dönüş yapıyorum.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border p-8 rounded-2xl animate-fade-in hover:shadow-lg transition-shadow">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-foreground font-semibold">
                      Mesaj Gönder
                    </h3>
                    <p className="text-sm text-muted-foreground">Formu doldurarak benimle iletişime geçin</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-foreground font-medium">Adınız *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary text-foreground h-12"
                    placeholder="Adınızı ve soyadınızı girin"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-foreground font-medium">Email Adresiniz *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary text-foreground h-12"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="message" className="text-foreground font-medium">Mesajınız *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary min-h-36 text-foreground resize-none"
                    placeholder="Proje detaylarınızı, iş birliği önerilerinizi veya sorularınızı yazın..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg font-medium flex items-center gap-2 rounded-lg"
                >
                  <Send className="w-5 h-5" />
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      Gönderiliyor...
                    </>
                  ) : 'Mesaj Gönder'}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  Mesajınız doğrudan bana ulaşacak ve 24 saat içinde geri dönüş yapacağım.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-card border border-border p-8 rounded-2xl animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      İletişim Bilgileri
                    </h3>
                    <p className="text-sm text-muted-foreground">Bana ulaşabileceğiniz kanallar</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Konum</p>
                      <p className="text-muted-foreground">İzmir, Türkiye</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground">barkinclkr@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-8 rounded-2xl animate-fade-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Github className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Sosyal Medya
                    </h3>
                    <p className="text-sm text-muted-foreground">Profesyonel platformlarda benimle bağlantı kurun</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com/barkinceliker?tab=repositories" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                    <div>
                      <p className="font-medium text-foreground">GitHub</p>
                      <p className="text-xs text-muted-foreground">Projelerim</p>
                    </div>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/celikerbarkin/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                    <div>
                      <p className="font-medium text-foreground">LinkedIn</p>
                      <p className="text-xs text-muted-foreground">Profesyonel profil</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center rounded-2xl border border-border animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  Proje Teklifleri & İş Birliği
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Veri analizi, iş zekası veya dashboard geliştirme projeleriniz için benimle iletişime geçebilirsiniz. 
                  Her türlü işbirliği teklifine açığım!
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-background rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground">Veri Analizi</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground">Dashboard</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground">Raporlama</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;