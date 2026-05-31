import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Memories', href: '#memories' },
    { name: 'Love Notes', href: '#notes' },
    { name: 'Details', href: '#details' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white dark:bg-charcoal-900 py-4 shadow-sm'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Signature */}
        <a
          href="#"
          className={`font-serif text-xl md:text-2xl font-semibold tracking-wide transition-colors duration-300 ${scrolled ? 'text-stone-900 dark:text-gold-200' : 'text-white'
            }`}
        >
          Rheafe &amp; Jayfel
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-sans font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full ${scrolled
                ? 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-gold-200 after:bg-stone-950 dark:after:bg-gold-200'
                : 'text-stone-200 hover:text-white after:bg-white'
                }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Button Toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none transition-colors duration-300 ${scrolled
              ? 'text-stone-700 dark:text-stone-200'
              : 'text-stone-200 hover:text-white'
              }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed right-0 left-0 bg-white dark:bg-charcoal-900 shadow-lg border-b border-stone-100 dark:border-charcoal-800 transition-all duration-300 ease-in-out ${scrolled ? 'top-[50px]' : 'top-[76px]'
          } ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}
      >
        <div className="px-6 py-8 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-gold-200 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};