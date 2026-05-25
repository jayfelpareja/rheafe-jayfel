import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';

const bgImages = [
  '/images/DSCF3818.jpg',
  '/images/DSCF0957.jpg',
  '/images/DSCF1154.jpg',
  '/images/DSCF0991.jpg',
  '/images/DSCF0929.jpg',
];

export const Hero: React.FC = () => {
  const weddingDate = new Date('2026-04-25T13:00:00+08:00'); // Wedding date: April 25, 2026
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background image slideshow rotation (cycles every 6 seconds)
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(bgTimer);
  }, []);

  // Time elapsed count-up calculation
  useEffect(() => {
    const calculateTimeElapsed = () => {
      const difference = +new Date() - +weddingDate;
      if (difference <= 0) {
        setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeElapsed({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeElapsed();
    const timer = setInterval(calculateTimeElapsed, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow with Framer Motion AnimatePresence */}
      <div className="absolute inset-0 z-0 bg-stone-900">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center select-none"
            style={{ backgroundImage: `url('${bgImages[currentBgIndex]}')` }}
          />
        </AnimatePresence>
        {/* Soft elegant overlays for premium feel and contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Just Married Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center space-x-2 text-gold-200 uppercase tracking-widest text-xs md:text-sm font-semibold mb-6 bg-black/45 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15"
        >
          <Heart size={14} className="text-gold-300 animate-pulse-slow fill-current" />
          <span>Just Married &bull; April 25, 2026</span>
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-script text-7xl md:text-9xl font-extralight text-white tracking-wide mb-6 drop-shadow-sm select-none"
        >
          Rheafe &amp; Jayfel
        </motion.h1>

        {/* Date and Location */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif italic text-lg md:text-2xl text-stone-200 tracking-wider mb-10 drop-shadow-sm"
        >
          April 25, 2026 &bull; 140 Kalayaan Ave, Diliman, Quezon City
        </motion.p>

        {/* Count-Up Timer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col items-center mb-12"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gold-200 font-semibold mb-4 bg-black/40 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
            Our Married Journey
          </span>
          <div className="flex space-x-4 md:space-x-8">
            {[
              { label: 'Days', value: timeElapsed.days },
              { label: 'Hours', value: timeElapsed.hours },
              { label: 'Mins', value: timeElapsed.minutes },
              { label: 'Secs', value: timeElapsed.seconds },
            ].map((unit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg shadow-lg mb-2 bg-black/45 backdrop-blur-md border border-white/10">
                  <span className="font-serif text-xl md:text-3xl font-medium text-gold-200">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-300 font-semibold drop-shadow-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a
            href="#story"
            className="px-8 py-3.5 bg-white text-stone-900 font-sans text-sm font-semibold rounded-full hover:bg-stone-100 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-300"
          >
            Our Story
          </a>
          <a
            href="#gallery"
            className="px-8 py-3.5 bg-black/30 text-white font-sans text-sm font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300"
          >
            View Gallery
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer text-stone-300 hover:text-white transition-colors"
        onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold mb-2">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
};
