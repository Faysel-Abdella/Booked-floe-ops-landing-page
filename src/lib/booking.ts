import { siteConfig } from '../config/site';

/** True once a real scheduler link has been set in src/config/site.ts. */
export const hasBookingUrl =
  Boolean(siteConfig.bookingUrl) && siteConfig.bookingUrl !== 'BOOKING_URL_PLACEHOLDER';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToSection(id: string, focusId?: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  if (focusId) {
    window.setTimeout(
      () => document.getElementById(focusId)?.focus({ preventScroll: true }),
      prefersReducedMotion() ? 0 : 500,
    );
  }
}

/**
 * The single action behind every "Book a free call" button.
 * With a scheduler link configured it opens the calendar; until then it takes
 * the visitor straight to the short request form.
 */
export function bookCall() {
  if (hasBookingUrl) {
    window.open(siteConfig.bookingUrl, '_blank', 'noopener,noreferrer');
    return;
  }
  scrollToSection('contact', 'firstName');
}
