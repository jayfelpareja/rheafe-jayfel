import React from 'react';
import { Heart, ArrowUp, Sun, Moon } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, setDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 md:py-24 bg-stone-50 dark:bg-charcoal-900 border-t border-stone-200/20 dark:border-charcoal-800 flex flex-col items-center">
      <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border border-stone-200 dark:border-charcoal-800 flex items-center justify-center text-stone-400 dark:text-stone-500 hover:text-stone-900 dark:hover:text-gold-200 hover:border-stone-400 dark:hover:border-gold-300/30 transition-all duration-300 mb-12 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>

        {/* Couple Signature */}
        <h2 className="font-script text-5xl md:text-6xl font-extralight text-stone-900 dark:text-gold-200 tracking-wider mb-6 select-none">
          Rheafe &amp; Jayfel
        </h2>

        {/* Romantic Quote */}
        <blockquote className="max-w-md mx-auto mb-6">
          <p className="font-serif italic text-sm md:text-base text-stone-500 dark:text-stone-400 leading-relaxed">
            “Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.”
          </p>
          <cite className="font-sans text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 font-semibold block mt-3 not-italic">
            &mdash; Genesis 2:24 (KJV)
          </cite>
        </blockquote>

        {/* Theme Toggle Module */}
        <div className="mb-10">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full border border-stone-200 dark:border-charcoal-800 text-stone-600 dark:text-gold-200 hover:bg-stone-100 dark:hover:bg-charcoal-800 hover:text-stone-900 dark:hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Social Icons / Hashtag */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          <span className="font-sans text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 font-semibold">
            #RheafeAndJayfel2026 <br />
            #April252026
          </span>
        </div>

        {/* Copyright & Sign-off */}
        <div className="flex items-center space-x-1.5 text-xs text-stone-400 dark:text-stone-500 font-sans">
          <span>Made with</span>
          <Heart size={12} className="fill-current text-blush-200 dark:text-gold-300 animate-pulse-slow" />
          <span>for Rheafe &amp; Jayfel &bull; &copy; 2026</span>
        </div>

      </div>
    </footer>
  );
};