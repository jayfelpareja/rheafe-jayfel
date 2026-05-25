import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film, Clapperboard, X } from 'lucide-react';

interface Chapter {
  title: string;
  time: string;
  description: string;
}

export const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const chapters: Chapter[] = [
    {
      title: 'The Prelude & Details',
      time: '00:00',
      description: 'A beautiful look at the event decor, vow books, and wedding rings highlighting April 25, 2026.'
    },
    {
      title: 'Intimate Moments',
      time: '00:08',
      description: 'Shared smiles and a sweet kiss on the hand in front of the floral "Sa Wakas" backdrop.'
    },
    {
      title: 'Bridal & Groom Portraits',
      time: '00:20',
      description: 'Stunning individual and couple portraits showcasing the elegant dress, veil, and sharp beige suit.'
    },
    {
      title: 'The Ceremony & Vows',
      time: '00:48',
      description: 'Holding hands, exchanging vows, and sharing an emotional first kiss as husband and wife.'
    },
    {
      title: 'Celebration & Joy',
      time: '02:11',
      description: 'Walking down the aisle together with pure excitement, raising the bouquet to celebrate the new beginning.'
    },
  ];

  return (
    <section id="memories" className="py-24 md:py-32 bg-stone-100 dark:bg-charcoal-800 border-t border-stone-200/40 dark:border-charcoal-700/30">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-semibold">
            Moving Memories
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-gold-200 mt-2 mb-6">
            Our Elopement Wedding
          </h2>
          <div className="h-[1px] w-24 bg-blush-200 dark:bg-gold-300/30 mx-auto" />
        </div>

        {/* Video Player Display Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-charcoal-700 bg-charcoal-900 flex flex-col items-center justify-center group cursor-pointer max-w-4xl mx-auto mb-16"
          onClick={() => setIsPlaying(true)}
        >
          {/* Static Cinematic Cover */}
          <div className="absolute inset-0 z-0">
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-500 z-10" />

            <img
              src="/images/DSCF0991.jpg"
              alt="Rheafe & Jayfel Wedding Video Cover"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
            />
          </div>

          {/* Controls overlay */}
          <div className="relative z-20 flex flex-col items-center select-none text-white px-6">
            {/* Play Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 dark:bg-gold-300 text-stone-900 dark:text-charcoal-900 flex items-center justify-center shadow-lg mb-6 group-hover:bg-gold-300 group-hover:text-charcoal-900 transition-colors duration-500"
            >
              <Play size={28} className="fill-current ml-1" />
            </motion.div>

            {/* Video Label */}
            <span className="font-script italic text-lg md:text-2xl text-gold-200/90 mb-2 drop-shadow-md">
              Rheafe & Jayfel
            </span>
            <p className="font-sans text-xs uppercase tracking-widest text-stone-300/80 font-semibold flex items-center space-x-2 bg-black/35 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <Film size={12} />
              <span>Mala Maya Photography</span>
            </p>
          </div>

          {/* Border details */}
          <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none" />
        </motion.div>

        {/* Chapters Cards Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 text-stone-800 dark:text-gold-200 font-serif italic text-lg mb-6 justify-center md:justify-start">
            <Clapperboard size={18} />
            <span>Highlights & Chapters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chapters.map((chapter, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="paper-card p-6 rounded-xl relative group hover:border-gold-300/30 dark:hover:border-gold-300/20 transition-all duration-300"
              >
                {/* Time Indicator */}
                <span className="text-[10px] font-sans font-semibold text-gold-300 uppercase tracking-widest bg-gold-100/50 dark:bg-gold-300/5 px-2 py-0.5 rounded-sm border border-gold-300/10">
                  {chapter.time}
                </span>

                {/* Chapter Title */}
                <h4 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-4 mb-2 group-hover:text-gold-300 transition-colors">
                  {chapter.title}
                </h4>

                {/* Chapter Description */}
                <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  {chapter.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal (Local Video Playback) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPlaying(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              aria-label="Close Player"
            >
              <X size={24} />
            </button>

            {/* Video Tag Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-16/9 rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            >
              <video
                src="/videos/rheafeandjayfel.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
