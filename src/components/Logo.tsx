import React from 'react';
import { siteConfig } from '../config/site';

export const Logo: React.FC<{ onDark?: boolean }> = ({ onDark = false }) => (
  <a href="#top" className="inline-flex items-center gap-2.5 rounded-sm" aria-label={`${siteConfig.name} home`}>
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill={onDark ? '#ffc400' : '#0b2545'} />
      <path
        d="M9 16.5l4.5 4.5L23 11"
        stroke={onDark ? '#0b2545' : '#ffc400'}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className={`hidden min-[350px]:inline font-display text-2xl font-bold leading-none ${onDark ? 'text-white' : 'text-ink'}`}>
      {siteConfig.name}
    </span>
  </a>
);
