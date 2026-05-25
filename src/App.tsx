import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { Gallery } from './components/Gallery';
import { VideoPlayer } from './components/VideoPlayer';
import { LoveNotes } from './components/LoveNotes';
import { Details } from './components/Details';
import { Footer } from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or browser preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to document element on changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-charcoal-900 transition-colors duration-500 selection:bg-blush-200/50 dark:selection:bg-gold-300/20">
      {/* Navigation */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Landing */}
        <Hero />

        {/* 2. Our Story Timeline */}
        <OurStory />

        {/* 3. Photo Gallery */}
        <Gallery />

        {/* 4. Video memories */}
        <VideoPlayer />

        {/* 5. Love Notes guestbook */}
        <LoveNotes />

        {/* 6. Wedding Details */}
        <Details />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
