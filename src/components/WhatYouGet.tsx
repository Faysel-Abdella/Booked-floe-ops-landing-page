import React from 'react';
import { Check } from 'lucide-react';

const PARTS = [
  {
    id: 'offer-missed-call-recovery',
    name: 'Missed-call text-back',
    detail:
      "On a ladder, driving, closed for the night: every caller you can't answer gets a text from your business within seconds. Then it's a real back-and-forth by text until the job is booked or handed to you.",
  },
  {
    id: 'offer-speed-to-lead',
    name: 'Website lead response',
    detail:
      "Someone fills in the form on your site and hears back in under 10 seconds, while they're still on your page and before they fill in the next company's form.",
  },
  {
    id: 'offer-lead-follow-up',
    name: 'Follow-up',
    detail:
      'No more phone tag. Leads who go quiet get a nudge automatically, and your office can see where every lead stands. Nobody has to remember to text back.',
  },
];

const EVERY_LEAD = [
  'Qualifying questions written for your trade',
  'Help booking a time',
  'Hand-off to a person when it needs one',
  'An alert to your team',
  'A record in your CRM',
];

export const WhatYouGet: React.FC = () => {
  return (
    <section id="what-we-do" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl sm:text-6xl text-ink">One system that answers when you can&apos;t.</h2>
          <p className="mt-5 text-lg sm:text-xl text-body">
            Your crew stays on the job. The first reply, the questions and the booking happen
            without anyone stopping work to chase a lead.
          </p>
        </div>

        <dl className="mt-12 border-t-2 border-ink">
          {PARTS.map((part) => (
            <div
              key={part.id}
              id={part.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-2 py-7 border-b border-line"
            >
              <dt className="md:col-span-4 font-display text-3xl font-bold leading-none text-ink">{part.name}</dt>
              <dd className="md:col-span-8 text-lg text-body max-w-2xl">{part.detail}</dd>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 py-7 border-b border-line">
            <dt className="md:col-span-4 font-display text-3xl font-bold leading-none text-ink">
              On every lead
            </dt>
            <dd className="md:col-span-8">
              <ul className="space-y-2.5 text-lg text-ink">
                {EVERY_LEAD.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 mt-1 shrink-0 text-booked" strokeWidth={3} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <p className="mt-12 font-display text-4xl sm:text-5xl font-bold leading-none text-ink text-balance">
          Same phone number. Same CRM. Same calendar.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-body">
          It isn&apos;t a call center, and it isn&apos;t another app for your crew to learn. It
          runs behind the tools and habits your business already has.
        </p>
      </div>
    </section>
  );
};
