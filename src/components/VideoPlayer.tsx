import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film, Clapperboard, X, Lock } from 'lucide-react';

interface Chapter {
  title: string;
  time: string;
  description: string;
}

export const VideoPlayer: React.FC = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [isError, setIsError] = useState(false);

  const CORRECT_PASSWORD = '02262026';

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

  const handleOpenPublicVideo = () => {
    setActiveVideoSrc('/videos/civil-wedding.mp4');
  };

  const handleOpenPrivateVideoClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsError(false);
      setShowPasswordModal(false);
      setActiveVideoSrc('/videos/civil-wedding-vows.mp4');
    } else {
      setIsError(true);
      setPasswordInput('');
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordInput('');
    setIsError(false);
  };

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

        {/* Dual Video Players Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">

          {/* Card 1: Public Main Wedding Highlight Film */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-charcoal-700 bg-charcoal-900 flex flex-col items-center justify-center group cursor-pointer"
            onClick={handleOpenPublicVideo}
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500 z-10" />
              <img
                src="/images/DSCF0991.jpg"
                alt="Rheafe & Jayfel Wedding Film Cover"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
              />
            </div>

            <div className="relative z-20 flex flex-col items-center select-none text-white px-4 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-md mb-4 group-hover:bg-gold-300 group-hover:text-charcoal-900 transition-colors duration-500"
              >
                <Play size={22} className="fill-current ml-0.5" />
              </motion.div>
              <span className="font-serif text-xl text-white mb-1 drop-shadow-md">
                Our Wedding Film
              </span>
              <p className="font-sans text-[10px] uppercase tracking-widest text-stone-300/90 font-medium flex items-center space-x-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10">
                <Film size={10} />
                <span>Watch Highlights</span>
              </p>
            </div>
            <div className="absolute inset-3 border border-white/10 rounded-xl pointer-events-none" />
          </motion.div>

          {/* Card 2: Password Protected Vows Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative w-full aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-charcoal-700 bg-charcoal-900 flex flex-col items-center justify-center group cursor-pointer"
            onClick={handleOpenPrivateVideoClick}
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500 z-10" />
              <img
                src="/images/DSCF1154.jpg"
                alt="Rheafe & Jayfel Private Vows Cover"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
              />
            </div>

            <div className="relative z-20 flex flex-col items-center select-none text-white px-4 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-md mb-4 group-hover:bg-gold-300 group-hover:text-charcoal-900 group-hover:border-transparent transition-colors duration-500"
              >
                <Lock size={20} />
              </motion.div>
              <span className="font-serif text-xl text-white mb-1 drop-shadow-md flex items-center justify-center gap-1.5">
                Intimate Vows Film
              </span>
              <p className="font-sans text-[10px] uppercase tracking-widest text-gold-200 font-semibold flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-gold-300/20">
                <span>Requires Password</span>
              </p>
            </div>
            <div className="absolute inset-3 border border-white/15 rounded-xl pointer-events-none" />
          </motion.div>

        </div>

        {/* Chapters Cards Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 text-stone-800 dark:text-gold-200 font-serif italic text-lg mb-6 justify-center md:justify-start">
            <Clapperboard size={18} />
            <span>Highlights & Chapters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chapters.map((chapter) => (
              <motion.div
                key={chapter.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="paper-card p-6 rounded-xl relative group hover:border-gold-300/30 dark:hover:border-gold-300/20 transition-all duration-300"
              >
                <span className="text-[10px] font-sans font-semibold text-gold-300 uppercase tracking-widest bg-gold-100/50 dark:bg-gold-300/5 px-2 py-0.5 rounded-sm border border-gold-300/10">
                  {chapter.time}
                </span>

                <h4 className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100 mt-4 mb-2 group-hover:text-gold-300 transition-colors">
                  {chapter.title}
                </h4>

                <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  {chapter.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Password Validation Gateway Popup Backdrop */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-4"
            onClick={closePasswordModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-stone-200 dark:border-neutral-800 text-center relative"
            >
              <button
                onClick={closePasswordModal}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                <Lock size={20} className="text-stone-600 dark:text-gold-300" />
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-stone-900 dark:text-stone-100 mb-2">
                Enter Access Code
              </h3>
              <p className="font-sans text-xs text-stone-500 dark:text-neutral-400 mb-6">
                Please enter the special date code to view our intimate vows memory film.
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (isError) setIsError(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-center font-sans tracking-widest text-lg focus:outline-none focus:ring-2 transition-all bg-stone-50 dark:bg-neutral-950 text-stone-900 dark:text-stone-100 ${isError
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-stone-200 dark:border-neutral-800 focus:ring-stone-500/20 dark:focus:ring-gold-300/20'
                    }`}
                  autoFocus
                />

                {isError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 font-sans"
                  >
                    Incorrect code password. Please try again.
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 dark:bg-gold-300 dark:hover:bg-gold-400 text-white dark:text-neutral-950 font-sans text-sm font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Unlock Memories
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Fullscreen Media Overlay Box Player */}
      <AnimatePresence>
        {activeVideoSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoSrc(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
          >
            <button
              onClick={() => setActiveVideoSrc(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              aria-label="Close Player"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-16/9 rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            >
              <video
                key={activeVideoSrc}
                src={activeVideoSrc}
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