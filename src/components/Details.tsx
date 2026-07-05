import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Sparkles, CheckSquare } from 'lucide-react';

export const Details: React.FC = () => {
  return (
    <section id="details" className="py-24 md:py-32 bg-stone-100 dark:bg-charcoal-800 border-t border-stone-200/40 dark:border-charcoal-700/30">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-semibold">
            A Perfect Celebration
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-gold-200 mt-2 mb-6">
            The Memories
          </h2>
          <div className="h-[1px] w-24 bg-blush-200 dark:bg-gold-300/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Details Content Cards */}
          <div className="space-y-8 flex flex-col justify-between">
            {/* Card 1: Ceremony */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="paper-card p-8 rounded-xl flex items-start space-x-6 hover:border-gold-300/20 transition-all duration-300 flex-1"
            >
              <div className="w-12 h-12 rounded-full bg-gold-100/50 dark:bg-gold-300/10 flex items-center justify-center shrink-0 border border-gold-300/20">
                <Sparkles className="w-5 h-5 text-gold-300" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-2">The Ceremony</h3>
                <p className="font-serif italic text-sm text-gold-400 dark:text-gold-300 mb-4">1:00 PM - 2:00 PM</p>
                <div className="space-y-2 text-stone-600 dark:text-stone-400 text-sm font-sans">
                  <p className="flex items-center space-x-2">
                    <MapPin size={14} className="text-stone-400" />
                    <span className="font-medium text-stone-800 dark:text-stone-200">Cris & Charms Events</span>
                  </p>
                  <p className="pl-6"> Ground Floor Unit 101, BALGAN PLACE, 3 BLDG, 140 Kalayaan Ave, Diliman, Quezon City, 1101 Metro Manila</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Reception */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="paper-card p-8 rounded-xl flex items-start space-x-6 hover:border-gold-300/20 transition-all duration-300 flex-1"
            >
              <div className="w-12 h-12 rounded-full bg-gold-100/50 dark:bg-gold-300/10 flex items-center justify-center shrink-0 border border-gold-300/20">
                <Clock className="w-5 h-5 text-gold-300" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-2">The Reception</h3>
                <p className="font-serif italic text-sm text-gold-400 dark:text-gold-300 mb-4">Just the two of us</p>
                <div className="space-y-2 text-stone-600 dark:text-stone-400 text-sm font-sans">
                  <p className="flex items-center space-x-2">
                    <MapPin size={14} className="text-stone-400" />
                    <span className="font-medium text-stone-800 dark:text-stone-200">The Grass Residences</span>
                  </p>
                  <p className="pl-6">Grass Residences Tower 4, Bago Bantay, Quezon City, 1105 Metro Manila</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Registry, Dress Code & RSVP */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-panel p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <h4 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-2 flex items-center space-x-2">
                  <CheckSquare size={16} className="text-gold-300" />
                  <span>Elopement Wedding</span>
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                  We chose a simple elopement wedding, where only the groom and bride shared this sacred moment together before God. It was a private ceremony filled with love, prayer, and commitment.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-2 flex items-center space-x-2">
                  <CheckSquare size={16} className="text-gold-300" />
                  <span>Celebration</span>
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                  There was no formal reception or large gathering, only a quiet celebration of vows exchanged between us. Our families were informed, but we kept the ceremony intimate and private as we begin our journey as one.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Luxury Minimalist Vector Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full rounded-2xl border border-stone-200 dark:border-charcoal-700/50 bg-white dark:bg-charcoal-900 overflow-hidden shadow-md flex flex-col justify-between"
          >
            {/* Map Header */}
            <div className="px-8 py-5 border-b border-stone-100 dark:border-charcoal-800 flex items-center justify-between">
              <span className="font-serif italic text-stone-900 dark:text-gold-200">Quezon City, Philippines</span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">Map</span>
            </div>

            {/* Custom SVG Map Illustration - Geographically styled for QC */}
            <div className="flex-1 min-h-[300px] flex items-center justify-center p-6 bg-stone-50/50 dark:bg-charcoal-950/20 relative">

              <svg viewBox="0 0 400 300" className="w-full max-w-[340px] h-auto text-stone-400 dark:text-stone-700 select-none">
                
                {/* --- ROADS & LANDMARKS --- */}
                
                {/* EDSA (Major Highway curving on the left) */}
                <path
                  d="M 60,0 Q 100,150 50,300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="opacity-20 dark:opacity-40"
                />

                {/* Elliptical Road / Quezon Memorial Circle */}
                <circle 
                  cx="260" 
                  cy="150" 
                  r="26" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  className="opacity-30 dark:opacity-50" 
                />
                <circle cx="260" cy="150" r="18" fill="currentColor" className="opacity-10 dark:opacity-20" />
                <text x="260" y="153" textAnchor="middle" className="font-sans text-[7px] tracking-widest fill-stone-500 dark:fill-stone-400 uppercase">
                  Quezon Memorial Circle
                </text>

                {/* North Avenue */}
                <path
                  d="M 242,131 Q 170,95 90,82"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="opacity-30 dark:opacity-50"
                />

                {/* Quezon Avenue */}
                <path
                  d="M 240,167 Q 160,205 75,250"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-30 dark:opacity-50"
                />

                {/* Kalayaan Avenue */}
                <path
                  d="M 252,175 Q 235,215 210,300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-30 dark:opacity-50"
                />

                {/* Driving Route / Connection Line - Updated to follow roads *through* the Circle */}
                <path
                  d="M 230 230 L 252 175 A 26 26 0 0 1 242 131 L 170 95 L 90 82 L 75 70 L 70 70"
                  fill="none"
                  stroke="#d4af37" /* Gold accent line */
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-70 dark:opacity-60"
                />

                {/* --- LOCATIONS --- */}

                {/* Point 1: Cris & Charms Events (Kalayaan Ave) */}
                <g transform="translate(230, 230)">
                  <circle r="6" className="fill-gold-300 dark:fill-gold-200 animate-ping opacity-60" />
                  <circle r="4" className="fill-gold-300 dark:fill-gold-200" />
                  <text x="12" y="4" className="font-serif text-[11px] font-medium fill-stone-800 dark:fill-stone-200">
                    Cris & Charms Events
                  </text>
                  <text x="12" y="14" className="font-sans text-[8px] tracking-wider fill-stone-400 dark:fill-stone-500 uppercase">
                    Ceremony
                  </text>
                </g>

                {/* Point 2: The Grass Residences (Behind SM North) */}
                <g transform="translate(70, 70)">
                  <circle r="6" className="fill-gold-300 dark:fill-gold-200 animate-ping opacity-60" />
                  <circle r="4" className="fill-gold-300 dark:fill-gold-200" />
                  <text x="12" y="-2" className="font-serif text-[11px] font-medium fill-stone-800 dark:fill-stone-200">
                    The Grass Residences
                  </text>
                  <text x="12" y="8" className="font-sans text-[8px] tracking-wider fill-stone-400 dark:fill-stone-500 uppercase">
                    Reception
                  </text>
                </g>

                {/* Point 3: SM City North EDSA Landmark */}
                <g transform="translate(95, 95)" className="opacity-70">
                  <rect x="-4" y="-4" width="8" height="8" rx="1" className="fill-stone-300 dark:fill-stone-600" />
                  <text x="8" y="12" className="font-sans text-[8px] font-medium fill-stone-500 dark:fill-stone-400">
                    SM North EDSA
                  </text>
                </g>
              </svg>

              {/* Compass Indicator */}
              <div className="absolute bottom-6 right-6 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-stone-200 dark:border-charcoal-800 flex items-center justify-center text-gold-300 font-serif text-[10px] font-semibold bg-white dark:bg-charcoal-900">
                  N
                </div>
                <div className="w-[1px] h-3 bg-stone-300 dark:bg-charcoal-800 mt-1" />
              </div>
            </div>

            {/* Map footer with details */}
            <div className="px-8 py-5 border-t border-stone-100 dark:border-charcoal-800 bg-stone-50/50 dark:bg-charcoal-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-stone-500 dark:text-stone-400 font-sans">
              <span>✈ NAIA Terminal 3 ~ 2hrs drive</span>
              <a
                href="https://www.google.com/maps/place/Cris+%26+Charms+Events+Management/@14.6469172,121.0498611,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b75f780f2233:0x4e74edce76c10857!8m2!3d14.646912!4d121.052436!16s%2Fg%2F11vqsc0t0j?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 dark:text-gold-300 font-semibold hover:underline mt-2 sm:mt-0"
              >
                Open Google Maps &rarr;
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};