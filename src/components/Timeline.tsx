import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Code,
  GraduationCap,
  MapPin,
  Settings,
  Users
} from 'lucide-react';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  company: string;
  location: string;
  type: 'work' | 'education' | 'achievement';
  icon: typeof Building2;
  description: string;
  achievements: string[];
  technologies?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'current',
    date: 'Sep 2022 - Present',
    title: 'Technical Specialist / Backend Developer',
    company: 'ConnectSecure (CyberCNS)',
    location: 'Remote',
    type: 'work',
    icon: Building2,
    description: 'Leading design and development of critical systems, managing serverless workflows, and mentoring junior engineers.',
    achievements: [
      'Led design and development of scripts for pay rules, accrual and validation',
      'Built and maintained Python scripts and FastAPI services',
      'Created APIs using Rust for high-performance applications',
      'Designed features based on client feedback and requirements',
      'Built serverless workflows using AWS Step Functions and Lambda',
      'Developed a comprehensive licensing portal',
      'Managed server maintenance and live migrations',
      'Automated billing and analytics using dataframes and Python'
    ],
    technologies: ['Python', 'FastAPI', 'Rust', 'AWS Lambda', 'Step Functions', 'PostgreSQL']
  },
  {
    id: 'interviewer',
    date: 'Jun 2024 - Present',
    title: 'Technical Specialist & Interviewer',
    company: 'ConnectSecure',
    location: 'Remote',
    type: 'achievement',
    icon: Users,
    description: 'Conducting technical interviews and contributing to solution architecture for client projects.',
    achievements: [
      'Conduct technical interviews to assess candidate capabilities',
      'Mentor junior engineers and provide technical guidance',
      'Contribute to solution architecture and technical strategy',
      'Lead technical discussions for client project requirements'
    ],
    technologies: ['Leadership', 'Mentoring', 'Solution Architecture', 'Technical Interviews']
  },
  {
    id: 'ksrtc-software',
    date: 'Jul 2020 - Sep 2022',
    title: 'Software Engineer',
    company: 'KSRTC (Karnataka)',
    location: 'Karnataka, India',
    type: 'work',
    icon: Code,
    description: 'Developed advanced data solutions and automation systems to improve operational efficiency.',
    achievements: [
      'Developed advanced MySQL queries and automation systems',
      'Implemented data-driven decision support systems',
      'Maintained and updated critical software systems',
      'Improved fleet reliability and operational efficiency by 25%',
      'Designed comprehensive dashboards in Kibana for partner and sales insights',
      'Created event sets and webhooks for automated ticket generation'
    ],
    technologies: ['MySQL', 'Kibana', 'Python', 'Webhooks', 'Data Analytics']
  },
  {
    id: 'ksrtc-maintenance',
    date: 'Feb 2018 - Jun 2020',
    title: 'Maintenance Engineer',
    company: 'KSRTC (Karnataka)',
    location: 'Karnataka, India',
    type: 'work',
    icon: Settings,
    description: 'Led maintenance operations and implemented automation solutions to optimize fleet management.',
    achievements: [
      'Led team maintenance operations, improving vehicle reliability',
      'Reduced vehicle breakdowns by 30% through proactive maintenance',
      'Managed resources and maintenance schedules effectively',
      'Used Redis queues and webhooks to automate alert generation',
      'Created MySQL-powered dashboards for maintenance tracking',
      'Built SQL scripts for data extraction and process automation'
    ],
    technologies: ['MySQL', 'Redis', 'Python', 'SQL', 'Process Automation']
  },
  {
    id: 'education',
    date: '2013 - 2016',
    title: 'Bachelor of Engineering - Mechanical',
    company: 'BMS College of Engineering',
    location: 'Bangalore, India',
    type: 'education',
    icon: GraduationCap,
    description: 'Earned B.E. in Mechanical Engineering with excellent academic performance.',
    achievements: [
      'Graduated with 8.96 CGPA',
      'Developed foundational skills in engineering and problem solving',
      'Built strong analytical and mathematical foundation',
      'Participated in various technical projects and competitions'
    ],
    technologies: ['Engineering Fundamentals', 'Problem Solving', 'Analytics', 'Project Management']
  }
];

export const Timeline: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut" as const,
      },
    },
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'text-primary border-primary bg-primary/10';
      case 'education':
        return 'text-accent border-accent bg-accent/10';
      case 'achievement':
        return 'text-accent-glow border-accent-glow bg-accent-glow/10';
      default:
        return 'text-primary border-primary bg-primary/10';
    }
  };

  return (
    <section
      ref={ref}
      className="py-2 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      id="timeline"
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
            Career{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional experiences and achievements
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-glow origin-top"
            variants={lineVariants}
          />

          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isExpanded = expandedEvent === event.id;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${getTypeColor(event.type)}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>

                  {/* Event Card */}
                  <motion.div
                    className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Event Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4" />
                                <span>{event.date}</span>
                                <MapPin className="w-4 h-4 ml-2" />
                                <span>{event.location}</span>
                              </div>
                              <h3 className="text-xl font-bold text-foreground mb-1">
                                {event.title}
                              </h3>
                              <p className="text-primary font-semibold">
                                {event.company}
                              </p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground">
                            {event.description}
                          </p>

                          {/* Expand Button */}
                          <Button
                            variant="ghost"
                            onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                            className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <span>
                              {isExpanded ? 'Show Less' : 'Show Details'}
                            </span>
                            {isExpanded ? 
                              <ChevronDown className="w-4 h-4" /> : 
                              <ChevronRight className="w-4 h-4" />
                            }
                          </Button>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4 border-t border-border pt-4"
                              >
                                {/* Achievements */}
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">
                                    Key Achievements:
                                  </h4>
                                  <ul className="space-y-1">
                                    {event.achievements.map((achievement, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {achievement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Technologies */}
                                {event.technologies && (
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-2">
                                      Technologies Used:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {event.technologies.map((tech, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded border border-primary/20"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
