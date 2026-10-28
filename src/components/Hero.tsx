import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown, Heart, Lock } from 'lucide-react';

const bgImages = [
  '/images/DSCF3818.jpg',
  '/images/DSCF0957.jpg',
  '/images/DSCF1154.jpg',
  '/images/DSCF0991.jpg',
  '/images/DSCF0929.jpg',
];

const WEDDING_DATE = new Date('2026-04-25T13:00:00+08:00');
const PASSCODE = '04252026';
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Elapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/* Soft gold dust that drifts upward. Fixed values so it never reshuffles on re-render. */
const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  size: 3 + (i % 4) * 2,
  duration: 14 + (i % 5) * 3,
  delay: (i % 7) * 1.4,
  drift: (i % 2 === 0 ? 1 : -1) * (12 + (i % 3) * 10),
}));

const titleContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } },
};

const titleWord: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(14px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.3, ease: EASE },
  },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

/* One counter digit pair that slides when the value changes */
const RollingNumber: React.FC<{ value: number; reduce: boolean }> = ({ value, reduce }) => (
  <span className="relative inline-flex h-[1.2em] items-center justify-center overflow-hidden leading-[1.2]">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={reduce ? false : { y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? undefined : { y: '-100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="block tabular-nums"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
    </AnimatePresence>
  </span>
);

export const Hero: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  // Passcode states
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [wrong, setWrong] = useState(false);

  const [timeElapsed, setTimeElapsed] = useState<Elapsed>({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Background slideshow (resets whenever a dot is clicked)
  useEffect(() => {
    const t = setTimeout(
      () => setCurrentBgIndex((i) => (i + 1) % bgImages.length),
      6500
    );
    return () => clearTimeout(t);
  }, [currentBgIndex]);

  // Time since the wedding
  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const differenceMs = now.getTime() - WEDDING_DATE.getTime();
      if (differenceMs <= 0) return;

      const targetYear = WEDDING_DATE.getFullYear();
      const targetMonth = WEDDING_DATE.getMonth();
      const targetDay = WEDDING_DATE.getDate();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();

      let years = currentYear - targetYear;
      let months = currentMonth - targetMonth;
      let days = currentDay - targetDay;

      if (days < 0) {
        const previousMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
        days += previousMonthTotalDays;
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeElapsed({
        years,
        months,
        days,
        hours: Math.floor((differenceMs / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((differenceMs / (1000 * 60)) % 60),
        seconds: Math.floor((differenceMs / 1000) % 60),
      });
    };

    calculateTimeElapsed();
    const timer = setInterval(calculateTimeElapsed, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePasscode = (raw: string) => {
    const value = raw.replace(/\D/g, '').slice(0, 8);
    setPasscode(value);
    if (value.length < 8) return;

    if (value === PASSCODE) {
      setIsUnlocked(true);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setPasscode('');
      }, 650);
    }
  };

  const counterUnits = [
    { label: 'Years', value: timeElapsed.years, progress: timeElapsed.months / 12 },
    { label: 'Months', value: timeElapsed.months, progress: timeElapsed.months / 12 },
    { label: 'Days', value: timeElapsed.days, progress: timeElapsed.days / 31 },
    { label: 'Hours', value: timeElapsed.hours, progress: timeElapsed.hours / 24 },
    { label: 'Mins', value: timeElapsed.minutes, progress: timeElapsed.minutes / 60 },
    { label: 'Secs', value: timeElapsed.seconds, progress: timeElapsed.seconds / 60 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-900"
    >
      {/* Background Images with slow Ken Burns zoom + parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[15%] z-0 h-[130%]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.14 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2, ease: 'easeInOut' },
              scale: { duration: 9, ease: 'linear' },
            }}
            className="absolute inset-0 bg-cover bg-center select-none"
            style={{ backgroundImage: `url('${bgImages[currentBgIndex]}')` }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

      {/* Floating gold dust */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute bottom-0 rounded-full bg-gold-200/70 blur-[1px]"
              style={{ left: p.left, width: p.size, height: p.size }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: '-100vh', x: p.drift, opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex items-center space-x-2 text-gold-200 uppercase tracking-widest text-xs md:text-sm font-semibold mb-6 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/15 shadow-lg shadow-black/20"
        >
          <Heart size={14} className="text-gold-300 animate-pulse-slow fill-current" />
          <span>April 25, 2026</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="show"
          aria-label="Rheafe & Jayfel"
          className="font-script text-7xl md:text-9xl font-extralight text-white tracking-wide mb-6 select-none flex flex-wrap justify-center gap-x-4 md:gap-x-8 [text-shadow:0_4px_30px_rgba(0,0,0,0.35)]"
        >
          <motion.span variants={titleWord} aria-hidden>Rheafe</motion.span>
          <motion.span variants={titleWord} aria-hidden className="text-gold-200">&amp;</motion.span>
          <motion.span variants={titleWord} aria-hidden>Jayfel</motion.span>
        </motion.h1>

        {/* Location with gold rules */}
        <motion.div {...fadeUp(0.9)} className="flex items-center gap-4 mb-10">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
            className="hidden sm:block h-px w-12 origin-right bg-gradient-to-l from-gold-300/70 to-transparent"
          />
          <p className="font-serif italic text-lg md:text-2xl text-stone-200 tracking-wider [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
            140 Kalayaan Ave, Diliman, Quezon City
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
            className="hidden sm:block h-px w-12 origin-left bg-gradient-to-r from-gold-300/70 to-transparent"
          />
        </motion.div>

        {/* Passcode / Counter Block */}
        <motion.div {...fadeUp(1.1)} className="flex flex-col items-center mb-12 min-h-[150px]">
          <span className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gold-200 font-semibold mb-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {!isUnlocked && <Lock size={12} />}
            {isUnlocked ? 'Our Married Journey' : 'Enter Passcode to Reveal Journey'}
          </span>

          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div
                key="lock"
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.input
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={8}
                  value={passcode}
                  onChange={(e) => handlePasscode(e.target.value)}
                  placeholder="********"
                  aria-label="Passcode"
                  animate={wrong ? { x: [0, -10, 10, -8, 8, -4, 0] } : { x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-black/30 backdrop-blur-md border text-white text-center tracking-[0.4em] py-2.5 px-6 rounded-full outline-none transition-colors w-52 placeholder:text-white/30 ${
                    wrong
                      ? 'border-red-300/70'
                      : 'border-white/20 focus:border-gold-300 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.06)]'
                  }`}
                />
                {/* progress dots */}
                <div className="flex gap-1.5" aria-hidden>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        scale: i < passcode.length ? 1.25 : 1,
                        backgroundColor:
                          i < passcode.length
                            ? wrong
                              ? 'rgba(252,165,165,0.9)'
                              : 'rgba(255,255,255,0.95)'
                            : 'rgba(255,255,255,0.25)',
                      }}
                      transition={{ duration: 0.2 }}
                      className="h-1.5 w-1.5 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="counter"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } },
                }}
                className="grid grid-cols-3 gap-4 sm:flex sm:space-x-4 sm:gap-0 md:space-x-6"
              >
                {counterUnits.map((unit) => (
                  <motion.div
                    key={unit.label}
                    variants={{
                      hidden: { opacity: 0, y: 24, scale: 0.9 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.7, ease: EASE },
                      },
                    }}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="flex flex-col items-center min-w-[64px] md:min-w-[80px]"
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl shadow-lg shadow-black/30 mb-2 bg-black/45 backdrop-blur-md border border-white/10 overflow-hidden">
                      <span className="font-serif text-xl md:text-3xl font-medium text-gold-200">
                        <RollingNumber value={unit.value} reduce={reduce} />
                      </span>
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gold-300/80"
                        animate={{ width: `${Math.min(unit.progress, 1) * 100}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-300 font-semibold">
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Buttons */}
        <motion.div
          {...fadeUp(1.3)}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.a
            href="#story"
            whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden px-8 py-3.5 bg-white text-stone-900 font-sans text-sm font-semibold rounded-full shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <span className="relative z-10">Our Story</span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </motion.a>
          <motion.a
            href="#gallery"
            whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-black/30 backdrop-blur-md text-white font-sans text-sm font-semibold rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 shadow-sm hover:shadow-md transition-all duration-300"
          >
            View Gallery
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {bgImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setCurrentBgIndex(i)}
            className="group py-1"
          >
            <motion.span
              animate={{
                height: i === currentBgIndex ? 28 : 8,
                backgroundColor:
                  i === currentBgIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)',
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block w-[3px] rounded-full group-hover:!bg-white"
            />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.button
        type="button"
        aria-label="Scroll to our story"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer text-stone-300 hover:text-white transition-colors"
        onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold mb-2">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
};
