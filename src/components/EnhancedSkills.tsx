import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Server,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  level: number;
  category: 'backend' | 'frontend' | 'cloud' | 'database' | 'design' | 'devops';
  icon: typeof Code2;
  color: string;
  technologies: string[];
}

const skills: Skill[] = [
  // Backend
  {
    name: 'Python',
    level: 95,
    category: 'backend',
    icon: Code2,
    color: 'text-yellow-400',
    technologies: ['FastAPI', 'Django', 'Flask', 'Pandas', 'NumPy']
  },
  {
    name: 'Rust',
    level: 85,
    category: 'backend',
    icon: Settings,
    color: 'text-orange-500',
    technologies: ['Actix-web', 'Tokio', 'Serde', 'Diesel']
  },
  {
    name: 'SQL',
    level: 90,
    category: 'database',
    icon: Database,
    color: 'text-blue-400',
    technologies: ['MySQL', 'PostgreSQL', 'Query Optimization']
  },

  // Frontend
  {
    name: 'JavaScript/TypeScript',
    level: 88,
    category: 'frontend',
    icon: Globe,
    color: 'text-yellow-500',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript']
  },
  {
    name: 'React Ecosystem',
    level: 85,
    category: 'frontend',
    icon: Layers,
    color: 'text-cyan-400',
    technologies: ['React', 'Next.js', 'Redux', 'Tailwind CSS']
  },

  // Cloud & DevOps
  {
    name: 'AWS',
    level: 88,
    category: 'cloud',
    icon: Cloud,
    color: 'text-orange-400',
    technologies: ['Lambda', 'Step Functions', 'EC2', 'S3', 'RDS']
  },
  {
    name: 'GCP',
    level: 82,
    category: 'cloud',
    icon: Cloud,
    color: 'text-blue-400',
    technologies: ['Cloud Run', 'GKE', 'Cloud SQL (PostgreSQL)', 'Pub/Sub', 'IAM']
  },
  {
    name: 'Docker & K8s',
    level: 82,
    category: 'devops',
    icon: Server,
    color: 'text-blue-500',
    technologies: ['Docker', 'Kubernetes', 'Container Orchestration']
  },

  // Databases
  {
    name: 'NoSQL',
    level: 85,
    category: 'database',
    icon: Database,
    color: 'text-green-500',
    technologies: ['MongoDB', 'Redis', 'Elasticsearch']
  },

  // Analytics & Design
  {
    name: 'Data Analytics',
    level: 90,
    category: 'backend',
    icon: BarChart3,
    color: 'text-purple-500',
    technologies: ['Pandas', 'Kibana', 'PowerBI', 'Data Visualization']
  },
  {
    name: 'AI-driven Development',
    level: 75,
    category: 'backend',
    icon: Zap,
    color: 'text-amber-500',
    technologies: ['LLM Integration', 'RAG Patterns', 'Prompt Engineering']
  },
  {
    name: 'UI/UX Design',
    level: 78,
    category: 'design',
    icon: Palette,
    color: 'text-pink-500',
    technologies: ['Figma', 'Design Systems', 'User Experience']
  },

  // DevOps & Tools
  {
    name: 'CI/CD & Git',
    level: 85,
    category: 'devops',
    icon: GitBranch,
    color: 'text-red-500',
    technologies: ['Git', 'GitHub Actions', 'CI/CD Pipelines']
  },
  {
    name: 'System Architecture',
    level: 88,
    category: 'backend',
    icon: Shield,
    color: 'text-indigo-500',
    technologies: ['Microservices', 'API Design', 'Scalability']
  }
];

const categoryColors = {
  backend: 'bg-primary/10 text-primary border-primary/20',
  frontend: 'bg-accent/10 text-accent border-accent/20',
  cloud: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  database: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  design: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  devops: 'bg-green-500/10 text-green-500 border-green-500/20'
};

const categoryNames = {
  backend: 'Backend Development',
  frontend: 'Frontend Development',
  cloud: 'Cloud & Infrastructure',
  database: 'Database Management',
  design: 'Design & UX',
  devops: 'DevOps & Tools'
};

export const EnhancedSkills: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  const filteredSkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

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

  return (
    <section
      ref={ref}
      className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="skills"
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
            Technical{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Category Filters */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === null 
                ? 'bg-primary text-primary-foreground shadow-primary' 
                : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Skills
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category 
                  ? categoryColors[category as keyof typeof categoryColors].replace('/10', '/20').replace('/20', '')
                  : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryNames[category as keyof typeof categoryNames]}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.name;

            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass h-full">
                  <CardContent className="p-6 space-y-4">
                    {/* Skill Header */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`p-2 rounded-lg bg-primary/10 ${skill.color}`}
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          rotate: isHovered ? 5 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{skill.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${categoryColors[skill.category]}`}
                        >
                          {categoryNames[skill.category]}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <motion.span 
                          className="text-2xl font-bold text-primary"
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress 
                        value={inView ? skill.level : 0} 
                        className="h-2 bg-muted"
                      />
                      <motion.div
                        className="w-full bg-muted rounded-full h-2 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-primary"
                          initial={{ width: 0 }}
                          animate={{ width: inView ? `${skill.level}%` : 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.5 + index * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {skill.technologies.map((tech, idx) => (
                          <motion.span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: 'hsl(var(--primary) / 0.1)',
                              color: 'hsl(var(--primary))'
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: 'Years Experience', value: '7+', icon: Zap },
            { label: 'Technologies', value: '25+', icon: Layers },
            { label: 'Projects Completed', value: '50+', icon: BarChart3 },
            { label: 'Certifications', value: '10+', icon: Shield }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center space-y-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};