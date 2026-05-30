import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Layers } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  aspect: string;
}

export const Gallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Memories');
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const categories = ['All Memories', 'The Ceremony', 'Portraits', 'Candid Moments', 'Daily Joys'];

  const items: GalleryItem[] = [
    { id: 0, src: '/images/DSCF0929.jpg', category: 'The Ceremony', aspect: 'h-[360px]' },
    { id: 1, src: '/images/DSCF0935.jpg', category: 'The Ceremony', aspect: 'h-[420px]' },
    { id: 2, src: '/images/DSCF0957.jpg', category: 'The Ceremony', aspect: 'h-[300px]' },
    { id: 3, src: '/images/DSCF1118.jpg', category: 'The Ceremony', aspect: 'h-[380px]' },
    { id: 4, src: '/images/DSCF5136.jpg', category: 'The Ceremony', aspect: 'h-[320px]' },
    { id: 5, src: '/images/DSCF1154.jpg', category: 'The Ceremony', aspect: 'h-[440px]' },
    { id: 6, src: '/images/DSCF1033.jpg', category: 'The Ceremony', aspect: 'h-[340px]' },
    { id: 7, src: '/images/DSCF0991.jpg', category: 'The Ceremony', aspect: 'h-[400px]' },

    { id: 8, src: '/images/DSCF1015.jpg', category: 'Portraits', aspect: 'h-[420px]' },
    { id: 9, src: '/images/DSCF1022.jpg', category: 'Portraits', aspect: 'h-[320px]' },
    { id: 10, src: '/images/DSCF1154.jpg', category: 'Portraits', aspect: 'h-[380px]' },
    { id: 11, src: '/images/DSCF3785.jpg', category: 'Portraits', aspect: 'h-[300px]' },
    { id: 12, src: '/images/DSCF3805.jpg', category: 'Portraits', aspect: 'h-[450px]' },
    { id: 13, src: '/images/DSCF3816.jpg', category: 'Portraits', aspect: 'h-[360px]' },
    { id: 14, src: '/images/DSCF3818.jpg', category: 'Portraits', aspect: 'h-[400px]' },
    { id: 15, src: '/images/DSCF3919.jpg', category: 'Portraits', aspect: 'h-[340px]' },
    { id: 16, src: '/images/DSCF3954.jpg', category: 'Portraits', aspect: 'h-[420px]' },

    { id: 17, src: '/images/DSCF5024.jpg', category: 'Candid Moments', aspect: 'h-[320px]' },
    { id: 18, src: '/images/DSCF5026.jpg', category: 'Candid Moments', aspect: 'h-[380px]' },
    { id: 19, src: '/images/DSCF5040.jpg', category: 'Candid Moments', aspect: 'h-[420px]' },
    { id: 20, src: '/images/DSCF5080.jpg', category: 'Candid Moments', aspect: 'h-[300px]' },
    { id: 21, src: '/images/DSCF5093.jpg', category: 'Candid Moments', aspect: 'h-[400px]' },
    { id: 22, src: '/images/DSCF5097.jpg', category: 'Candid Moments', aspect: 'h-[360px]' },
    { id: 23, src: '/images/DSCF5106.jpg', category: 'Candid Moments', aspect: 'h-[440px]' },
    { id: 24, src: '/images/DSCF5179.jpg', category: 'Candid Moments', aspect: 'h-[340px]' },

    { id: 25, src: '/images/received_1090347741694470.jpeg', category: 'Daily Joys', aspect: 'h-[380px]' },
    { id: 26, src: '/images/received_1739237659879801.jpeg', category: 'Daily Joys', aspect: 'h-[440px]' },
    { id: 27, src: '/images/received_2297727540427829.jpeg', category: 'Daily Joys', aspect: 'h-[360px]' },
    { id: 28, src: '/images/received_1760022244390099.jpeg', category: 'Daily Joys', aspect: 'h-[320px]' },
    { id: 29, src: '/images/received_2007543036294391.jpeg', category: 'Daily Joys', aspect: 'h-[400px]' },
    { id: 30, src: '/images/Messenger_creation_de04f1a6-6454-40fa-8614-7b34616786da.jpeg', category: 'Daily Joys', aspect: 'h-[340px]' }
  ];

  const filteredItems =
    selectedCategory === 'All Memories'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const getCategoryCount = (category: string) => {
    if (category === 'All Memories') return items.length;
    return items.filter((item) => item.category === category).length;
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      const currentIndexInFiltered = filteredItems.findIndex(
        (item) => item.id === activeImageIndex
      );
      const nextIndex =
        (currentIndexInFiltered + 1) % filteredItems.length;

      setActiveImageIndex(filteredItems[nextIndex].id);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      const currentIndexInFiltered = filteredItems.findIndex(
        (item) => item.id === activeImageIndex
      );
      const prevIndex =
        (currentIndexInFiltered - 1 + filteredItems.length) %
        filteredItems.length;

      setActiveImageIndex(filteredItems[prevIndex].id);
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
    <section
      id="gallery"
      className="py-24 md:py-32 bg-stone-50 dark:bg-neutral-950 transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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

        {/* Filters */}
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
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2 border ${isSelected
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-neutral-900'
                  : 'bg-stone-100 dark:bg-neutral-900 text-stone-600 dark:text-neutral-400'
                  }`}
              >
                {category === 'All Memories' ? (
                  <Layers size={12} />
                ) : (
                  <Camera size={12} />
                )}
                <span>{category}</span>
                <span className="text-[10px] ml-1 px-1.5 rounded-full bg-stone-200 dark:bg-neutral-800">
                  {getCategoryCount(category)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                onClick={() => setActiveImageIndex(item.id)}
                className="relative group overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <ZoomIn size={14} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={() => setActiveImageIndex(null)}
            >
              <img
                src={
                  items.find((i) => i.id === activeImageIndex)?.src
                }
                alt=""
                className="max-h-[80vh] max-w-[90vw] object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};