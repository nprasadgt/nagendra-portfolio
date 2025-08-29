import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Code,
  GraduationCap,
  MapPin,
  Settings
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    date: 'Jun 2024 – Present',
    title: 'Technical Specialist',
    company: 'WarpDrive Tech Works LLP',
    location: 'Bengaluru, Karnataka, India',
    type: 'work',
    icon: Building2,
    description: 'Designing and building backend services and modern frontends, leading cloud/DevOps initiatives, and integrating AI into engineering workflows.',
    achievements: [
      'Designed and developed scalable backend services and APIs',
      'Built modern, performant frontends using React/TypeScript',
      'Led cloud & DevOps efforts to improve reliability and delivery',
      'Integrated AI into development workflows to accelerate delivery',
    ],
    technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'GCP', 'CI/CD', 'DevOps']
  },
  {
    id: 'consecure-sse',
    date: 'Apr 2023 – May 2024',
    title: 'Senior Software Engineer',
    company: 'Consecure Technologies Pvt Ltd',
    location: 'Bengaluru, Karnataka, India',
    type: 'work',
    icon: Building2,
    description: 'Built and maintained platform features and services, collaborating across teams to deliver business-critical solutions.',
    achievements: [
      'Developed backend services and APIs with Python/FastAPI',
      'Implemented data processing and automation pipelines',
      'Collaborated with stakeholders to deliver features on schedule',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Rust', 'Axum', 'Redis', 'ElasticSearch', 'Kibana']
  },
  {
    id: 'hashinclude-sse',
    date: 'Jan 2023 – Mar 2023',
    title: 'Senior Software Engineer',
    company: 'Hashinclude Computech Pvt Ltd',
    location: 'Bengaluru, Karnataka, India',
    type: 'work',
    icon: Building2,
    description: 'Delivered high-impact features and supported production systems in a fast-paced environment.',
    achievements: [
      'Owned end-to-end delivery of key backend features',
      'Improved system reliability and performance',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'ElasticSearch', 'Kibana']
  },
  {
    id: 'hashinclude-se',
    date: 'Sep 2022 – Dec 2022',
    title: 'Software Engineer',
    company: 'Hashinclude Computech Pvt Ltd',
    location: 'Bengaluru, Karnataka, India',
    type: 'work',
    icon: Code,
    description: 'Contributed to application development, collaborating closely with cross-functional teams.',
    achievements: [
      'Built features and fixed critical bugs across the stack',
      'Wrote clean, maintainable code and unit tests',
    ],
    technologies: ['Python', 'React', 'PostgreSQL', 'Redis', 'ElasticSearch', 'Kibana']
  },
  {
    id: 'ksrtc-system',
    date: 'Jul 2020 – Aug 2022',
    title: 'System Engineer',
    company: 'KSRTC | India',
    location: 'Tiptur, Karnataka, India',
    type: 'work',
    icon: Settings,
    description: 'Implemented automation and analytics for fleet systems and operational efficiency.',
    achievements: [
      'Designed data dashboards and analytics for operations',
      'Automated processes and improved system efficiency',
    ],
    technologies: ['MySQL', 'DB Management', 'Server Configuration', 'System Management', 'Microsoft Office', 'Python']
  },
  {
    id: 'ksrtc-maintenance',
    date: 'Feb 2018 – Jun 2020',
    title: 'Maintenance Supervisor',
    company: 'KSRTC | India',
    location: 'Turuvekere, Karnataka, India',
    type: 'work',
    icon: Settings,
    description: 'Led maintenance operations, optimized schedules, and supported data-driven decisions.',
    achievements: [
      'Improved vehicle reliability through proactive maintenance',
      'Managed resources and maintenance schedules',
    ],
    technologies: ['Preventive Maintenance', 'Microsoft Excel', 'Team Lead', 'Resource Management']
  },
  {
    id: 'education',
    date: 'Sep 2013 - May 2016',
    title: 'Bachelor of Engineering - Mechanical',
    company: 'BMS College of Engineering',
    location: 'Bangalore, Karnataka, India',
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
  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({});
  const wheelDxRightRef = useRef(0);
  const wheelDxLeftRef = useRef(0);
  const WHEEL_THRESHOLD = 60; // higher = slower horizontal scroll

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    const target = Math.max(0, current - 1);
    if (target !== current) emblaApi.scrollTo(target);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    const last = emblaApi.scrollSnapList().length - 1;
    const target = Math.min(last, current + 1);
    if (target !== current) emblaApi.scrollTo(target);
  }, [emblaApi]);

  // Enable horizontal scrolling via mouse/trackpad wheel
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!emblaApi) return;
      // Only respond to horizontal wheel gestures (deltaX). Let vertical scrolling pass through.
      const dx = e.deltaX;
      if (Math.abs(dx) <= 0) return; // vertical-only scroll; do nothing
      // Prevent browser back/forward navigation on macOS horizontal swipe
      e.preventDefault();
      if (dx > 0) {
        wheelDxRightRef.current += dx;
        wheelDxLeftRef.current = 0;
      } else if (dx < 0) {
        wheelDxLeftRef.current += Math.abs(dx);
        wheelDxRightRef.current = 0;
      }

      if (wheelDxRightRef.current > WHEEL_THRESHOLD) {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        }
        wheelDxRightRef.current = 0;
      } else if (wheelDxLeftRef.current > WHEEL_THRESHOLD) {
        if (emblaApi.canScrollPrev()) {
          emblaApi.scrollPrev();
        }
        wheelDxLeftRef.current = 0;
      }
    },
    [emblaApi]
  );

  // Optional: keyboard support for left/right arrows when focused
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi) return;
      if (e.key === 'ArrowRight' && emblaApi.canScrollNext()) {
        e.preventDefault();
        emblaApi.scrollNext();
      } else if (e.key === 'ArrowLeft' && emblaApi.canScrollPrev()) {
        e.preventDefault();
        emblaApi.scrollPrev();
      }
    },
    [emblaApi]
  );

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
      className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="timeline"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-3"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Career{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-lg text-muted-foreground whitespace-nowrap max-w-none mx-auto">
            Explore my professional timeline - scroll or drag to navigate through my career milestones
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-2"
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
            <span className="text-sm font-medium text-muted-foreground">
              Scroll to explore • {selectedIndex + 1} of {timelineEvents.length}
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
          <div
            className="overflow-x-hidden"
            ref={emblaRef}
            style={{ overflowY: 'visible', overscrollBehaviorX: 'contain' }}
            onWheel={handleWheel}
          >
            <div className="flex gap-6 pt-6">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isActive = false; // disable default active styling; only hover will highlight

                return (
                  <motion.div
                    key={event.id}
                    className="flex-none w-80 sm:w-96"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className={`relative mx-auto w-12 h-12 rounded-full border-2 flex items-center justify-center mb-6 ${getTypeColor(event.type)} transition-all duration-300`}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-6 h-6" />
                      {/* Subtle ring on hover only */}
                      <motion.div
                        className="absolute -inset-1 rounded-full border border-primary/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.6, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
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
                              {(expandedTech[event.id] ? event.technologies : event.technologies.slice(0, 4)).map((tech, idx) => (
                                <motion.span
                                  key={idx}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded border border-primary/20"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                              {event.technologies.length > 4 && !expandedTech[event.id] && (
                                <button
                                  type="button"
                                  onClick={() => setExpandedTech(prev => ({ ...prev, [event.id]: true }))}
                                  className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded border border-border/50 hover:bg-muted/80 transition-colors"
                                >
                                  +{event.technologies.length - 4} more
                                </button>
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
