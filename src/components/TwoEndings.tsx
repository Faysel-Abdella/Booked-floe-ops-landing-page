import React from 'react';
import { Check, X } from 'lucide-react';

interface Beat {
  time: string;
  title: string;
  detail: string;
}

const VOICEMAIL: Beat[] = [
  { time: '6:14', title: 'The phone rings out', detail: 'Your crew is driving or tied up on another job.' },
  { time: '6:15', title: 'It goes to voicemail', detail: 'They hang up without leaving a message.' },
  { time: '6:16', title: 'Back to Google', detail: 'They tap the next company on the list.' },
  { time: '6:18', title: 'Someone else picks up', detail: 'That company books the visit.' },
];

const TEXT_BACK: Beat[] = [
  { time: '6:14', title: 'The phone rings out', detail: 'The missed call is picked up automatically.' },
  {
    time: '6:14',
    title: 'A text goes out within seconds',
    detail: 'From your business: sorry we missed you, how can we help?',
  },
  {
    time: '6:15',
    title: 'They reply with the problem',
    detail: 'The system asks your questions and checks urgency and service area.',
  },
  {
    time: '6:16',
    title: 'The visit is booked',
    detail: 'It lands on your calendar and your team gets a summary. If it needs a person, it is handed to one.',
  },
];

export const TwoEndings: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-primer">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl sm:text-6xl text-ink">Same call. Two endings.</h2>
          <p className="mt-5 text-lg sm:text-xl text-body">
            It&apos;s 6:14 PM. A homeowner&apos;s AC just quit, your crew is still out, and the
            office has gone home. You already paid to make that phone ring. The next four minutes
            decide who gets the job.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Ending one: voicemail. Deliberately quieter than the other column. */}
          <div className="rounded-lg border border-line p-6 sm:p-8">
            <h3 className="text-3xl text-ink">With voicemail</h3>
            <Timeline beats={VOICEMAIL} />
            <p className="mt-6 flex items-start gap-3 rounded-md bg-missed-tint text-missed px-4 py-3.5 font-semibold">
              <X className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={3} aria-hidden="true" />
              <span>Job lost. It went to whoever picked up.</span>
            </p>
          </div>

          {/* Ending two: text-back */}
          <div className="rounded-lg border-2 border-ink bg-white p-6 sm:p-8">
            <h3 className="text-3xl text-ink">With BookedFlowOps</h3>
            <Timeline beats={TEXT_BACK} strong />
            <p className="mt-6 flex items-start gap-3 rounded-md bg-booked-tint text-booked px-4 py-3.5 font-semibold">
              <Check className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={3} aria-hidden="true" />
              <span>Job booked, before you&apos;re back in the truck.</span>
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-lg text-ink">
          <strong className="font-semibold">Website leads get the same treatment.</strong>{' '}
          <span className="text-body">
            When researchers tested 2,241 US companies for{' '}
            <a
              href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-ink"
            >
              Harvard Business Review
            </a>
            , the average reply to a web lead took 42 hours. Yours goes out in under 10 seconds,
            day or night.
          </span>
        </p>
      </div>
    </section>
  );
};

const Timeline: React.FC<{ beats: Beat[]; strong?: boolean }> = ({ beats, strong = false }) => (
  <ol className="mt-6 divide-y divide-line border-y border-line">
    {beats.map((beat, i) => (
      <li key={i} className="grid grid-cols-[4.25rem_1fr] gap-x-4 py-4">
        <span className={`font-display text-2xl font-semibold leading-tight tabular-nums ${strong ? 'text-ink' : 'text-body'}`}>
          {beat.time}
          <span className="sr-only"> PM</span>
        </span>
        <span>
          <span className="block font-semibold text-ink">{beat.title}</span>
          <span className="block text-body">{beat.detail}</span>
        </span>
      </li>
    ))}
  </ol>
);
