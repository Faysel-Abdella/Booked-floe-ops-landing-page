import React from 'react';
import { Check } from 'lucide-react';
import { bookCall } from '../lib/booking';
import { PhoneSimulator } from './PhoneSimulator';

// The three things an owner asks before anything else.
const FACTS = [
  'Keep your current phone number',
  'Works with the CRM and calendar you already use',
  'We set it all up. Nothing for you to install or learn',
];

export const Hero: React.FC = () => {
  return (
    <section id="top" className="pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 lg:gap-y-8">
        <div className="lg:col-span-7 lg:row-start-1 lg:self-end">
          {/* Two short lines, sized so each stays on one line from 320px up. */}
          <h1 className="text-[clamp(2.6rem,13.5vw,5.75rem)] lg:text-[clamp(4.5rem,8.2vw,6rem)] text-ink">
            <span className="block">Miss the call.</span>
            <span className="block">Still book the job.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-body max-w-xl">
            You&apos;re on a roof or under a sink. The phone rings out, and the homeowner dials the
            next contractor on Google. We text them back within seconds, ask the right questions,
            and put the job on your calendar.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button id="hero-primary-cta" type="button" onClick={bookCall} className="btn-primary">
              Book a free 20-minute call
            </button>
            <a id="hero-calculator-cta" href="#revenue-calculator" className="btn-secondary">
              See what missed calls cost you
            </a>
          </div>
          <p className="mt-3 text-base text-body">Free. 20 minutes. No obligation.</p>
        </div>

        {/* On phones the demo comes straight after the buttons, ahead of the fact list. */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 lg:self-center">
          <PhoneSimulator />
        </div>

        <ul className="lg:col-span-7 lg:row-start-2 lg:self-start space-y-2 text-base text-ink font-medium">
          {FACTS.map((fact) => (
            <li key={fact} className="flex items-start gap-2.5">
              <Check className="w-5 h-5 mt-0.5 shrink-0 text-booked" strokeWidth={3} aria-hidden="true" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
