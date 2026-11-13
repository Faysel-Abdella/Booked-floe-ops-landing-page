import React from 'react';
import { bookCall } from '../lib/booking';

const STEPS = [
  {
    title: 'We learn how you work',
    desc: 'A 20-minute call about how calls, inquiries and booking are handled in your business today.',
  },
  {
    title: 'We build it around you',
    desc: 'Your questions, your service area, your calendar. You do not touch any of the setup.',
  },
  {
    title: 'We launch and keep tuning',
    desc: 'It goes live, we watch response times and bookings, and we adjust it as we learn.',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process-section" className="py-16 sm:py-24 bg-primer">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl sm:text-6xl text-ink">We set it up. You keep working.</h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
          {STEPS.map((step, i) => (
            <li key={step.title} id={`process-step-0${i + 1}`} className="border-t-2 border-ink pt-5">
              <span className="font-display text-6xl font-bold leading-none text-ink" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-3 text-3xl text-ink">{step.title}</h3>
              <p className="mt-3 text-lg text-body">{step.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5">
          <button id="process-cta-book-call" type="button" onClick={bookCall} className="btn-primary">
            Book a free call
          </button>
          <p className="text-lg text-body">Most setups are live within 48 hours of that first call.</p>
        </div>
      </div>
    </section>
  );
};
