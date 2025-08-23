import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink,
  Github,
  Calendar,
  Users,
  Zap,
  Database,
  Cloud,
  Code,
  Server,
  BarChart3,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'backend' | 'frontend' | 'fullstack' | 'automation' | 'analytics';
  icon: typeof Code;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  year: string;
  impact: string;
  features: string[];
  status: 'completed' | 'ongoing' | 'archived';
}

const projects: Project[] = [
  {
    id: 'alerting-psa',
    title: 'Alerting & PSA Ticket Creation System',
    description: 'Comprehensive alerting system with automated ticket creation and pay rules validation.',
    longDescription: 'Built a sophisticated alerting system that integrates with PSA platforms for automated ticket creation. The system includes advanced pay rules validation, accrual calculations, and seamless integration with existing workflows.',
    technologies: ['Python', 'FastAPI', 'AWS Lambda', 'Step Functions', 'PostgreSQL', 'Redis'],
    category: 'backend',
    icon: Zap,
    image: '/placeholder.svg',
    year: '2023-2024',
    impact: 'Reduced manual ticket creation by 85%',
    features: [
      'Automated pay rules validation and accrual calculation',
      'Real-time alerting with customizable thresholds',
      'Integration with multiple PSA platforms',
      'Comprehensive audit logging and reporting',
      'Scalable serverless architecture'
    ],
    status: 'completed'
  },
  {
    id: 'api-n8n-workflow',
    title: 'API Creation & n8n Workflow System',
    description: 'High-performance API infrastructure with automated workflow orchestration using n8n.',
    longDescription: 'Designed and implemented a robust API ecosystem using Rust for high-performance endpoints, integrated with n8n for workflow automation. The system handles complex business logic and data transformations.',
    technologies: ['Rust', 'n8n', 'PostgreSQL', 'Docker', 'Webhooks', 'JSON APIs'],
    category: 'backend',
    icon: Code,
    image: '/placeholder.svg',
    year: '2023',
    impact: 'Improved API response time by 60%',
    features: [
      'High-performance Rust APIs for critical operations',
      'Visual workflow automation with n8n',
      'Webhook-based event processing',
      'Comprehensive API documentation',
      'Load balancing and fault tolerance'
    ],
    status: 'completed'
  },
  {
    id: 'server-migration',
    title: 'Server Maintenance & Live Migration',
    description: 'Zero-downtime server migrations and comprehensive maintenance automation.',
    longDescription: 'Led critical server infrastructure migrations with zero downtime. Implemented automated maintenance procedures, resolved complex MongoDB connection issues, and ensured system integrity throughout the migration process.',
    technologies: ['Linux', 'MongoDB', 'Docker', 'Kubernetes', 'Bash', 'Python'],
    category: 'backend',
    icon: Server,
    image: '/placeholder.svg',
    year: '2022-2023',
    impact: 'Achieved 99.9% uptime during migrations',
    features: [
      'Zero-downtime migration strategies',
      'Automated backup and recovery procedures',
      'Real-time system monitoring and alerting',
      'Database optimization and performance tuning',
      'Infrastructure as Code implementation'
    ],
    status: 'completed'
  },
  {
    id: 'billing-analytics',
    title: 'Product Analysis & Billing Automation',
    description: 'Automated billing system with comprehensive analytics and client data management.',
    longDescription: 'Developed a comprehensive billing automation system that manages client data, automates software usage tracking, and generates detailed billing reports using advanced data processing techniques.',
    technologies: ['Python', 'Pandas', 'AWS Step Functions', 'PostgreSQL', 'PowerBI', 'APIs'],
    category: 'analytics',
    icon: BarChart3,
    image: '/placeholder.svg',
    year: '2022-Present',
    impact: 'Reduced billing errors by 95%',
    features: [
      'Automated usage data collection and processing',
      'Dynamic billing calculations with Pandas',
      'Client portal with real-time usage insights',
      'Comprehensive reporting and analytics',
      'Integration with multiple payment gateways'
    ],
    status: 'ongoing'
  },
  {
    id: 'licensing-portal',
    title: 'Comprehensive Licensing Portal',
    description: 'Full-featured licensing management system with client portal and analytics.',
    longDescription: 'Built a complete licensing portal that manages software licenses, tracks usage, handles renewals, and provides clients with detailed insights into their license utilization and compliance status.',
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'AWS', 'JWT'],
    category: 'fullstack',
    icon: Shield,
    image: '/placeholder.svg',
    year: '2023',
    impact: 'Streamlined license management for 500+ clients',
    features: [
      'Automated license provisioning and deprovisioning',
      'Real-time usage tracking and compliance monitoring',
      'Client self-service portal with detailed analytics',
      'Automated renewal notifications and processing',
      'Integration with existing CRM and billing systems'
    ],
    status: 'completed'
  },
  {
    id: 'sql-automation',
    title: 'SQL Query Automation & Data Processing',
    description: 'Advanced SQL automation system for data extraction, transformation, and reporting.',
    longDescription: 'Created sophisticated SQL automation tools that handle complex data extraction, transformation, and loading processes. The system includes query optimization, automated reporting, and real-time data processing capabilities.',
    technologies: ['Python', 'SQL', 'MySQL', 'PostgreSQL', 'Pandas', 'Airflow'],
    category: 'automation',
    icon: Database,
    image: '/placeholder.svg',
    year: '2020-2022',
    impact: 'Reduced data processing time by 70%',
    features: [
      'Automated data extraction and transformation pipelines',
      'Query optimization and performance monitoring',
      'Scheduled reporting with customizable templates',
      'Data quality validation and error handling',
      'Integration with multiple database systems'
    ],
    status: 'completed'
  }
];

const categoryColors = {
  backend: 'bg-primary/10 text-primary border-primary/20',
  frontend: 'bg-accent/10 text-accent border-accent/20',
  fullstack: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  automation: 'bg-green-500/10 text-green-500 border-green-500/20',
  analytics: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
};

const statusColors = {
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  ongoing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  archived: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
};

export const EnhancedProjects: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const categories = Array.from(new Set(projects.map(project => project.category)));
  const filteredProjects = selectedCategory 
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

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
    hidden: { opacity: 0, y: 50 },
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
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="projects"
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
            Featured{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of impactful projects that demonstrate technical expertise and problem-solving capabilities
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
            All Projects
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                selectedCategory === category 
                  ? categoryColors[category as keyof typeof categoryColors].replace('/10', '/20').replace('/20', '')
                  : 'bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            const isExpanded = expandedProject === project.id;

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-glass group h-full overflow-hidden">
                  <CardContent className="p-0">
                    {/* Project Image/Header */}
                    <div className="relative h-48 bg-gradient-subtle overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-16 h-16 text-primary" />
                      </motion.div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className={`${statusColors[project.status]}`}>
                          {project.status}
                        </Badge>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${categoryColors[project.category]} capitalize`}>
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 space-y-4">
                      {/* Project Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{project.year}</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-accent">
                          {project.impact}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {isExpanded ? project.longDescription : project.description}
                      </p>

                      {/* Features (shown when expanded) */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3"
                        >
                          <h4 className="font-semibold text-foreground">Key Features:</h4>
                          <ul className="space-y-1">
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                <ArrowRight className="w-3 h-3 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Technologies */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Technologies:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border border-muted/50 hover:border-primary/30 hover:text-primary transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          {isExpanded ? 'Show Less' : 'Learn More'}
                          <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </Button>

                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <Button variant="outline" size="sm">
                              <Github className="w-4 h-4 mr-1" />
                              Code
                            </Button>
                          )}
                          {project.demoUrl && (
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Demo
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Project Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: 'Projects Completed', value: '15+', icon: Layers },
            { label: 'Lines of Code', value: '100K+', icon: Code },
            { label: 'Systems Deployed', value: '25+', icon: Cloud },
            { label: 'Users Impacted', value: '10K+', icon: Users }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center space-y-3 p-4 rounded-lg bg-card/50"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
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