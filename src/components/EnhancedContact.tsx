import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ContactInfo {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'nprasadgt@gmail.com',
    href: 'mailto:nprasadgt@gmail.com',
    color: 'text-red-500'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 82776 81217',
    href: 'tel:+918277681217',
    color: 'text-green-500'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bengaluru, Karnataka, India',
    href: '#',
    color: 'text-blue-500'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@nagendraprasad',
    href: 'https://github.com/nagendraprasad',
    color: 'text-gray-500'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/nagendraprasad-g-t',
    href: 'https://www.linkedin.com/in/nagendraprasad-g-t/',
    color: 'text-blue-600'
  }
];

export const EnhancedContact: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:nprasadgt@gmail.com?subject=${subject}&body=${body}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Simulate form submission success
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 0 2px hsl(var(--primary) / 0.2)',
      transition: { duration: 0.2 }
    },
    blur: {
      scale: 1,
      boxShadow: '0 0 0 0px transparent',
      transition: { duration: 0.2 }
    }
  };

  return (
    <section
      ref={ref}
      className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="contact"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-12"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Let's{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you. 
            Let's build something amazing together.
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new opportunities, innovative projects, 
                or just having a chat about technology and development.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : '_self'}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="block"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className={`p-3 rounded-lg bg-primary/10 ${contact.color}`}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>
                          <div>
                            <p className="font-medium text-foreground">{contact.label}</p>
                            <p className="text-muted-foreground">{contact.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.a>
                );
              })}
            </div>

            {/* Quick Actions */}
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                onClick={() => window.open('https://calendly.com/your-username', '_blank')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Call
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://www.linkedin.com/in/nagendraprasad-g-t/', '_blank')}
                className="border-primary/20 hover:border-primary/50 hover:bg-primary/10"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message on LinkedIn
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div 
                    className="space-y-2"
                    variants={inputVariants}
                    animate={focusedField === 'name' ? 'focus' : 'blur'}
                  >
                    <Label htmlFor="name" className="text-foreground font-medium">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      className="bg-muted/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300"
                      required
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div 
                    className="space-y-2"
                    variants={inputVariants}
                    animate={focusedField === 'email' ? 'focus' : 'blur'}
                  >
                    <Label htmlFor="email" className="text-foreground font-medium">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your.email@example.com"
                      className="bg-muted/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300"
                      required
                    />
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div 
                    className="space-y-2"
                    variants={inputVariants}
                    animate={focusedField === 'subject' ? 'focus' : 'blur'}
                  >
                    <Label htmlFor="subject" className="text-foreground font-medium">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="What's this about?"
                      className="bg-muted/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300"
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div 
                    className="space-y-2"
                    variants={inputVariants}
                    animate={focusedField === 'message' ? 'focus' : 'blur'}
                  >
                    <Label htmlFor="message" className="text-foreground font-medium">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project or inquiry..."
                      rows={5}
                      className="bg-muted/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300 resize-none"
                      required
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground py-6 text-lg font-medium disabled:opacity-50"
                    >
                      {formStatus === 'loading' ? (
                        <motion.div
                          className="flex items-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Sending...
                        </motion.div>
                      ) : formStatus === 'success' ? (
                        <motion.div
                          className="flex items-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message Sent!
                        </motion.div>
                      ) : formStatus === 'error' ? (
                        <motion.div
                          className="flex items-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <AlertCircle className="w-5 h-5 mr-2" />
                          Try Again
                        </motion.div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <p className="text-green-500 text-sm">
                      Your message has been sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};