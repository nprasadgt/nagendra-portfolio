import { About } from '@/components/About';
import { Education } from '@/components/Education';
import { EnhancedContact } from '@/components/EnhancedContact';
import { EnhancedProjects } from '@/components/EnhancedProjects';
import { EnhancedSkills } from '@/components/EnhancedSkills';
import { Hero } from '@/components/Hero';
import { HorizontalTimeline } from '@/components/HorizontalTimeline';
import { Navigation } from '@/components/Navigation';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'timeline', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navigation
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <Navigation 
          activeSection={activeSection} 
          onSectionClick={scrollToSection} 
        />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <section id="home" className="relative">
            <Hero onScrollToSection={scrollToSection} />
          </section>

          {/* About Section */}
          <section id="about" className="relative">
            <About />
          </section>

          {/* Timeline Section */}
          <section id="timeline" className="relative bg-gradient-subtle">
            <HorizontalTimeline />
          </section>

          {/* Skills Section */}
          <section id="skills" className="relative">
            <EnhancedSkills />
          </section>

          {/* Projects Section */}
          <section id="projects" className="relative bg-gradient-subtle">
            <EnhancedProjects />
          </section>

          {/* Education Section */}
          <section id="education" className="relative">
            <Education />
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative bg-gradient-subtle">
            <EnhancedContact />
          </section>
        </main>

        {/* Footer */}
        <motion.footer 
          className="py-12 px-4 sm:px-6 lg:px-8 bg-card border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-muted-foreground">
                © 2025 Nagendra Prasad G T. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Built with React, TypeScript, and Tailwind CSS
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </ParallaxProvider>
  );
};

export default Portfolio;