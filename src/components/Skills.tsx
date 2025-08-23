import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Cloud,
  Code,
  Database,
  Monitor,
  Palette,
  Server,
  Settings
} from 'lucide-react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Backend Development',
    icon: Server,
    color: 'text-primary',
    skills: [
      { name: 'Python', level: 95, icon: '🐍' },
      { name: 'FastAPI', level: 90, icon: '⚡' },
      { name: 'Rust', level: 80, icon: '🦀' },
      { name: 'Node.js', level: 85, icon: '📗' },
    ],
  },
  {
    title: 'Frontend Development',
    icon: Monitor,
    color: 'text-accent',
    skills: [
      { name: 'JavaScript/TypeScript', level: 90, icon: '📘' },
      { name: 'React', level: 88, icon: '⚛️' },
      { name: 'Next.js', level: 85, icon: '🔺' },
      { name: 'HTML/CSS', level: 92, icon: '🎨' },
    ],
  },
  {
    title: 'Database & Storage',
    icon: Database,
    color: 'text-primary-glow',
    skills: [
      { name: 'PostgreSQL', level: 92, icon: '🐘' },
      { name: 'MySQL', level: 95, icon: '🗄️' },
      { name: 'MongoDB', level: 85, icon: '🍃' },
      { name: 'Redis', level: 88, icon: '🔴' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'text-accent-glow',
    skills: [
      { name: 'AWS', level: 90, icon: '☁️' },
      { name: 'Docker', level: 88, icon: '🐳' },
      { name: 'Kubernetes', level: 82, icon: '⚙️' },
      { name: 'CI/CD', level: 85, icon: '🔄' },
    ],
  },
  {
    title: 'Analytics & Monitoring',
    icon: Settings,
    color: 'text-primary',
    skills: [
      { name: 'Elasticsearch', level: 85, icon: '🔍' },
      { name: 'Kibana', level: 88, icon: '📊' },
      { name: 'PowerBI', level: 80, icon: '📈' },
      { name: 'Pandas', level: 92, icon: '🐼' },
    ],
  },
  {
    title: 'Design & UX',
    icon: Palette,
    color: 'text-accent',
    skills: [
      { name: 'Figma', level: 85, icon: '🎨' },
      { name: 'UI/UX Design', level: 80, icon: '✨' },
      { name: 'Responsive Design', level: 90, icon: '📱' },
      { name: 'User Research', level: 75, icon: '🔬' },
    ],
  },
];

export const Skills: React.FC = () => {
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
      id="skills"
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
            Skills &{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="group"
              >
                <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass h-full">
                  <CardContent className="p-6 space-y-6">
                    {/* Category Header */}
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`p-2 rounded-lg bg-primary/10 ${category.color}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CategoryIcon className="w-6 h-6" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { 
                            opacity: 1, 
                            x: 0,
                            transition: { 
                              delay: (categoryIndex * 0.1) + (skillIndex * 0.05),
                              duration: 0.5 
                            }
                          } : {}}
                        >
                          {/* Skill Name and Icon */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{skill.icon}</span>
                              <span className="text-sm font-medium text-foreground">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <motion.div
                            className="relative"
                            initial={{ scaleX: 0 }}
                            animate={inView ? { 
                              scaleX: 1,
                              transition: { 
                                delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.2,
                                duration: 0.8,
                                ease: "easeOut"
                              }
                            } : {}}
                            style={{ transformOrigin: "left" }}
                          >
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${
                                  category.color === 'text-primary' 
                                    ? 'from-primary to-primary-glow'
                                    : category.color === 'text-accent' 
                                    ? 'from-accent to-accent-glow'
                                    : category.color === 'text-primary-glow'
                                    ? 'from-primary-glow to-primary'
                                    : 'from-accent-glow to-accent'
                                } shadow-sm`}
                                initial={{ width: 0 }}
                                animate={inView ? { 
                                  width: `${skill.level}%`,
                                  transition: { 
                                    delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3,
                                    duration: 1,
                                    ease: "easeOut"
                                  }
                                } : {}}
                              />
                            </div>
                            
                            {/* Glow effect */}
                            <motion.div
                              className={`absolute top-0 h-full rounded-full opacity-0 ${
                                category.color === 'text-primary' 
                                  ? 'bg-primary/20'
                                  : category.color === 'text-accent' 
                                  ? 'bg-accent/20'
                                  : category.color === 'text-primary-glow'
                                  ? 'bg-primary-glow/20'
                                  : 'bg-accent-glow/20'
                              } blur-sm`}
                              animate={inView ? {
                                opacity: [0, 0.5, 0],
                                width: [`0%`, `${skill.level}%`, `${skill.level}%`],
                                transition: {
                                  delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3,
                                  duration: 1.5,
                                  ease: "easeOut"
                                }
                              } : {}}
                            />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills Summary */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-foreground">
                  7+ Years of{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Continuous Learning
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  My skill set is constantly evolving with the latest technologies and industry best practices. 
                  I believe in the power of continuous learning and staying ahead of the technological curve.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {['Microservices', 'Serverless', 'API Design', 'Code Review', 'Team Leadership', 'Agile/Scrum'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};