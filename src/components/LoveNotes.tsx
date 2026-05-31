import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles } from 'lucide-react';

interface Note {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
}

export const LoveNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Initial seed notes
  const seedNotes: Note[] = [
    {
      id: '1',
      name: 'Maryfe & Dominador',
      relationship: 'Parents of the Bride',
      message: 'May your love grow deeper and stronger with each passing year. Watching you two build a life together has been our greatest joy. We are so honored to witness this beautiful union.',
      date: 'April 20, 2026',
    },
    {
      id: '2',
      name: 'Sherwin & Judith',
      relationship: 'Parents of the Groom',
      message: "From the moment you found each other, we knew something beautiful had begun. May your love continue to grow with every passing year, bringing you endless happiness, strength, and countless cherished memories. We are truly blessed to witness and celebrate this wonderful union.",
      date: 'April 22, 2026',
    },

  ];

  useEffect(() => {
    const savedNotes = localStorage.getItem('rheafe_jayfel_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        setNotes(seedNotes);
      }
    } else {
      setNotes(seedNotes);
      localStorage.setItem('rheafe_jayfel_notes', JSON.stringify(seedNotes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newNote: Note = {
      id: String(Date.now()),
      name: name.trim(),
      relationship,
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('rheafe_jayfel_notes', JSON.stringify(updatedNotes));

    // Reset Form
    setName('');
    setMessage('');
    setIsSuccess(true);

    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <section id="notes" className="py-24 md:py-32 bg-stone-50 dark:bg-charcoal-900 border-t border-stone-100 dark:border-charcoal-800">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-semibold">
            Words of Love
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-gold-200 mt-2 mb-6">
            Love Notes & Blessings
          </h2>
          <div className="h-[1px] w-24 bg-blush-200 dark:bg-gold-300/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Guestbook Form */}
          <div className="lg:col-span-1 glass-panel p-8 rounded-2xl sticky top-24">
            <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-2 flex items-center space-x-2">
              <Sparkles size={18} className="text-gold-300" />
              <span>Leave a Blessing</span>
            </h3>
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
              Your message will be saved to the guestbook and displayed below in our collection of wishes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-2" htmlFor="guestName">
                  Your Name
                </label>
                <input
                  id="guestName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aunt Sarah"
                  className="w-full bg-white/50 dark:bg-charcoal-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-charcoal-700/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-300 transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-2" htmlFor="relationship">
                  Relationship
                </label>
                <select
                  id="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-white/50 dark:bg-charcoal-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-charcoal-700/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-300 transition-colors"
                >
                  <option value="Friend">Friend</option>
                  <option value="Family">Family Member</option>
                  <option value="Other">Well-wisher</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-2" htmlFor="blessing">
                  Your Blessing
                </label>
                <textarea
                  id="blessing"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your wishes for the couple..."
                  className="w-full bg-white/50 dark:bg-charcoal-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-charcoal-700/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-300 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-white dark:bg-gold-300 dark:text-charcoal-900 py-3 rounded-lg text-sm font-semibold hover:bg-stone-800 dark:hover:bg-gold-400 transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow cursor-pointer"
              >
                <span>Send Love</span>
                <Send size={14} />
              </button>
            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30 rounded-lg flex items-center space-x-2 text-green-700 dark:text-green-400 text-xs"
                >
                  <Heart size={14} className="fill-current animate-pulse-slow" />
                  <span>Blessing added! Thank you for your love.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages Grid */}
          <div className="lg:col-span-2 space-y-6 max-h-[600px] overflow-y-auto pr-2">
            <AnimatePresence>
              {notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="paper-card p-8 rounded-xl relative overflow-hidden group hover:border-gold-300/30 dark:hover:border-gold-300/10 transition-colors"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-blush-50 to-transparent dark:from-gold-300/5 group-hover:from-gold-300/10 pointer-events-none" />

                  {/* Header info */}
                  <div className="flex items-start justify-between mb-4 border-b border-stone-100 dark:border-charcoal-700/50 pb-3">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
                        {note.name}
                      </h4>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-400 dark:text-gold-300 font-semibold block mt-0.5">
                        {note.relationship}
                      </span>
                    </div>
                    <span className="font-sans text-[10px] text-stone-400 dark:text-stone-500">
                      {note.date}
                    </span>
                  </div>

                  {/* Text Message */}
                  <p className="font-serif italic text-sm leading-relaxed text-stone-700 dark:text-stone-300 relative pl-4 border-l-2 border-blush-200 dark:border-gold-300/20">
                    "{note.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
