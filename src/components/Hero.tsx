import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import heroBackground from '@/assets/hero-background.jpg';

interface HeroProps {
  onScrollToSection: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for better text readibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Main heading */}
        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          variants={itemVariants}
        >
          <span className="block text-foreground mb-2">Hi, I'm</span>
          <motion.span
            className="block bg-gradient-primary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Nagendra Prasad G T
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Multi-disciplinary developer and technical specialist skilled in{' '}
          <motion.span
            className="text-primary font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            backend
          </motion.span>
          ,{' '}
          <motion.span
            className="text-accent font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            frontend
          </motion.span>
          ,{' '}
          <motion.span
            className="text-primary-glow font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            DevOps
          </motion.span>
          {' '}and{' '}
          <motion.span
            className="text-accent-glow font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            design
          </motion.span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <Button
            onClick={() => onScrollToSection('projects')}
            size="lg"
            className="bg-gradient-primary hover:shadow-primary text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            View My Work
          </Button>
          
          <Button
            onClick={() => onScrollToSection('contact')}
            variant="outline"
            size="lg"
            className="border-primary/30 text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mb-16"
          variants={itemVariants}
        >
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:nprasadgt@gmail.com', label: 'Email' },
          ].map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center"
          variants={floatingVariants}
          animate="animate"
        >
          <motion.div
            onClick={() => onScrollToSection('about')}
            className="cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
          <span className="text-sm text-muted-foreground mt-2">Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};