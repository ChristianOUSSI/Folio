"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sommaire from '../components/Sommaire';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Launcher from '../components/Launcher';
import Stats from '../components/Stats';
import Process from '../components/Process';
import { ErrorBoundary } from '../components/ErrorBoundary';
import BookContainer from '../components/BookContainer';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

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
          
          <main className="w-full h-full">
            <BookContainer>
              <ErrorBoundary>
                <Sommaire />
              </ErrorBoundary>
              
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
                <Stats />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Process />
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
            </BookContainer>
          </main>
        </div>
      )}
    </>
  );
}
