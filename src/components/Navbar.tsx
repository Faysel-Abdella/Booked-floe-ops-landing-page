import React from 'react';
import { siteConfig } from '../config/site';
import { bookCall } from '../lib/booking';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  return (
    <header id="main-navigation" className="fixed inset-x-0 top-0 z-50 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Page sections" className="hidden md:flex items-center gap-7 text-base font-medium text-body">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink transition-colors">
              {item.name}
            </a>
          ))}
        </nav>

        <button
          id="nav-cta-book-call"
          type="button"
          onClick={bookCall}
          className="btn-primary !min-h-10 !py-2 !px-4 !text-base whitespace-nowrap"
        >
          Book a free call
        </button>
      </div>
    </header>
  );
};
