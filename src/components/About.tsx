import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Cloud, Palette, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const highlights = [
  {
    icon: Award,
    title: '9+ Years Experience',
    description: 'Extensive experience across multiple domains and technologies',
  },
  {
    icon: Server,
    title: 'Backend Specialist',
    description: 'Expert in Python, FastAPI, Rust, and database technologies',
  },
  {
    icon: Code,
    title: 'Full Stack Developer',
    description: 'Proficient in modern frontend frameworks and backend systems',
  },
  {
    icon: Cloud,
    title: 'DevOps Expert',
    description: 'AWS, Docker, Kubernetes, and serverless architecture',
  },
  {
    icon: Palette,
    title: 'Design Focused',
    description: 'Creating intuitive and user-friendly interfaces',
  },
  {
    icon: Users,
    title: 'Team Leader',
    description: 'Technical interviewer and mentor for junior engineers',
  },
];

export const About: React.FC = () => {
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
    hidden: { opacity: 0, scale: 0.8 },
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
      id="about"
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
            About{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <strong className="text-foreground">Nagendra Prasad G T</strong>, 
                a passionate Technical Specialist and Solution Architect currently working at{' '}
                <strong className="text-primary">ConnectSecure</strong> (formerly CyberCNS). 
                With over <strong className="text-accent">nine years of experience</strong> in 
                the software industry, I've developed a comprehensive skill set spanning backend 
                development, frontend technologies, cloud DevOps, and user experience design.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey has taken me through various roles, from maintaining and optimizing 
                fleet systems at KSRTC to designing scalable solutions and mentoring teams at 
                ConnectSecure. I believe in building{' '}
                <strong className="text-primary">efficient</strong>,{' '}
                <strong className="text-accent">secure</strong>, and{' '}
                <strong className="text-primary-glow">intuitive</strong> solutions that make 
                a real impact.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                solution architecture, or conducting technical interviews to help build amazing 
                development teams.
              </p>
            </div>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {['Python', 'TypeScript', 'React', 'AWS', 'Docker', 'FastAPI'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                  whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: 'var(--shadow-glass)',
                    }}
                    className="group"
                  >
                    <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <motion.div
                          className="flex items-start space-x-4"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="flex-shrink-0">
                            <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                              {highlight.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {highlight.description}
                            </p>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Current Role Highlight */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-foreground">
                  Currently at{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    ConnectSecure
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  As a Technical Specialist and Solution Architect, I lead the design and 
                  development of critical systems, mentor junior engineers, and contribute to 
                  the technical strategy for client projects.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};