import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Layers } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  aspect: string;
}

export const Gallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Memories');
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const categories = ['All Memories', 'The Ceremony', 'Portraits', 'Candid Moments', 'Daily Joys'];

  const items: GalleryItem[] = [
    // The Ceremony
    { id: 0, src: '/images/DSCF0929.jpg', title: 'The Historic Cloister', category: 'The Ceremony', aspect: 'h-[360px]' },
    { id: 1, src: '/images/DSCF0935.jpg', title: 'Walking Down The Aisle', category: 'The Ceremony', aspect: 'h-[420px]' },
    { id: 2, src: '/images/DSCF0957.jpg', title: 'Exchanging Our Vows', category: 'The Ceremony', aspect: 'h-[300px]' },
    { id: 3, src: '/images/DSCF0959.jpg', title: 'Hand in Hand Forever', category: 'The Ceremony', aspect: 'h-[380px]' },
    { id: 4, src: '/images/DSCF0964.jpg', title: 'With This Ring', category: 'The Ceremony', aspect: 'h-[320px]' },
    { id: 5, src: '/images/DSCF0976.jpg', title: 'First Kiss as One', category: 'The Ceremony', aspect: 'h-[440px]' },
    { id: 6, src: '/images/DSCF0989.jpg', title: 'Walking in Triumph', category: 'The Ceremony', aspect: 'h-[340px]' },
    { id: 7, src: '/images/DSCF0991.jpg', title: 'Surrounded by Blessings', category: 'The Ceremony', aspect: 'h-[400px]' },

    // Portraits
    { id: 8, src: '/images/DSCF1015.jpg', title: 'Beside the Quiet Sea', category: 'Portraits', aspect: 'h-[420px]' },
    { id: 9, src: '/images/DSCF1022.jpg', title: 'A Scenic Embrace', category: 'Portraits', aspect: 'h-[320px]' },
    { id: 10, src: '/images/DSCF1154.jpg', title: 'Romantic Gazes', category: 'Portraits', aspect: 'h-[380px]' },
    { id: 11, src: '/images/DSCF3785.jpg', title: 'Chasing the Sunset', category: 'Portraits', aspect: 'h-[300px]' },
    { id: 12, src: '/images/DSCF3805.jpg', title: 'Italian Architecture & Love', category: 'Portraits', aspect: 'h-[450px]' },
    { id: 13, src: '/images/DSCF3816.jpg', title: 'Under the Stone Arches', category: 'Portraits', aspect: 'h-[360px]' },
    { id: 14, src: '/images/DSCF3818.jpg', title: 'By the Cliffside', category: 'Portraits', aspect: 'h-[400px]' },
    { id: 15, src: '/images/DSCF3919.jpg', title: 'Golden Hour Silhouette', category: 'Portraits', aspect: 'h-[340px]' },
    { id: 16, src: '/images/DSCF3954.jpg', title: 'Bridal Elegance', category: 'Portraits', aspect: 'h-[420px]' },

    // Candid Moments
    { id: 17, src: '/images/DSCF5024.jpg', title: 'Sharing Sweet Whispers', category: 'Candid Moments', aspect: 'h-[320px]' },
    { id: 18, src: '/images/DSCF5026.jpg', title: 'Playful Laughter', category: 'Candid Moments', aspect: 'h-[380px]' },
    { id: 19, src: '/images/DSCF5040.jpg', title: 'A Toast to Eternity', category: 'Candid Moments', aspect: 'h-[420px]' },
    { id: 20, src: '/images/DSCF5080.jpg', title: 'Dance of Joy', category: 'Candid Moments', aspect: 'h-[300px]' },
    { id: 21, src: '/images/DSCF5093.jpg', title: 'Surrounded by Smiles', category: 'Candid Moments', aspect: 'h-[400px]' },
    { id: 22, src: '/images/DSCF5097.jpg', title: 'Pure Happiness', category: 'Candid Moments', aspect: 'h-[360px]' },
    { id: 23, src: '/images/DSCF5106.jpg', title: 'Tying The Knot', category: 'Candid Moments', aspect: 'h-[440px]' },
    { id: 24, src: '/images/DSCF5179.jpg', title: 'Sparkling Finale', category: 'Candid Moments', aspect: 'h-[340px]' },

    // Daily Joys
    { id: 25, src: '/images/received_1090347741694470.jpeg', title: 'A Cozy Date Night', category: 'Daily Joys', aspect: 'h-[380px]' },
    { id: 26, src: '/images/received_1739237659879801.jpeg', title: 'The Moment She Said Yes!', category: 'Daily Joys', aspect: 'h-[440px]' },
    { id: 27, src: '/images/received_2297727540427829.jpeg', title: 'Our Sweet Engagement', category: 'Daily Joys', aspect: 'h-[360px]' },
    { id: 28, src: '/images/received_1760022244390099.jpeg', title: 'Sunsets & Smiles', category: 'Daily Joys', aspect: 'h-[320px]' },
    { id: 29, src: '/images/received_2007543036294391.jpeg', title: 'Exploring Together', category: 'Daily Joys', aspect: 'h-[400px]' },
    { id: 30, src: '/images/Messenger_creation_de04f1a6-6454-40fa-8614-7b34616786da.jpeg', title: 'Sweet Selfies', category: 'Daily Joys', aspect: 'h-[340px]' }
  ];

  const filteredItems = selectedCategory === 'All Memories'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const getCategoryCount = (category: string) => {
    if (category === 'All Memories') return items.length;
    return items.filter(item => item.category === category).length;
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      const currentIndexInFiltered = filteredItems.findIndex(item => item.id === activeImageIndex);
      const nextIndexInFiltered = (currentIndexInFiltered + 1) % filteredItems.length;
      setActiveImageIndex(filteredItems[nextIndexInFiltered].id);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      const currentIndexInFiltered = filteredItems.findIndex(item => item.id === activeImageIndex);
      const prevIndexInFiltered = (currentIndexInFiltered - 1 + filteredItems.length) % filteredItems.length;
      setActiveImageIndex(filteredItems[prevIndexInFiltered].id);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, selectedCategory]);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-stone-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Modern Minimalistic Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-stone-200/60 dark:border-neutral-800 pb-8">
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-stone-400 dark:text-neutral-500 font-bold block mb-2">
              Visual Archives
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-stone-900 dark:text-stone-100 tracking-tight">
              Captured Moments
            </h2>
          </div>
          <p className="font-sans text-sm text-stone-500 dark:text-neutral-400 max-w-xs md:text-right italic">
            A curated grid of seamless snapshots. Select any capsule to unveil full-screen depth.
          </p>
        </div>

        {/* Dynamic Nav/Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 select-none">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveImageIndex(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${isSelected
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-neutral-900 border-transparent shadow-sm'
                    : 'bg-stone-100 dark:bg-neutral-900 text-stone-600 dark:text-neutral-400 border-transparent hover:bg-stone-200/70 dark:hover:bg-neutral-800'
                  }`}
              >
                {category === 'All Memories' ? <Layers size={12} /> : <Camera size={12} />}
                <span>{category}</span>
                <span className={`text-[10px] ml-1 px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-stone-700 text-stone-200 dark:bg-stone-200 dark:text-stone-700' : 'bg-stone-200 dark:bg-neutral-800 text-stone-500'
                  }`}>
                  {getCategoryCount(category)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modern Editorial CSS Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const hasLoaded = loadedImages[item.id];

              // This logic gives explicit uneven modern heights to grid blocks perfectly
              let rowSpan = 'row-span-2'; // Standard rectangular format (~400px)
              if (index % 3 === 0) rowSpan = 'row-span-3'; // Tall highlight format (~600px)
              if (index % 7 === 0) rowSpan = 'row-span-2 md:col-span-2'; // Wide feature banner format

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveImageIndex(item.id)}
                  className={`${rowSpan} relative group overflow-hidden rounded-xl bg-stone-200 dark:bg-neutral-900 cursor-pointer border border-stone-200/10 dark:border-neutral-800/50 shadow-xs hover:shadow-xl transition-all duration-500`}
                >
                  {/* Image Core Element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [item.id]: true }))}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      setLoadedImages(prev => ({ ...prev, [item.id]: false }));
                    }}
                  />

                  {/* Fallback Screen */}
                  {hasLoaded === false && (
                    <div className="absolute inset-0 bg-stone-100 dark:bg-neutral-900 flex flex-col items-center justify-center p-4 text-center">
                      <Camera className="w-8 h-8 text-stone-400 dark:text-neutral-600 mb-2 animate-pulse" />
                      <span className="font-serif text-sm text-stone-600 dark:text-neutral-400 font-medium">{item.title}</span>
                    </div>
                  )}

                  {/* Modern Ultra-Minimal Overlay Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-end justify-between w-full text-white">
                      <div>
                        <span className="text-[10px] tracking-widest font-mono uppercase text-stone-300 block mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-lg font-normal text-white tracking-wide">
                          {item.title}
                        </h4>
                      </div>
                      <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 transform scale-90 group-hover:scale-100">
                        <ZoomIn size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal (Clean minimalist style) */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIndex(null)}
              className="fixed inset-0 z-50 bg-stone-950/98 backdrop-blur-xl flex items-center justify-center px-4 sm:px-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-6 right-6 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-all z-50 cursor-pointer"
                aria-label="Close Gallery"
              >
                <X size={20} />
              </button>

              {/* Navigation Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-6 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-all z-50 cursor-pointer"
                aria-label="Previous Frame"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[85vh] flex flex-col justify-center items-center"
              >
                <img
                  src={items.find(item => item.id === activeImageIndex)?.src}
                  alt={items.find(item => item.id === activeImageIndex)?.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl select-none"
                />

                {/* Clean Lightbox Caption Bar */}
                <div className="w-full text-center mt-5 text-stone-200">
                  <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase block mb-1">
                    {items.find(item => item.id === activeImageIndex)?.category}
                  </span>
                  <h3 className="font-serif text-xl tracking-wide">
                    {items.find(item => item.id === activeImageIndex)?.title}
                  </h3>
                </div>
              </motion.div>

              <button
                onClick={handleNext}
                className="absolute right-4 sm:right-6 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-all z-50 cursor-pointer"
                aria-label="Next Frame"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};