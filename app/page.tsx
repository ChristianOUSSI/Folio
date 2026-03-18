"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import ScrollTop from '../components/ScrollTop';
import Launcher from '../components/Launcher';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <ErrorBoundary>
        <Launcher onComplete={() => setShowContent(true)} />
      </ErrorBoundary>
      {showContent && (
        <>
          <ErrorBoundary>
            <Navbar />
          </ErrorBoundary>
          <main className="pt-16">
            <ErrorBoundary>
              <Hero />
            </ErrorBoundary>
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
            <ErrorBoundary>
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary>
              <Experience />
            </ErrorBoundary>
            <ErrorBoundary>
              <Education />
            </ErrorBoundary>
            <ErrorBoundary>
              <Certifications />
            </ErrorBoundary>
            <ErrorBoundary>
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary>
              <Blog />
            </ErrorBoundary>
            <ErrorBoundary>
              <Contact />
            </ErrorBoundary>
            <ErrorBoundary>
              <ScrollTop />
            </ErrorBoundary>
          </main>
        </>
      )}
    </>
  );
}
