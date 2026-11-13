import React from 'react';
import { siteConfig } from '../config/site';
import { Logo } from './Logo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer id="site-footer" className="on-dark bg-ink text-white/75 border-t border-white/15">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <Logo onDark />
          <p className="text-base">Missed calls and website leads, turned into booked jobs.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-x-7 gap-y-2 text-base">
          <a id="footer-email-link" href={`mailto:${siteConfig.contactEmail}`} className="text-white hover:underline">
            {siteConfig.contactEmail}
          </a>
          <button type="button" onClick={onOpenPrivacy} className="text-left hover:text-white hover:underline cursor-pointer">
            Privacy Policy
          </button>
          <button type="button" onClick={onOpenTerms} className="text-left hover:text-white hover:underline cursor-pointer">
            Terms of Service
          </button>
          <span>&copy; {new Date().getFullYear()} {siteConfig.name}</span>
        </div>
      </div>
    </footer>
  );
};
