import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sliders, DollarSign, TrendingUp, AlertTriangle, ShieldCheck, Sparkles, Check } from 'lucide-react';

interface RevenueCalculatorProps {
  onOpenBooking: () => void;
}

interface TradePreset {
  label: string;
  calls: number;
  ticket: number;
}

const PRESETS: Record<string, TradePreset> = {
  hvac: { label: 'HVAC Heating & AC', calls: 18, ticket: 1650 },
  plumbing: { label: 'Plumbing & Drains', calls: 22, ticket: 950 },
  roofing: { label: 'Roofing & Exterior', calls: 12, ticket: 4800 },
  electrical: { label: 'Electrical Contractors', calls: 16, ticket: 850 },
  general: { label: 'General Contracting', calls: 10, ticket: 3500 },
};

// Smooth animated number counter hook
function useAnimatedNumber(target: number, duration: number = 400): number {
  const [current, setCurrent] = useState<number>(target);

  useEffect(() => {
    const start = current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(start + diff * ease));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    const handle = requestAnimationFrame(update);
    return () => cancelAnimationFrame(handle);
  }, [target, duration]);

  return current;
}

export const RevenueCalculator: React.FC<RevenueCalculatorProps> = ({ onOpenBooking }) => {
  const [selectedTrade, setSelectedTrade] = useState<string>('hvac');
  const [missedCalls, setMissedCalls] = useState<number>(18);
  const [avgTicket, setAvgTicket] = useState<number>(1650);

  const handleSelectTrade = (tradeKey: string) => {
    setSelectedTrade(tradeKey);
    const preset = PRESETS[tradeKey];
    if (preset) {
      setMissedCalls(preset.calls);
      setAvgTicket(preset.ticket);
    }
  };

  const competitorLossRate = 0.75;
  const recoveryRate = 0.45;

  const targetMonthlyGrossLost = Math.round(missedCalls * avgTicket * competitorLossRate);
  const targetMonthlyRecoverable = Math.round(missedCalls * avgTicket * recoveryRate);
  const targetAnnualRecoverable = targetMonthlyRecoverable * 12;

  const animatedLost = useAnimatedNumber(targetMonthlyGrossLost);
  const animatedRecovered = useAnimatedNumber(targetMonthlyRecoverable);
  const animatedAnnual = useAnimatedNumber(targetAnnualRecoverable);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Slider progress percentages for custom styling
  const callsPercent = ((missedCalls - 4) / (60 - 4)) * 100;
  const ticketPercent = ((avgTicket - 300) / (8000 - 300)) * 100;

  return (
    <section id="revenue-calculator" className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-sky-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />

      {/* Subtle Dark Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Subtle Stagger Animation */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-sky-400 shadow-inner">
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Financial Model</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How much revenue is slipping through your missed calls?
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            In service trades, homeowners rarely wait for voicemail. Over 80% hang up and hire the next listing. Drag the sliders to see what your business is currently leaking.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">
            Quick Benchmarks By Trade
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            {Object.entries(PRESETS).map(([key, data]) => {
              const isSelected = selectedTrade === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectTrade(key)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activePreset"
                      className="absolute inset-0 bg-sky-600 rounded-xl -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  {data.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Calculator Console */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Sliders Controller */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-9 space-y-8 backdrop-blur-md flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Specular */}
            <div className="absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-white/5 to-transparent rounded-tl-3xl pointer-events-none" />

            <div className="space-y-8 relative z-10">
              {/* Slider 1: Missed Calls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="missed-calls-slider" className="text-sm font-bold text-slate-200 block">
                      Estimated Unanswered Calls / Month
                    </label>
                    <span className="text-xs text-slate-400">Calls missed due to field work, lunch, or after-hours</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-sky-400 px-3 py-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
                    {missedCalls}
                  </div>
                </div>

                <div className="relative pt-2">
                  <input
                    id="missed-calls-slider"
                    type="range"
                    min="4"
                    max="60"
                    step="1"
                    value={missedCalls}
                    onChange={(e) => {
                      setMissedCalls(Number(e.target.value));
                      setSelectedTrade('custom');
                    }}
                    style={{
                      background: `linear-gradient(to right, #0284c7 0%, #38bdf8 ${callsPercent}%, #334155 ${callsPercent}%, #334155 100%)`,
                    }}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer transition-all"
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>4 calls (Small crew)</span>
                  <span>30 calls</span>
                  <span>60+ calls (High volume)</span>
                </div>
              </div>

              {/* Slider 2: Average Ticket Value */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="avg-ticket-slider" className="text-sm font-bold text-slate-200 block">
                      Average Ticket / Job Value
                    </label>
                    <span className="text-xs text-slate-400">Mean revenue earned per completed booking</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-400 px-3 py-1 bg-slate-800/80 rounded-xl border border-slate-700/80">
                    {formatCurrency(avgTicket)}
                  </div>
                </div>

                <div className="relative pt-2">
                  <input
                    id="avg-ticket-slider"
                    type="range"
                    min="300"
                    max="8000"
                    step="50"
                    value={avgTicket}
                    onChange={(e) => {
                      setAvgTicket(Number(e.target.value));
                      setSelectedTrade('custom');
                    }}
                    style={{
                      background: `linear-gradient(to right, #059669 0%, #34d399 ${ticketPercent}%, #334155 ${ticketPercent}%, #334155 100%)`,
                    }}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer transition-all"
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>$300 (Standard repair)</span>
                  <span>$3,500</span>
                  <span>$8,000+ (Full system install)</span>
                </div>
              </div>
            </div>

            {/* Credibility note */}
            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                Based on benchmark dispatch metrics: 75% of callers who encounter voicemail dial a competitor within 3 minutes. Automated instant text-back recovers an estimated 45% into confirmed bookings.
              </span>
            </div>
          </div>

          {/* Right Column: Real-Time Dynamic Financial Readout */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Subtle glow border ring */}
            <div className="absolute inset-0 border border-sky-500/20 rounded-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Leaking Revenue Card */}
              <motion.div
                layout
                className="p-5 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-1.5 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-rose-300 uppercase tracking-wider">
                  <span>Monthly Revenue Lost</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-rose-400 tracking-tight">
                  {formatCurrency(animatedLost)}
                  <span className="text-xs text-rose-300/80 font-normal ml-1.5">/ mo</span>
                </div>
                <p className="text-[11px] text-rose-300/70 pt-1 leading-snug">
                  High-intent homeowners who found and hired your competitor instead.
                </p>
              </motion.div>

              {/* Recoverable Revenue Card */}
              <motion.div
                layout
                className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-700/80 space-y-2 relative overflow-hidden shadow-lg shadow-emerald-950/30"
              >
                <div className="flex items-center justify-between text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  <span>Recoverable with BookedFlowOps</span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-700/50">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+45% Capture</span>
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">
                  +{formatCurrency(animatedRecovered)}
                  <span className="text-xs text-emerald-300/80 font-normal ml-1.5">/ mo</span>
                </div>

                <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200">
                  <span className="text-slate-400">Annual Recovered Cash:</span>
                  <span className="font-black font-mono text-emerald-300 text-sm">
                    +{formatCurrency(animatedAnnual)} / yr
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Direct High-Urgency Booking CTA */}
            <div className="pt-6 space-y-3 relative z-10">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-2xl transition-all duration-150 shadow-lg shadow-sky-600/30 group cursor-pointer"
              >
                {/* Subtle Button Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">Recover Your Next Missed Job</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>

              <div className="flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero change to your current phone lines &bull; Ready in 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
