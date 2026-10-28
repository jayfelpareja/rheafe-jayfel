import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Coffee, Compass, Gem, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Official Start Date: December 04, 2020 (Philippine time)
const RELATIONSHIP_START = new Date('2020-12-04T00:00:00+08:00');
const PH_OFFSET_MS = 8 * 60 * 60 * 1000;

interface Milestone {
  icon: LucideIcon;
  date: string;
  title: string;
  image: string;
  placeholderText: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    icon: Coffee,
    date: 'December 27, 2020',
    title: 'First Meeting',
    image: '/images/first_meet.jpg',
    placeholderText: 'First Meeting',
    description:
      'After growing close through a long-distance relationship, the day Jayfel and Rheafe had been waiting for finally arrived. On December 27, 2020, they met in person for the very first time—and their first meeting became their first date, too. It was a beautiful moment when two hearts that had found each other from afar finally came together. That day marked the beginning of countless memories and a love that would continue to grow with every passing day.',
  },
  {
    icon: Compass,
    date: 'February 26, 2026',
    title: 'The Proposal',
    image: '/images/proposal.jpg',
    placeholderText: 'The Proposal',
    description:
      'On the evening of Jayfel’s 26th birthday, Rheafe received a surprise she would never forget. With a ring in hand and a heart full of love, Jayfel asked Rheafe to spend the rest of her life with him. What began as an ordinary birthday celebration became a life-changing moment—a promise to keep choosing each other, to face every challenge together, and to build a future rooted in love and commitment.',
  },
  {
    icon: Gem,
    date: 'February 26, 2026',
    title: 'Engagement Dinner',
    image: '/images/proposal-dinner.jpg',
    placeholderText: 'Engagement Dinner',
    description:
      'With hearts full of happiness, Jayfel and Rheafe celebrated their engagement in a simple and intimate way. Though distance had separated them in Mindanao, their love had always found a way to bring them closer. That evening, they shared more than a special meal—they shared their dreams of building a life together and planning a simple elopement wedding. It was a quiet but meaningful celebration of a love that meant everything to them and a future they were ready to embrace together.',
  },
  {
    icon: Heart,
    date: 'April 25, 2026',
    title: 'Wedding Day',
    image: '/images/DSCF1154.jpg',
    placeholderText: 'Wedding Day',
    description:
      'On April 25, 2026, Jayfel and Rheafe became husband and wife in a simple, intimate ceremony with only the two of them present. With the blessing of a reverend pastor and their families aware of their commitment, they began a beautiful new chapter together. It was not a grand celebration surrounded by a crowd, but a deeply meaningful promise before God to love, cherish, and stand by each other through every season of life. Their wedding was a reminder that a marriage is not defined by the size of its celebration, but by the love, faith, and commitment shared by two hearts. And so, Jayfel and Rheafe began their forever.',
  },
];

/* ───────────────────────── Journey counter helpers ───────────────────────── */

interface Elapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

/**
 * Calendar years / months / days since the start date, measured in
 * Philippine time so every visitor sees the same numbers wherever they are.
 */
const calcElapsed = (): Elapsed => {
  const now = new Date();
  let diffMs = now.getTime() - RELATIONSHIP_START.getTime();
  if (diffMs < 0) diffMs = 0;

  const ph = new Date(now.getTime() + PH_OFFSET_MS);
  const start = new Date(RELATIONSHIP_START.getTime() + PH_OFFSET_MS);

  let years = ph.getUTCFullYear() - start.getUTCFullYear();
  let months = ph.getUTCMonth() - start.getUTCMonth();
  let days = ph.getUTCDate() - start.getUTCDate();

  if (days < 0) {
    // Borrow days from the previous month
    const previousMonthDays = new Date(Date.UTC(ph.getUTCFullYear(), ph.getUTCMonth(), 0)).getUTCDate();
    days += previousMonthDays;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return {
    years,
    months,
    days,
    hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diffMs / (1000 * 60)) % 60),
    seconds: Math.floor((diffMs / 1000) % 60),
    totalDays: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
  };
};

/* Number that slides up when its value changes */
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

/* Photo with a graceful fallback if the file is missing */
const TimelineImage: React.FC<{ src: string; alt: string; fallback: string }> = ({ src, alt, fallback }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 p-4 dark:bg-neutral-900">
        <Heart className="mb-1 h-5 w-5 animate-pulse text-stone-300 dark:text-neutral-700" />
        <span className="font-serif text-xs italic text-stone-400 dark:text-neutral-500">{fallback}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
    />
  );
};

/* ───────────────────────── Animation variants ───────────────────────── */

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: EASE },
  }),
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 14, delay: 0.2 + i * 0.25 },
  }),
};

const counterContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const counterItem: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

/* ───────────────────────── Component ───────────────────────── */

interface StoryProps {
  /** Set to false to hide the "How It All Began" section header. */
  showHeading?: boolean;
}

export const OurStory: React.FC<StoryProps> = ({ showHeading = true }) => {
  const reduce = useReducedMotion() ?? false;
  const initial = reduce ? false : 'hidden';

  const [elapsed, setElapsed] = useState<Elapsed>(calcElapsed);

  useEffect(() => {
    setElapsed(calcElapsed());
    const interval = setInterval(() => setElapsed(calcElapsed()), 1000);
    return () => clearInterval(interval);
  }, []);

  // `progress` = how far each unit is toward its next tick
  const counterUnits = [
    { label: 'Years', value: elapsed.years, progress: elapsed.months / 12 },
    { label: 'Months', value: elapsed.months, progress: elapsed.days / 30 },
    { label: 'Days', value: elapsed.days, progress: elapsed.hours / 24 },
    { label: 'Hours', value: elapsed.hours, progress: elapsed.minutes / 60 },
    { label: 'Mins', value: elapsed.minutes, progress: elapsed.seconds / 60 },
    { label: 'Secs', value: elapsed.seconds, progress: elapsed.seconds / 60 },
  ];

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-stone-50 py-24 transition-colors duration-300 scroll-mt-16 md:py-32 dark:bg-neutral-950"
    >
      {/* Soft gold glows for depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-200/5" />
        <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-200/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        {showHeading && (
          <div className="mx-auto mb-20 max-w-2xl text-center md:mb-28">
            <motion.span
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-gold-500 dark:text-gold-300"
            >
              Our Shared Timeline
            </motion.span>
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="font-serif text-4xl tracking-tight text-stone-900 md:text-6xl dark:text-stone-100"
            >
              How It All Began
            </motion.h2>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3" aria-hidden>
              <motion.span
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                className="h-px w-14 origin-right bg-gradient-to-l from-gold-300 to-transparent"
              />
              <Heart size={12} className="fill-current text-gold-300" />
              <motion.span
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                className="h-px w-14 origin-left bg-gradient-to-r from-gold-300 to-transparent"
              />
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="relative mb-28 md:mb-32">
          {/* Line that draws itself across the icons (desktop) */}
          <div className="absolute top-8 left-[calc(12.5%-0.75rem)] right-[calc(12.5%-0.75rem)] hidden h-px bg-stone-200 lg:block dark:bg-neutral-800">
            <motion.div
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 2, ease: EASE }}
              className="h-full origin-left bg-gradient-to-r from-gold-200 via-gold-300 to-gold-200"
            />
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.article
                  key={m.title}
                  custom={i}
                  initial={initial}
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={itemVariants}
                  className="group flex flex-col"
                >
                  {/* Icon node */}
                  <motion.div
                    custom={i}
                    variants={iconVariants}
                    className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm transition-all duration-500 group-hover:border-gold-300 group-hover:shadow-[0_8px_30px_-8px] group-hover:shadow-gold-300/60 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-gold-300/20 opacity-0 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 group-hover:animate-ping"
                    />
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      className="relative text-gold-500 transition-transform duration-500 group-hover:scale-110 dark:text-gold-300"
                    />
                  </motion.div>

                  {/* Date + title */}
                  <p className="mt-5 text-center font-serif text-sm italic tracking-wide text-stone-500 dark:text-neutral-400">
                    {m.date}
                  </p>
                  <h3 className="mt-3 text-center font-serif text-xl text-stone-900 md:text-2xl dark:text-stone-100">
                    {m.title}
                  </h3>

                  {/* Card */}
                  <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-stone-900/10 dark:border-neutral-800 dark:bg-neutral-900 dark:group-hover:shadow-black/40">
                    <motion.div
                      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
                      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: EASE }}
                      className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-neutral-900"
                    >
                      <TimelineImage src={m.image} alt={m.title} fallback={m.placeholderText} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 font-serif text-[11px] tracking-widest text-gold-200 backdrop-blur-md">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </motion.div>

                    <p className="flex-1 p-6 text-sm leading-relaxed text-stone-600 dark:text-neutral-400">
                      {m.description}
                    </p>

                    {/* Gold underline that grows on hover */}
                    <span
                      aria-hidden
                      className="block h-[2px] w-0 bg-gradient-to-r from-gold-200 to-gold-300 transition-all duration-700 group-hover:w-full"
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Girlfriend & Boyfriend Journey — live counter */}
        <div className="border-t border-stone-200/60 pt-20 dark:border-neutral-800">
          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-5 flex items-center gap-2 rounded-full border border-stone-200/60 bg-stone-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              <Heart size={12} className="animate-pulse-slow fill-current text-gold-300" />
              Girlfriend &amp; Boyfriend Journey
            </span>
            <h3 className="mb-3 font-serif text-2xl tracking-tight text-stone-900 md:text-4xl dark:text-stone-100">
              Our Journey Since Day One
            </h3>
            <p className="mb-12 font-serif text-sm italic tracking-wide text-stone-500 dark:text-neutral-400">
              Counting every moment since December 4, 2020
            </p>
          </motion.div>

          {/* Counter blocks */}
          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={counterContainer}
            className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4 md:gap-6"
          >
            {counterUnits.map((unit) => (
              <motion.div
                key={unit.label}
                variants={counterItem}
                whileHover={reduce ? undefined : { y: -5 }}
                className="group flex min-w-[70px] flex-col items-center md:min-w-[90px]"
              >
                <div className="relative mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-sm transition-all duration-500 group-hover:border-gold-300 group-hover:shadow-xl group-hover:shadow-gold-300/20 md:h-20 md:w-20 dark:border-neutral-800/80 dark:bg-neutral-900">
                  <span className="font-serif text-xl font-semibold text-stone-900 md:text-3xl dark:text-stone-100">
                    <RollingNumber value={unit.value} reduce={reduce} />
                  </span>
                  <motion.span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-200 to-gold-300"
                    animate={{ width: `${Math.min(Math.max(unit.progress, 0), 1) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-neutral-500">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Total days */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-12 text-center font-serif text-sm italic tracking-wide text-stone-500 dark:text-neutral-400"
          >
            That’s{' '}
            <span className="font-semibold not-italic text-gold-500 dark:text-gold-300">
              {elapsed.totalDays.toLocaleString()}
            </span>{' '}
            days of choosing each other — and counting.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// Kept so existing `import { Story }` usages keep working.
export const Story = OurStory;