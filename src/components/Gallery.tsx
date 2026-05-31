import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Camera, Layers, ChevronDown } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  aspect: string;
}

export const Gallery: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Memories');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const categories = ['All Memories', 'Civil Wedding', 'Just the two of us'];

  const items: GalleryItem[] = [
    { id: 0, src: '/images/DSCF0929.jpg', category: 'Civil Wedding', aspect: 'h-[360px]' },
    { id: 1, src: '/images/DSCF0935.jpg', category: 'Civil Wedding', aspect: 'h-[420px]' },
    { id: 2, src: '/images/DSCF0957.jpg', category: 'Civil Wedding', aspect: 'h-[300px]' },
    { id: 3, src: '/images/DSCF1118.jpg', category: 'Civil Wedding', aspect: 'h-[380px]' },
    { id: 4, src: '/images/DSCF5136.jpg', category: 'Civil Wedding', aspect: 'h-[320px]' },
    { id: 5, src: '/images/DSCF1154.jpg', category: 'Civil Wedding', aspect: 'h-[440px]' },
    { id: 6, src: '/images/DSCF1033.jpg', category: 'Civil Wedding', aspect: 'h-[340px]' },
    { id: 7, src: '/images/DSCF0991.jpg', category: 'Civil Wedding', aspect: 'h-[400px]' },
    { id: 8, src: '/images/DSCF1015.jpg', category: 'Civil Wedding', aspect: 'h-[420px]' },
    { id: 9, src: '/images/DSCF1022.jpg', category: 'Civil Wedding', aspect: 'h-[320px]' },
    { id: 10, src: '/images/DSCF1154.jpg', category: 'Civil Wedding', aspect: 'h-[380px]' },
    { id: 11, src: '/images/DSCF3785.jpg', category: 'Civil Wedding', aspect: 'h-[300px]' },
    { id: 12, src: '/images/DSCF3805.jpg', category: 'Civil Wedding', aspect: 'h-[450px]' },
    { id: 13, src: '/images/DSCF3816.jpg', category: 'Civil Wedding', aspect: 'h-[360px]' },
    { id: 14, src: '/images/DSCF3818.jpg', category: 'Civil Wedding', aspect: 'h-[400px]' },
    { id: 15, src: '/images/DSCF3919.jpg', category: 'Civil Wedding', aspect: 'h-[340px]' },
    { id: 16, src: '/images/DSCF3954.jpg', category: 'Civil Wedding', aspect: 'h-[420px]' },
    { id: 17, src: '/images/DSCF5024.jpg', category: 'Civil Wedding', aspect: 'h-[320px]' },
    { id: 18, src: '/images/DSCF5026.jpg', category: 'Civil Wedding', aspect: 'h-[380px]' },
    { id: 19, src: '/images/DSCF5040.jpg', category: 'Civil Wedding', aspect: 'h-[420px]' },
    { id: 20, src: '/images/DSCF5080.jpg', category: 'Civil Wedding', aspect: 'h-[300px]' },
    { id: 21, src: '/images/DSCF5093.jpg', category: 'Civil Wedding', aspect: 'h-[400px]' },
    { id: 22, src: '/images/DSCF5097.jpg', category: 'Civil Wedding', aspect: 'h-[360px]' },
    { id: 23, src: '/images/DSCF5106.jpg', category: 'Civil Wedding', aspect: 'h-[440px]' },
    { id: 24, src: '/images/DSCF5179.jpg', category: 'Civil Wedding', aspect: 'h-[340px]' },
    { id: 25, src: '/images/couple1.jpg', category: 'Just the two of us', aspect: 'h-[440px]' },
    { id: 26, src: '/images/couple2.jpg', category: 'Just the two of us', aspect: 'h-[440px]' },
    { id: 27, src: '/images/couple3.jpg', category: 'Just the two of us', aspect: 'h-[360px]' },
    { id: 28, src: '/images/couple4.jpg', category: 'Just the two of us', aspect: 'h-[320px]' },
    { id: 29, src: '/images/couple5.jpg', category: 'Just the two of us', aspect: 'h-[400px]' },
    { id: 30, src: '/images/couple6.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 31, src: '/images/couple7.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 32, src: '/images/couple8.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 33, src: '/images/couple9.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 34, src: '/images/couple10.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 35, src: '/images/couple11.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 36, src: '/images/couple12.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 37, src: '/images/couple13.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 38, src: '/images/couple14.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 39, src: '/images/couple15.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 40, src: '/images/couple16.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 41, src: '/images/couple17.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 42, src: '/images/couple18.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 43, src: '/images/couple19.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 44, src: '/images/couple20.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 45, src: '/images/couple21.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 46, src: '/images/couple22.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 47, src: '/images/couple23.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 48, src: '/images/couple24.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 49, src: '/images/couple25.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 50, src: '/images/couple26.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 51, src: '/images/couple27.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 52, src: '/images/couple28.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 53, src: '/images/couple29.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 54, src: '/images/couple30.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 55, src: '/images/couple31.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 56, src: '/images/couple32.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 57, src: '/images/couple33.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 58, src: '/images/couple34.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 59, src: '/images/couple35.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 60, src: '/images/couple36.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 61, src: '/images/couple37.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 62, src: '/images/couple38.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 63, src: '/images/couple39.jpg', category: 'Just the two of us', aspect: 'h-[340px]' },
    { id: 64, src: '/images/couple40.jpg', category: 'Just the two of us', aspect: 'h-[340px]' }
  ];

  const filteredItems = selectedCategory === 'All Memories'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  // Dynamic layout display slicing setup
  const displayedItems = isExpanded ? filteredItems : filteredItems.slice(0, 8);

  const getCategoryCount = (category: string) => {
    if (category === 'All Memories') return items.length;
    return items.filter((item) => item.category === category).length;
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      const currentIndexInFiltered = filteredItems.findIndex((item) => item.id === activeImageIndex);
      const nextIndex = (currentIndexInFiltered + 1) % filteredItems.length;
      setActiveImageIndex(filteredItems[nextIndex].id);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      const currentIndexInFiltered = filteredItems.findIndex((item) => item.id === activeImageIndex);
      const prevIndex = (currentIndexInFiltered - 1 + filteredItems.length) % filteredItems.length;
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
    <section id="gallery" className="py-24 md:py-32 bg-stone-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-stone-200/60 dark:border-neutral-800 pb-8">
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-stone-400 dark:text-neutral-500 font-bold block mb-2">
              Captured Moments
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-stone-900 dark:text-stone-100 tracking-tight">
              Our Story Together
            </h2>
          </div>

          <p className="font-sans text-sm text-stone-500 dark:text-neutral-400 max-w-xs md:text-right italic">
            A simple collection of our most cherished memories. Tap any moment to relive it in full screen.
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
                  setIsExpanded(false); // Reset configuration logic to initial limit
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2 border ${isSelected
                    ? 'bg-stone-900 border-stone-900 text-white dark:bg-stone-100 dark:border-stone-100 dark:text-neutral-900'
                    : 'bg-stone-100 border-stone-200 text-stone-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400'
                  }`}
              >
                {category === 'All Memories' ? <Layers size={12} /> : <Camera size={12} />}
                <span>{category}</span>

                {/* Dynamically Styled Counter Badge */}
                <span
                  className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full font-bold transition-colors duration-300 ${isSelected
                      ? 'bg-white text-stone-900 dark:bg-neutral-900 dark:text-stone-100'
                      : 'bg-stone-200 text-stone-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                >
                  {getCategoryCount(category)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
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

        {/* Dynamic Action Trigger Container */}
        {filteredItems.length > 8 && !isExpanded && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setIsExpanded(true)}
              className="px-6 py-3 border border-stone-200 dark:border-neutral-800 rounded-xl font-sans text-xs uppercase tracking-widest text-stone-700 dark:text-neutral-300 font-semibold hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-neutral-900 transition-all duration-300 flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <span>See More Memories</span>
              <ChevronDown size={14} className="mt-0.5 animate-bounce" />
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={() => setActiveImageIndex(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={items.find((i) => i.id === activeImageIndex)?.src}
                alt=""
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};