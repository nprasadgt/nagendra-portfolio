import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  Building2, 
  Code, 
  Settings, 
  GraduationCap, 
  Users, 
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

export const HorizontalTimeline: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    loop: false
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

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
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
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
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
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
              Journey
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my professional timeline - scroll or drag to navigate through my career milestones
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/10 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Drag to explore • {selectedIndex + 1} of {timelineEvents.length}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/10 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div variants={itemVariants} className="relative">
          {/* Timeline Line */}
          <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary-glow" />
          
          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isActive = index === selectedIndex;

                return (
                  <motion.div
                    key={event.id}
                    className="flex-none w-80 sm:w-96"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className={`relative mx-auto w-12 h-12 rounded-full border-2 flex items-center justify-center mb-6 ${getTypeColor(event.type)} transition-all duration-300 ${
                        isActive ? 'scale-125 shadow-glow' : 'scale-100'
                      }`}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-6 h-6" />
                      <motion.div
                        className="absolute -inset-2 rounded-full border border-primary/20"
                        animate={{
                          scale: isActive ? [1, 1.2, 1] : 1,
                          opacity: isActive ? [0.5, 0, 0.5] : 0,
                        }}
                        transition={{
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Event Card */}
                    <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass h-[400px] overflow-hidden">
                      <CardContent className="p-6 h-full flex flex-col">
                        {/* Event Header */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground leading-tight">
                            {event.title}
                          </h3>
                          <p className="text-primary font-semibold">
                            {event.company}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {event.description}
                        </p>

                        {/* Technologies */}
                        {event.technologies && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">
                              Tech Stack:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {event.technologies.slice(0, 4).map((tech, idx) => (
                                <motion.span
                                  key={idx}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded border border-primary/20"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                              {event.technologies.length > 4 && (
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded">
                                  +{event.technologies.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {timelineEvents.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};