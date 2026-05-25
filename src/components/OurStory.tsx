import React from 'react';
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

  return (
    <section id="story" className="py-24 md:py-32 bg-stone-50 dark:bg-charcoal-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-semibold"
          >
            Our Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-gold-200 mt-2 mb-6"
          >
            How it all began
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[1px] w-24 bg-blush-200 dark:bg-gold-300/30 mx-auto"
          />
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Connecting Line (Mobile) */}
          <div className="absolute left-[29px] top-6 bottom-6 w-[1px] bg-stone-200 dark:bg-charcoal-800 md:hidden" />

          {/* Horizontal Connecting Line (Desktop) */}
          <div className="absolute top-[29px] left-8 right-8 h-[1px] bg-stone-200 dark:bg-charcoal-800 hidden md:block" />

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="flex flex-col items-start md:items-center text-left md:text-center group"
              >
                {/* Connector/Icon Node */}
                <div className="flex items-center space-x-6 md:space-x-0 md:flex-col md:items-center w-full mb-6">
                  {/* Outer circle node */}
                  <div className="w-[60px] h-[60px] rounded-full bg-white dark:bg-charcoal-800 border-2 border-stone-200 dark:border-charcoal-700 flex items-center justify-center shadow-xs group-hover:border-gold-300 dark:group-hover:border-gold-200 transition-colors duration-500 shrink-0">
                    {item.icon}
                  </div>
                  {/* Date badge */}
                  <span className="font-serif italic text-sm text-gold-400 dark:text-gold-300 md:mt-4">
                    {item.date}
                  </span>
                </div>

                {/* Milestone Detail Card */}
                <div className="pl-[76px] md:pl-0 w-full">
                  <h3 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-gold-400 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Photo Frame (with fallback placeholder) */}
                  <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden bg-stone-100 dark:bg-charcoal-800 border border-stone-200/40 dark:border-charcoal-700/50 mb-4 shadow-xs group-hover:shadow-md transition-shadow duration-500">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />
                    {/* Premium Fallback Graphic */}
                    <div className="fallback hidden absolute inset-0 bg-gradient-to-br from-beige-50 to-blush-50 dark:from-charcoal-800 dark:to-charcoal-700 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-10 h-10 rounded-full border border-gold-300/30 flex items-center justify-center mb-2">
                        <Heart className="w-4 h-4 text-gold-300/60" />
                      </div>
                      <span className="font-serif italic text-xs text-stone-400 dark:text-stone-500">
                        {item.placeholderText}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
