import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
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
    <div className="min-h-screen gradient-masculine">
      <Navbar />
      <section className="py-20 px-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary flex items-center justify-center gap-3">
              <span className="text-5xl">📧</span> İletişim
            </h2>
            <p className="text-xl text-gradient-accent max-w-3xl mx-auto">
              Benimle iletişime geçin. Proje tekliflerinizi veya sorularınızı bekliyorum!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-masculine p-8 rounded-2xl animate-fade-in">
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-2xl text-gradient-primary font-semibold">
                  <Send className="w-6 h-6" />
                  ⚡ Mesaj Gönder
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gradient-steel">Adınız</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-input border-border focus:border-ring text-foreground"
                    placeholder="Adınızı girin"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gradient-steel">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-input border-border focus:border-ring text-foreground"
                    placeholder="Email adresinizi girin"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gradient-steel">Mesajınız</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-input border-border focus:border-ring min-h-32 text-foreground"
                    placeholder="Mesajınızı yazın..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full btn-masculine rounded-full text-lg font-medium"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? 'Gönderiliyor...' : '📧 Mesaj Gönder'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-bold mb-6 text-gradient-primary flex items-center gap-2">
                  <span className="text-3xl">📍</span> İletişim Bilgileri
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-gradient-steel">Konum</p>
                      <p className="text-gradient-accent">İzmir, Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-masculine p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-2xl font-bold mb-6 text-gradient-steel flex items-center gap-2">
                  <span className="text-3xl">🔗</span> Sosyal Medya
                </h3>
                
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/barkinceliker?tab=repositories" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg gradient-secondary hover:gradient-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-6 h-6 text-foreground" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/celikerbarkin/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg gradient-secondary hover:gradient-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6 text-foreground" />
                  </a>
                </div>
              </div>

              <div className="gradient-masculine-subtle p-8 text-center rounded-2xl border border-border animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-xl font-bold mb-4 text-gradient-primary flex items-center justify-center gap-2">
                  <span className="text-3xl">🚀</span> Proje Teklifleri
                </h3>
                <p className="text-gradient-accent mb-4">
                  Veri analizi, iş zekası veya dashboard geliştirme projeleriniz için benimle iletişime geçebilirsiniz. Her türlü işbirliği teklifine açığım!
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="gradient-primary text-foreground border-border">Veri Analizi</Badge>
                  <Badge className="gradient-secondary text-foreground border-border">Dashboard</Badge>
                  <Badge className="gradient-accent text-foreground border-border">Raporlama</Badge>
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