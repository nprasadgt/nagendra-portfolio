import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send,
  MessageCircle,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'nprasadgt@gmail.com',
    href: 'mailto:nprasadgt@gmail.com',
    color: 'text-primary'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bangalore, India',
    href: null,
    color: 'text-accent'
  },
  {
    icon: Calendar,
    label: 'Availability',
    value: 'Open to opportunities',
    href: null,
    color: 'text-primary-glow'
  }
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: '#',
    username: '@nagendraprasad'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: '#',
    username: 'nagendra-prasad-gt'
  },
  {
    icon: MessageCircle,
    label: 'Twitter',
    href: '#',
    username: '@nagendraprasad'
  }
];

export const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      const mailtoLink = `mailto:nprasadgt@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: "Message Prepared!",
        description: "Your email client should open with the pre-filled message.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="contact"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Get In{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate or discuss opportunities? I'd love to hear from you.
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Let's Connect
              </h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in new opportunities, challenging projects, 
                and meaningful collaborations. Whether you have a project in mind 
                or just want to chat about technology, feel free to reach out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = (
                  <motion.div
                    key={info.label}
                    className="flex items-center space-x-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    } : {}}
                  >
                    <div className={`p-3 rounded-lg bg-primary/10 ${info.color} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                );

                return info.href ? (
                  <a key={info.label} href={info.href}>
                    {content}
                  </a>
                ) : (
                  content
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="p-3 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg transition-all duration-200"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.5 + (index * 0.1) }
                      } : {}}
                      title={`${social.label}: ${social.username}`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Send a Message
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  variants={cardVariants}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div 
                      className="space-y-2"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border focus:border-primary"
                        placeholder="Your full name"
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border focus:border-primary"
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-background border-border focus:border-primary resize-none"
                      placeholder="Tell me more about your project or inquiry..."
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-primary hover:shadow-primary text-primary-foreground font-semibold py-6 text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          <span>Preparing...</span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-6"
              >
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-gradient-primary text-primary-foreground rounded-full mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Ready to{' '}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      Collaborate?
                    </span>
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    I'm currently available for full-time opportunities, consulting projects, 
                    and technical collaborations. Let's build something amazing together!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      asChild
                      className="bg-gradient-primary hover:shadow-primary text-primary-foreground"
                    >
                      <a href="mailto:nprasadgt@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      asChild
                      className="border-primary/30 text-primary hover:bg-primary/10"
                    >
                      <a href="#" download>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Call
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};