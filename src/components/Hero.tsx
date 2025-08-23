import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Zap, Layers, Users, Award } from 'lucide-react';
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32 scroll-mt-24"
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
          <span className="whitespace-nowrap">
            <span className="text-foreground">Hi, I'm</span>{' '}
            <motion.span
              className="bg-gradient-primary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Nagendra Prasad G T
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle with subtle suspense + shimmer to invite exploration */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground leading-relaxed">
            Multi-disciplinary developer and technical specialist skilled in{' '}
            {/* Animated, shimmering keywords */}
            <motion.span
              className="font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(139,92,246,0.6), rgba(168,85,247,1), rgba(139,92,246,0.6))',
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
            >
              backend
            </motion.span>
            {', '}
            <motion.span
              className="font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(34,197,94,0.6), rgba(16,185,129,1), rgba(34,197,94,0.6))',
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
            >
              frontend
            </motion.span>
            {', '}
            <motion.span
              className="font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(59,130,246,0.6), rgba(99,102,241,1), rgba(59,130,246,0.6))',
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
            >
              DevOps
            </motion.span>
            {' '}and{' '}
            <motion.span
              className="font-semibold bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgba(236,72,153,0.6), rgba(217,70,239,1), rgba(236,72,153,0.6))',
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
            >
              design
            </motion.span>
          </motion.p>

          {/* Underline sweep as a subtle cue to scroll */}
          <motion.div
            className="mt-2 h-0.5 w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full"
            initial={{ scaleX: 0, opacity: 0.3 }}
            animate={{ scaleX: 1, opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Value props to add weight and compel exploration */}
        <motion.div
          className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center gap-2 rounded-xl bg-card/60 border border-border/60 px-4 py-3 backdrop-blur"
            whileHover={{ y: -3 }}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground"><strong>Outcome‑driven</strong> delivery</span>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-2 rounded-xl bg-card/60 border border-border/60 px-4 py-3 backdrop-blur"
            whileHover={{ y: -3 }}
          >
            <Layers className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground"><strong>End‑to‑end</strong> ownership</span>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-2 rounded-xl bg-card/60 border border-border/60 px-4 py-3 backdrop-blur"
            whileHover={{ y: -3 }}
          >
            <Award className="w-4 h-4 text-primary-glow" />
            <span className="text-sm text-foreground"><strong>AI‑augmented</strong> workflows</span>
          </motion.div>
        </motion.div>

        {/* Social proof / leadership trust line */}
        <motion.div
          className="mb-10 text-sm text-muted-foreground"
          variants={itemVariants}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
            <Users className="w-4 h-4 text-primary" />
            Trusted partner to CEOs, COOs & CTOs — translating strategy into shipped products
          </span>
        </motion.div>

        {/* Quick explore chips */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-12"
          variants={itemVariants}
        >
          {[
            { id: 'projects', label: 'See projects' },
            { id: 'skills', label: 'Explore skills' },
            { id: 'timeline', label: 'Career timeline' }
          ].map((chip) => (
            <motion.button
              key={chip.id}
              onClick={() => onScrollToSection(chip.id)}
              className="px-4 py-2 text-sm rounded-full border border-border/60 bg-card/60 text-foreground hover:border-primary/40 hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {chip.label}
            </motion.button>
          ))}
        </motion.div>

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
            { icon: Github, href: 'https://github.com/nagendraprasad', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/nagendraprasad-g-t/', label: 'LinkedIn' },
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