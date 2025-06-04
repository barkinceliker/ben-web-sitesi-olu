import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "E-posta",
      value: "barkinclkr@gmail.com",
      href: "mailto:barkinclkr@gmail.com"
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+90 530 979 86 54",
      href: "tel:+905309798654"
    },
    {
      icon: MapPin,
      title: "Konum",
      value: "İzmir, Türkiye",
      href: "https://maps.google.com"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/barkinceliker",
      color: "hover:text-gray-300"
    },
    {
      icon: Linkedin,
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/celikerbarkin/",
      color: "hover:text-blue-400"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mesaj Gönderildi!",
        description: "En kısa sürede size dönüş yapacağım.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 px-6" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            İletişim
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Projeleriniz için işbirliği yapmak veya sorularınızı sormak için benimle iletişime geçin
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-purple-300">İletişim Bilgileri</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{info.title}</h4>
                        <p className="text-gray-300">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-purple-300">Sosyal Medya</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-purple-500/20 flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-white/20 hover-scale ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Hızlı Bilgi</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Genellikle 24 saat içinde cevap veriyorum</li>
                  <li>• Freelance projelere açığım</li>
                  <li>• Uzaktan çalışma imkanı mevcut</li>
                  <li>• Türkçe ve İngilizce iletişim</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-purple-300">Mesaj Gönder</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">İsim</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Konu</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="Mesajınızın konusu"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Mesaj</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-full transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Mesaj Gönder
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;