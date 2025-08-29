import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { Award, BookOpen, Calendar, GraduationCap, MapPin, Trophy } from 'lucide-react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  cgpa?: string;
  description: string;
  highlights: string[];
  type: 'degree' | 'certification' | 'course';
}

const education: EducationItem[] = [
  {
    id: 'bms-college',
    degree: 'Bachelor of Engineering - Mechanical Engineering',
    institution: 'BMS College of Engineering',
    location: 'Bangalore, India',
    duration: '2013 - 2016',
    cgpa: '8.96',
    description: 'Completed Bachelor of Engineering in Mechanical Engineering with excellent academic performance, developing strong analytical and problem-solving skills.',
    highlights: [
      'Graduated with CGPA of 8.96/10',
      'Developed strong foundation in engineering principles',
      'Participated in technical projects and competitions',
      'Built analytical and mathematical problem-solving skills',
      'Gained experience in CAD design and manufacturing processes'
    ],
    type: 'degree'
  }
];

const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    status: 'In Progress'
  },
  {
    name: 'Python Professional Developer',
    issuer: 'Python Institute',
    status: 'Completed'
  },
  {
    name: 'Docker & Kubernetes Mastery',
    issuer: 'Cloud Native Computing Foundation',
    status: 'Completed'
  },
  {
    name: 'FastAPI Advanced Development',
    issuer: 'FastAPI Community',
    status: 'Completed'
  }
];

export const Education: React.FC = () => {
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
      className="py-5 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      id="education"
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
            Education &{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Learning
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation and continuous learning journey
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Main Education */}
        <motion.div variants={itemVariants} className="space-y-8">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glass">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Education Icon and Basic Info */}
                    <div className="lg:col-span-1 space-y-4">
                      <motion.div
                        className="flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mx-auto lg:mx-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <GraduationCap className="w-10 h-10" />
                      </motion.div>
                      
                      <div className="text-center lg:text-left space-y-2">
                        <div className="flex items-center justify-center lg:justify-start text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{edu.location}</span>
                        </div>
                        {edu.cgpa && (
                          <div className="flex items-center justify-center lg:justify-start">
                            <Award className="w-4 h-4 mr-2 text-accent" />
                            <span className="font-semibold text-accent">CGPA: {edu.cgpa}/10</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Education Details */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <p className="text-xl text-primary font-semibold mb-4">
                          {edu.institution}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-primary" />
                          Key Highlights:
                        </h4>
                        <ul className="space-y-2">
                          {edu.highlights.map((highlight, index) => (
                            <motion.li
                              key={index}
                              className="text-muted-foreground flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={inView ? { 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: index * 0.1 }
                              } : {}}
                            >
                              <span className="text-primary mr-2 mt-1">•</span>
                              {highlight}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Professional{' '}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Certifications
              </span>
            </h3>
            <p className="text-muted-foreground">
              Continuous learning and professional development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                variants={cardVariants}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                } : {}}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <motion.div
                      className="flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-full mx-auto"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Trophy className="w-6 h-6" />
                    </motion.div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {cert.issuer}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'Completed' 
                          ? 'bg-accent/10 text-accent' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Philosophy */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-4"
              >
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-gradient-primary text-primary-foreground rounded-full mx-auto mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <BookOpen className="w-8 h-8" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-foreground">
                  Lifelong{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Learning
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  My engineering background provided a strong analytical foundation, 
                  but my real education comes from continuous learning, hands-on experience, 
                  and staying current with emerging technologies. I believe that in the 
                  fast-evolving tech landscape, adaptability and curiosity are just as 
                  important as formal education.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {['Problem Solving', 'Critical Thinking', 'Continuous Learning', 'Adaptability'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg border border-primary/20"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
