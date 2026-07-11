"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Launcher from '../components/Launcher';
import { ErrorBoundary } from '../components/ErrorBoundary';
import BookContainer from '../components/BookContainer';
import ScrollContainer from '../components/ScrollContainer';

// Import split components
import { SommaireLeft, SommaireRight } from '../components/Sommaire';
import { HeroLeft, HeroRight } from '../components/Hero';
import { AboutLeft, AboutRight } from '../components/About';
import { SkillsLeft, SkillsRight } from '../components/Skills';
import { StatsLeft, StatsRight } from '../components/Stats';
import { ProcessLeft, ProcessRight } from '../components/Process';
import { ExperienceLeft, ExperienceRight } from '../components/Experience';
import { EducationLeft, EducationRight } from '../components/Education';
import { CertificationsLeft, CertificationsRight } from '../components/Certifications';
import { ProjectsLeft, ProjectsRight } from '../components/Projects';
import { BlogLeft, BlogRight } from '../components/Blog';
import { ContactLeft, ContactRight } from '../components/Contact';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pages = [
    { id: 'sommaire-left', component: <SommaireLeft /> },
    { id: 'sommaire-right', component: <SommaireRight /> },
    { id: 'hero-left', component: <HeroLeft /> },
    { id: 'hero-right', component: <HeroRight /> },
    { id: 'about-left', component: <AboutLeft /> },
    { id: 'about-right', component: <AboutRight /> },
    { id: 'skills-left', component: <SkillsLeft /> },
    { id: 'skills-right', component: <SkillsRight /> },
    { id: 'stats-left', component: <StatsLeft /> },
    { id: 'stats-right', component: <StatsRight /> },
    { id: 'process-left', component: <ProcessLeft /> },
    { id: 'process-right', component: <ProcessRight /> },
    { id: 'experience-left', component: <ExperienceLeft /> },
    { id: 'experience-right', component: <ExperienceRight /> },
    { id: 'education-left', component: <EducationLeft /> },
    { id: 'education-right', component: <EducationRight /> },
    { id: 'certifications-left', component: <CertificationsLeft /> },
    { id: 'certifications-right', component: <CertificationsRight /> },
    { id: 'projects-left', component: <ProjectsLeft /> },
    { id: 'projects-right', component: <ProjectsRight /> },
    { id: 'blog-left', component: <BlogLeft /> },
    { id: 'blog-right', component: <BlogRight /> },
    { id: 'contact-left', component: <ContactLeft /> },
    { id: 'contact-right', component: <ContactRight /> }
  ];

  return (
    <>
      <ErrorBoundary>
        <Launcher onComplete={() => setShowContent(true)} />
      </ErrorBoundary>
      {showContent && (
        <div className="relative w-full min-h-screen bg-[#020617]">
          {/* We keep the Navbar outside the book so it's always accessible */}
          <ErrorBoundary>
            <Navbar />
          </ErrorBoundary>
          
          <main className="w-full h-full flex items-center justify-center">
            {mounted && isMobile ? (
              <ScrollContainer 
                navItems={[
                  { label: "Sommaire", index: 0 },
                  { label: "Accueil", index: 1 },
                  { label: "À propos", index: 2 },
                  { label: "Compétences", index: 3 },
                  { label: "Statistiques", index: 4 },
                  { label: "Processus", index: 5 },
                  { label: "Expériences", index: 6 },
                  { label: "Formations", index: 7 },
                  { label: "Certifications", index: 8 },
                  { label: "Projets", index: 9 },
                  { label: "Blog", index: 10 },
                  { label: "Contact", index: 11 }
                ]}
              >
                {pages.map(page => (
                  <div key={page.id} className="w-full h-auto min-h-screen">
                    {page.component}
                  </div>
                ))}
              </ScrollContainer>
            ) : (
              <BookContainer>
                {pages.map(page => (
                  <div key={page.id} className="w-full h-full">
                    {page.component}
                  </div>
                ))}
              </BookContainer>
            )}
          </main>
        </div>
      )}
    </>
  );
}
