import React, { useState } from 'react';
import { bookCall } from '../lib/booking';

interface TradePreset {
  label: string;
  calls: number;
  ticket: number;
}

// Starting points only, so the sliders are not empty. Visitors set their own numbers.
const PRESETS: Record<string, TradePreset> = {
  hvac: { label: 'HVAC', calls: 18, ticket: 1650 },
  plumbing: { label: 'Plumbing', calls: 22, ticket: 950 },
  roofing: { label: 'Roofing', calls: 12, ticket: 4800 },
  electrical: { label: 'Electrical', calls: 16, ticket: 850 },
  general: { label: 'General contracting', calls: 10, ticket: 3500 },
};

const CALLS = { min: 2, max: 80, step: 1 };
const TICKET = { min: 200, max: 10000, step: 50 };
const BOOK_RATE = { min: 10, max: 80, step: 5 };

const usd = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const fill = (value: number, range: { min: number; max: number }) => {
  const pct = ((value - range.min) / (range.max - range.min)) * 100;
  return { background: `linear-gradient(to right, #ffc400 ${pct}%, #2c4a72 ${pct}%)` };
};

export const RevenueCalculator: React.FC = () => {
  const [trade, setTrade] = useState<string>('hvac');
  const [missedCalls, setMissedCalls] = useState<number>(PRESETS.hvac.calls);
  const [avgTicket, setAvgTicket] = useState<number>(PRESETS.hvac.ticket);
  const [bookRate, setBookRate] = useState<number>(40);

  const selectTrade = (key: string) => {
    setTrade(key);
    setMissedCalls(PRESETS[key].calls);
    setAvgTicket(PRESETS[key].ticket);
  };

  const jobsLost = (missedCalls * bookRate) / 100;
  const monthlyLost = Math.round(jobsLost * avgTicket);
  const yearlyLost = monthlyLost * 12;
  const oneInThree = Math.round(monthlyLost / 3);

  return (
    <section id="revenue-calculator" className="on-dark py-16 sm:py-24 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl sm:text-6xl">What are missed calls costing you?</h2>
          <p className="mt-5 text-lg sm:text-xl text-white/75">
            Put in your own numbers. This is your math, not an industry average.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-9">
            <div>
              <div id="trade-label" className="text-base font-semibold">
                Start from a trade
              </div>
              <div role="group" aria-labelledby="trade-label" className="mt-3 flex flex-wrap gap-2">
                {Object.entries(PRESETS).map(([key, preset]) => {
                  const active = trade === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => selectTrade(key)}
                      className={`px-3.5 py-2 rounded-md text-base font-semibold border-2 transition-colors cursor-pointer ${
                        active
                          ? 'bg-white text-ink border-white'
                          : 'border-white/30 text-white hover:border-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Slider
              id="missed-calls-slider"
              label="Calls you miss in a month"
              hint="On a job, at lunch, after hours."
              value={missedCalls}
              display={String(missedCalls)}
              range={CALLS}
              onChange={(v) => {
                setMissedCalls(v);
                setTrade('custom');
              }}
            />

            <Slider
              id="avg-ticket-slider"
              label="Your average job"
              hint="What a typical booked job brings in."
              value={avgTicket}
              display={usd(avgTicket)}
              range={TICKET}
              onChange={(v) => {
                setAvgTicket(v);
                setTrade('custom');
              }}
            />

            <Slider
              id="book-rate-slider"
              label="Missed callers who would have booked"
              hint="If you had answered, how many would have become a job?"
              value={bookRate}
              display={`${bookRate}%`}
              range={BOOK_RATE}
              onChange={setBookRate}
            />
          </div>

          {/* Result */}
          <div className="lg:col-span-5">
            <div className="rounded-lg bg-ink-soft p-6 sm:p-8" aria-live="polite">
              <div className="text-base font-semibold text-white/75">Walking away each month</div>
              <div className="mt-1 font-display font-bold text-hivis leading-none text-7xl sm:text-8xl tabular-nums">
                {usd(monthlyLost)}
              </div>

              <dl className="mt-6 divide-y divide-white/15 border-y border-white/15 text-lg">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-white/75">Jobs lost a month</dt>
                  <dd className="font-display text-2xl font-semibold tabular-nums">
                    about {Math.max(1, Math.round(jobsLost))}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-white/75">Over a year</dt>
                  <dd className="font-display text-2xl font-semibold tabular-nums">{usd(yearlyLost)}</dd>
                </div>
              </dl>

              <p className="mt-6 text-lg">
                Win back just 1 in 3 of those jobs and that&apos;s{' '}
                <strong className="font-bold text-hivis">{usd(oneInThree)} a month</strong>.
              </p>

              <button type="button" onClick={bookCall} className="btn-primary w-full mt-6">
                Book a free call
              </button>
              <p className="mt-4 text-sm text-white/60">
                An estimate from the numbers you entered, not a guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SliderProps {
  id: string;
  label: string;
  hint: string;
  value: number;
  display: string;
  range: { min: number; max: number; step: number };
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ id, label, hint, value, display, range, onChange }) => (
  <div>
    <div className="flex items-end justify-between gap-4">
      <label htmlFor={id} className="block">
        <span className="block text-lg font-semibold">{label}</span>
        <span className="block text-base text-white/65">{hint}</span>
      </label>
      <output htmlFor={id} className="font-display text-4xl font-bold leading-none tabular-nums">
        {display}
      </output>
    </div>
    <input
      id={id}
      type="range"
      min={range.min}
      max={range.max}
      step={range.step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={fill(value, range)}
      className="slider mt-4"
    />
  </div>
);
