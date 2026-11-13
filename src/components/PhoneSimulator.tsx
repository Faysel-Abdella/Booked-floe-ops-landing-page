import React, { useEffect, useRef, useState } from 'react';
import { Check, PhoneMissed, RotateCcw } from 'lucide-react';

interface TradeScenario {
  id: string;
  tab: string;
  caller: string;
  callerPhone: string;
  firstText: string;
  customerReply: string;
  offer: string;
  customerConfirm: string;
  bookedJob: string;
  slot: string;
}

const SCENARIOS: TradeScenario[] = [
  {
    id: 'hvac',
    tab: 'HVAC',
    caller: 'Sarah Mitchell',
    callerPhone: '(555) 342-8901',
    firstText:
      'Hi, this is Apex Heating & Cooling. Sorry we missed your call, our crew is on a job. Is this an emergency or are you looking to schedule a tune-up?',
    customerReply: 'Emergency. The AC stopped blowing cold air and the house is already 86 degrees.',
    offer:
      'Understood. We can have a technician out for an emergency diagnostic tomorrow between 8 and 10 AM. Want me to book that for you?',
    customerConfirm: 'Yes please.',
    bookedJob: 'Emergency AC diagnostic',
    slot: 'Tomorrow, 8–10 AM',
  },
  {
    id: 'plumbing',
    tab: 'Plumbing',
    caller: 'David Miller',
    callerPhone: '(555) 782-4412',
    firstText:
      'Hi, this is BlueLine Plumbing. Sorry we missed your call, we are out on a job. Is this an active leak or something you want to schedule?',
    customerReply: 'Active leak. The water heater in the basement is leaking across the floor.',
    offer:
      'Got it. We can have a plumber at your place tomorrow at 9:30 AM. Want me to book that for you?',
    customerConfirm: 'Yes, 9:30 works.',
    bookedJob: 'Leaking water heater',
    slot: 'Tomorrow, 9:30 AM',
  },
  {
    id: 'roofing',
    tab: 'Roofing',
    caller: 'Elena Rostova',
    callerPhone: '(555) 918-2044',
    firstText:
      'Hi, this is Summit Roofing. Sorry we missed your call, we are out on an inspection. Do you need a repair or a quote for a replacement?',
    customerReply: 'Repair. Wind tore shingles off and water is dripping into the upstairs hallway.',
    offer:
      'We can have an estimator out tomorrow at 11 AM to tarp it and take photos for your insurance. Want me to book that?',
    customerConfirm: 'Yes, thank you.',
    bookedJob: 'Storm damage, active leak',
    slot: 'Tomorrow, 11 AM',
  },
];

/**
 * The conversation plays in six beats:
 * 0 missed call · 1 auto-reply · 2 customer reply · 3 time offered · 4 customer confirms · 5 booked
 */
const LAST_STEP = 5;
const STEP_DELAY_MS = [2200, 2600, 2400, 2400, 1300];
const STEP_STATUS = [
  'Missed call',
  'Text sent automatically',
  'Customer replied',
  'Time offered',
  'Customer confirmed',
  'Job booked',
];
// An auto-reply is on its way after these steps, so show the typing dots.
const AUTO_REPLY_FOLLOWS = [0, 2];

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const PhoneSimulator: React.FC = () => {
  const [scenarioId, setScenarioId] = useState<string>('hvac');
  // Visitors who ask for reduced motion get the finished conversation, not a replay.
  const [step, setStep] = useState<number>(() => (reducedMotion() ? LAST_STEP : 0));
  const [typing, setTyping] = useState<boolean>(false);
  const threadRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];

  useEffect(() => {
    setTyping(false);
    if (step >= LAST_STEP) return;

    const timers: number[] = [];
    if (AUTO_REPLY_FOLLOWS.includes(step)) {
      timers.push(window.setTimeout(() => setTyping(true), 700));
    }
    timers.push(window.setTimeout(() => setStep((s) => s + 1), STEP_DELAY_MS[step]));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [step, scenarioId]);

  // Keep the newest message in view, the way a real thread does.
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }, [step, typing]);

  const restart = (id: string = scenarioId) => {
    setScenarioId(id);
    setStep(reducedMotion() ? LAST_STEP : 0);
  };

  return (
    <div className="w-full max-w-[22rem] mx-auto">
      {/* Trade picker */}
      <div role="group" aria-label="Choose a trade for the sample conversation" className="grid grid-cols-3 gap-1 p-1 mb-4 rounded-md bg-primer">
        {SCENARIOS.map((s) => {
          const active = s.id === scenarioId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => restart(s.id)}
              className={`py-2 rounded text-base font-semibold transition-colors cursor-pointer ${
                active ? 'bg-ink text-white' : 'text-body hover:text-ink'
              }`}
            >
              {s.tab}
            </button>
          );
        })}
      </div>

      {/* Phone */}
      <div className="rounded-[2.5rem] bg-ink p-2.5 shadow-[0_24px_48px_-20px_rgb(11_37_69/0.55)]">
        <div className="rounded-[2rem] bg-white overflow-hidden flex flex-col h-[31rem]">
          {/* Who the thread is with */}
          <div className="px-4 pt-4 pb-3 border-b border-line flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primer text-ink font-bold flex items-center justify-center" aria-hidden="true">
              {scenario.caller.charAt(0)}
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold text-ink">{scenario.caller}</div>
              <div className="text-sm text-body">{scenario.callerPhone}</div>
            </div>
          </div>

          {/* Thread */}
          <div ref={threadRef} className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3 text-[0.9375rem] leading-snug" aria-live="off">
            <div key={`${scenario.id}-missed`} className="message-in flex items-center gap-2.5 rounded-lg bg-missed-tint text-missed px-3 py-2.5">
              <PhoneMissed className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="font-semibold">Missed call, 6:42 PM</span>
              <span className="ml-auto text-sm">No voicemail</span>
            </div>

            {step >= 1 && (
              <Bubble from="business" label="Auto-reply, 6:42 PM">
                {scenario.firstText}
              </Bubble>
            )}
            {step >= 2 && <Bubble from="customer">{scenario.customerReply}</Bubble>}
            {step >= 3 && <Bubble from="business">{scenario.offer}</Bubble>}
            {step >= 4 && <Bubble from="customer">{scenario.customerConfirm}</Bubble>}

            {typing && step < LAST_STEP && (
              <div className="message-in flex justify-end" aria-hidden="true">
                <div className="flex gap-1 rounded-2xl rounded-br-sm bg-ink px-3.5 py-3">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
            )}

            {step >= 5 && (
              <div className="message-in rounded-lg bg-booked-tint px-3 py-3">
                <div className="flex items-center gap-2 font-bold text-booked">
                  <Check className="w-4 h-4 shrink-0" strokeWidth={3.5} aria-hidden="true" />
                  <span>Booked: {scenario.slot}</span>
                </div>
                <p className="mt-1 text-ink">{scenario.bookedJob}. Summary sent to your team.</p>
              </div>
            )}
          </div>

          {/* Status + replay */}
          <div className="px-4 py-3 border-t border-line flex items-center justify-between gap-3 text-sm">
            <span className={`font-semibold ${step === 0 ? 'text-missed' : step === LAST_STEP ? 'text-booked' : 'text-body'}`}>
              {STEP_STATUS[step]}
            </span>
            <button
              type="button"
              onClick={() => restart()}
              className="inline-flex items-center gap-1.5 font-semibold text-ink hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Replay
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-body text-center">
        A sample conversation. Yours uses your business name and your questions.
      </p>
    </div>
  );
};

const Bubble: React.FC<{ from: 'business' | 'customer'; label?: string; children: React.ReactNode }> = ({
  from,
  label,
  children,
}) => (
  <div className={`message-in flex flex-col ${from === 'business' ? 'items-end' : 'items-start'}`}>
    {label && <span className="mb-1 text-xs font-semibold text-body">{label}</span>}
    <div
      className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl ${
        from === 'business' ? 'bg-ink text-white rounded-br-sm' : 'bg-primer text-ink rounded-bl-sm'
      }`}
    >
      {children}
    </div>
  </div>
);
