import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Award, Brain, Cloud, Code, Database, Palette, Server, Users } from 'lucide-react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const highlights = [
  {
    icon: Award,
    title: '7+ Years Experience',
    description: 'Extensive experience across multiple domains and technologies',
  },
  {
    icon: Brain,
    title: 'AI‑Oriented Developer',
    description: 'Integrating LLMs and AI workflows to automate, and improve delivery',
  },
  {
    icon: Server,
    title: 'Backend Specialist',
    description: 'Expert in Python, Django, FastAPI, React, NextJs, Rust, and DB technologies',
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Data modeling, performance tuning, migrations, and scaling (PSQL, MySQL)',
  },
  {
    icon: Code,
    title: 'Full Stack Developer',
    description: 'Proficient in modern frontend frameworks and backend systems',
  },
  {
    icon: Cloud,
    title: 'DevOps Expert',
    description: 'GCP, AWS, EC2, Compute Engine, Docker, Kubernetes, and serverless architecture',
  },
  {
    icon: Palette,
    title: 'Design Focused',
    description: 'Creating intuitive and user-friendly interfaces',
  },
  {
    icon: Users,
    title: 'Team Leader',
    description: 'Technical Architect and Lead for 7 member team',
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
      className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
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
                I'm <strong className="text-foreground">Nagendra Prasad G T</strong>, a
                <strong className="text-foreground"> Full‑Stack Developer & Technical Specialist </strong>
                 at <strong className="text-primary">WarpDrive Tech Works</strong>
                (Jun 2024 – Present, Bengaluru). With
                <strong className="text-accent"> 7+ years of experience</strong> in the software
                industry, I build secure, scalable, and user‑centric products across backend services,
                modern frontends, cloud/DevOps, and platform engineering.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I work directly with <strong className="text-foreground">CEOs, COOs, and CTOs </strong>
                to translate strategy into pragmatic technical roadmaps, de‑risk delivery, and align
                architecture with business outcomes. I own systems end‑to‑end — from API and data modeling
                to responsive UIs and cloud‑native infrastructure — with a strong focus on reliability,
                performance, and security.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm pursuing AI certifications and actively embedding AI into engineering workflows to
                accelerate delivery, improve developer experience, and raise quality. Previously at
                ConnectSecure (CyberCNS) and KSRTC, I led initiatives in automation, analytics, and
                platform engineering, mentored teams, and drove architectural decisions that improved
                resilience and time‑to‑market.
              </p>
            </div>

            <motion.div
              className="flex flex-wrap gap-3"
              variants={itemVariants}
            >
              {['Python', 'Django', 'FastAPI', 'PSQL', 'Docker', 'GCP', 'AWS', 'React'].map((tech, index) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-2 py-2 rounded-full bg-muted/50 text-sm font-medium text-muted-foreground border border-border/50"
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
        {/* <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-foreground">
                  Currently at{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    WarpDrive Tech Works
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  As a Technical Specialist, I design and develop backend services and modern frontends,
                  lead cloud/DevOps initiatives, and integrate AI into workflows to boost productivity and
                  quality.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div> */}
      </motion.div>
    </section>
  );
};