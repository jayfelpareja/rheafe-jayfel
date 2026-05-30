import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Compass, Gem, Heart } from 'lucide-react';

interface Milestone {
  title: string;
  date: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  placeholderText: string;
}

export const OurStory: React.FC = () => {
  // Official Start Date: December 04, 2020
  const relationshipStartDate = new Date('2020-12-04T00:00:00+08:00');

  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const milestones: Milestone[] = [
    {
      title: 'First Meeting',
      date: 'December 27, 2020',
      icon: <Coffee className="w-5 h-5 text-gold-300" />,
      description: 'It was our first meeting and first date at the same time, as we were in a long-distance relationship and finally managed to see each other in person.',
      image: '/images/first_meet.jpg',
      placeholderText: 'First Meeting',
    },
    {
      title: 'The Proposal',
      date: 'February 26, 2026',
      icon: <Compass className="w-5 h-5 text-gold-300" />,
      description: 'It was an unexpected proposal when Jayfel surprised Rheafe with a ring and asked her to be his wife forever during his 26th birthday celebration in the evening.',
      image: '/images/proposal.jpg',
      placeholderText: 'The Proposal',
    },
    {
      title: 'Engagement Dinner',
      date: 'February 26, 2026',
      icon: <Gem className="w-5 h-5 text-gold-300" />,
      description: 'Since Jayfel and Rheafe live far apart in Mindanao, they celebrated their engagement privately as a couple while planning a simple elopement wedding together.',
      image: '/images/proposal-dinner.jpg',
      placeholderText: 'Engagement Dinner',
    },
    {
      title: 'Elopement Wedding',
      date: 'April 25, 2026',
      icon: <Heart className="w-5 h-5 text-gold-300" />,
      description: 'The ceremony was held only with the bride and groom, and they were blessed by a reverend pastor, with their families aware of their marriage and commitment.',
      image: '/images/DSCF1154.jpg',
      placeholderText: 'Wedding Day',
    },
  ];

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let diffMs = now.getTime() - relationshipStartDate.getTime();

      if (diffMs < 0) diffMs = 0;

      // Extract hours, minutes, seconds cleanly
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      // Calendar calculation for precise Years, Months, and Days
      let years = now.getFullYear() - relationshipStartDate.getFullYear();
      let months = now.getMonth() - relationshipStartDate.getMonth();
      let days = now.getDate() - relationshipStartDate.getDate();

      if (days < 0) {
        // Borrow days from the previous month
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="story" className="py-24 md:py-32 bg-stone-50 dark:bg-neutral-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs uppercase tracking-widest text-stone-400 dark:text-neutral-500 font-bold block mb-2"
          >
            Our Shared Timeline
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-4xl md:text-6xl text-stone-900 dark:text-stone-100 tracking-tight"
          >
            How It All Began
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[1px] w-24 bg-stone-300 dark:bg-neutral-800 mx-auto mt-6"
          />
        </div>

        {/* Timeline Layout */}
        <div className="relative mb-32">
          {/* Vertical Connecting Line (Mobile) */}
          <div className="absolute left-[29px] top-6 bottom-6 w-[1px] bg-stone-200 dark:bg-neutral-800 md:hidden" />

          {/* Horizontal Connecting Line (Desktop) */}
          <div className="absolute top-[29px] left-8 right-8 h-[1px] bg-stone-200 dark:bg-neutral-800 hidden md:block" />

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {milestones.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start md:items-center text-left md:text-center group"
              >
                {/* Connector Node Header */}
                <div className="flex md:flex-col items-center gap-4 md:gap-0 mb-4 md:mb-6 z-10 w-full md:w-auto">
                  <div className="w-[60px] h-[60px] rounded-full bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 flex items-center justify-center shadow-sm group-hover:border-stone-400 dark:group-hover:border-neutral-600 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="font-serif italic text-sm text-stone-500 dark:text-neutral-400 md:mt-4">
                    {item.date}
                  </span>
                </div>

                {/* Card Context Content */}
                <div className="pl-[76px] md:pl-0 w-full">
                  <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-stone-600 dark:group-hover:text-neutral-400 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Image Frame Container */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-stone-100 dark:bg-neutral-900 border border-stone-200/60 dark:border-neutral-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.fallback-node');
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />

                    {/* Fallback View */}
                    <div className="fallback-node hidden absolute inset-0 bg-stone-100 dark:bg-neutral-900 flex flex-col items-center justify-center p-4">
                      <Heart className="w-5 h-5 text-stone-300 dark:text-neutral-700 animate-pulse mb-1" />
                      <span className="font-serif italic text-xs text-stone-400 dark:text-neutral-500">
                        {item.placeholderText}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-stone-500 dark:text-neutral-400 font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hero Style Live Counter Section */}
        <div className="border-t border-stone-200/60 dark:border-neutral-800 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-[11px] uppercase tracking-widest text-stone-500 dark:text-neutral-400 font-bold mb-4 bg-stone-100 dark:bg-neutral-900 px-4 py-1.5 rounded-full border border-stone-200/60 dark:border-neutral-800">
              Girlfriend & BoyfriendJourney
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 tracking-tight mb-10">
              Our Journey Since Day One
            </h3>

            {/* Counter Blocks */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl">
              {[
                { label: 'Years', value: timeElapsed.years },
                { label: 'Months', value: timeElapsed.months },
                { label: 'Days', value: timeElapsed.days },
                { label: 'Hours', value: timeElapsed.hours },
                { label: 'Mins', value: timeElapsed.minutes },
                { label: 'Secs', value: timeElapsed.seconds },
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center min-w-[70px] md:min-w-[90px]">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl shadow-sm mb-2 bg-white dark:bg-neutral-900 border border-stone-200/80 dark:border-neutral-800/80 backdrop-blur-sm">
                    <span className="font-serif text-xl md:text-3xl font-semibold text-stone-900 dark:text-stone-100">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-neutral-500 font-bold">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};