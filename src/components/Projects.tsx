import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink, 
  Github, 
  Server, 
  Cloud, 
  Database, 
  Code,
  Settings,
  BarChart3,
  Filter,
  X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'backend' | 'frontend' | 'fullstack' | 'devops' | 'analytics';
  technologies: string[];
  achievements: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 'alerting-psa',
    title: 'Alerting and PSA Ticket Creation System',
    description: 'Comprehensive alerting system with automated ticket creation and pay rules validation.',
    longDescription: 'Designed and developed a sophisticated alerting system that automatically creates PSA tickets based on predefined rules. The system includes advanced pay rule validation, accrual calculations, and seamless integration with ticketing portals using AWS Step Functions and Lambda for scalable processing.',
    category: 'backend',
    technologies: ['Python', 'FastAPI', 'AWS Lambda', 'Step Functions', 'PostgreSQL', 'Redis'],
    achievements: [
      'Reduced manual ticket creation by 85%',
      'Improved response time for critical alerts by 60%',
      'Automated pay rule validation with 99.9% accuracy',
      'Integrated with multiple ticketing systems'
    ],
    featured: true
  },
  {
    id: 'api-n8n-workflow',
    title: 'API Creation and n8n Workflow Automation',
    description: 'Built robust APIs using Rust and designed automated workflows with n8n integration.',
    longDescription: 'Developed high-performance APIs using Rust for optimal speed and reliability. Created comprehensive workflow automation using n8n, including webhook integrations, data transformation pipelines, and third-party service connections. The system handles thousands of requests per minute with minimal latency.',
    category: 'backend',
    technologies: ['Rust', 'n8n', 'Webhooks', 'PostgreSQL', 'Docker', 'API Gateway'],
    achievements: [
      'Achieved 99.99% API uptime',
      'Reduced workflow processing time by 70%',
      'Integrated 15+ third-party services',
      'Built scalable webhook infrastructure'
    ],
    featured: true
  },
  {
    id: 'server-migration',
    title: 'Server Maintenance and Live Migration',
    description: 'Performed critical live server migrations with zero downtime and resolved complex database issues.',
    longDescription: 'Led complex server migration projects involving live production systems. Successfully migrated multiple MongoDB databases, resolved connection pool issues, and maintained system integrity throughout the migration process. Implemented comprehensive monitoring and rollback strategies.',
    category: 'devops',
    technologies: ['MongoDB', 'Docker', 'Kubernetes', 'Ansible', 'Monitoring', 'Bash'],
    achievements: [
      'Achieved zero-downtime migrations',
      'Reduced server response time by 40%',
      'Resolved critical MongoDB connection issues',
      'Implemented automated backup strategies'
    ],
    featured: false
  },
  {
    id: 'billing-analytics',
    title: 'Product Analysis and Automated Billing',
    description: 'Comprehensive billing automation system with advanced analytics and client data management.',
    longDescription: 'Built an end-to-end billing system that automatically processes usage data, generates billing sheets using Pandas, and provides detailed analytics. The system includes client data management, usage tracking, and automated report generation with AWS Step Functions integration.',
    category: 'analytics',
    technologies: ['Python', 'Pandas', 'AWS Step Functions', 'PostgreSQL', 'PowerBI', 'Excel API'],
    achievements: [
      'Automated 95% of billing processes',
      'Reduced billing errors by 90%',
      'Generated comprehensive usage analytics',
      'Built real-time dashboard reporting'
    ],
    featured: true
  },
  {
    id: 'sql-automation',
    title: 'SQL Query Automation and Data Pipeline',
    description: 'Advanced SQL automation system for data extraction, transformation, and reporting.',
    longDescription: 'Developed a comprehensive SQL automation framework that handles complex data extraction, transformation, and loading processes. The system includes query optimization, automated scheduling, and intelligent error handling with detailed logging and monitoring capabilities.',
    category: 'backend',
    technologies: ['Python', 'SQL', 'Apache Airflow', 'PostgreSQL', 'MySQL', 'Data Pipelines'],
    achievements: [
      'Reduced manual query execution by 80%',
      'Optimized query performance by 65%',
      'Automated daily reporting processes',
      'Built intelligent error recovery system'
    ],
    featured: false
  },
  {
    id: 'dashboard-kibana',
    title: 'Kibana Analytics Dashboard',
    description: 'Interactive dashboards for partner insights, sales analytics, and operational monitoring.',
    longDescription: 'Created comprehensive analytics dashboards using Kibana for real-time monitoring of partner activities, sales performance, and operational metrics. The dashboards provide actionable insights with customizable visualizations, alert mechanisms, and automated report generation.',
    category: 'analytics',
    technologies: ['Kibana', 'Elasticsearch', 'Python', 'JavaScript', 'Data Visualization', 'APIs'],
    achievements: [
      'Built 20+ interactive dashboards',
      'Improved decision-making speed by 50%',
      'Integrated multiple data sources',
      'Created automated alert systems'
    ],
    featured: false
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Code },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'devops', label: 'DevOps', icon: Cloud },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'backend': return Server;
      case 'devops': return Cloud;
      case 'analytics': return BarChart3;
      default: return Code;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'backend': return 'text-primary bg-primary/10 border-primary/20';
      case 'devops': return 'text-accent bg-accent/10 border-accent/20';
      case 'analytics': return 'text-primary-glow bg-primary-glow/10 border-primary-glow/20';
      default: return 'text-foreground bg-muted border-border';
    }
  };

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="projects"
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
            Featured{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my key projects and technical achievements
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 ${
                  isActive 
                    ? 'bg-gradient-primary text-primary-foreground' 
                    : 'hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </Button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category);
              
              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  layout
                  className="group cursor-pointer"
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass h-full">
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    <CardContent className="p-6 space-y-4 h-full flex flex-col">
                      {/* Project Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`p-2 rounded-lg ${getCategoryColor(project.category)}`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <CategoryIcon className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                        >
                          View Details
                        </Button>
                        
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-primary"
                            >
                              <Github className="w-4 h-4" />
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-primary"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
              
              {/* Modal Content */}
              <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="bg-card border-border shadow-glass">
                  <CardContent className="p-8 space-y-6">
                    {/* Modal Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">
                          {selectedProject.title}
                        </h3>
                        <Badge className={getCategoryColor(selectedProject.category)}>
                          {selectedProject.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProject(null)}
                        className="hover:text-primary"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Long Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {selectedProject.achievements.map((achievement, index) => (
                          <li key={index} className="text-muted-foreground flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6 border-t border-border">
                      {selectedProject.githubUrl && (
                        <Button className="bg-gradient-primary hover:shadow-primary">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </Button>
                      )}
                      {selectedProject.liveUrl && (
                        <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};