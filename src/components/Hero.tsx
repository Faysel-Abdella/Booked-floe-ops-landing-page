import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Sliders, CheckCircle2, Sparkles, Clock, PhoneCall } from 'lucide-react';
import { PhoneSimulator } from './PhoneSimulator';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToHowItWorks: () => void;
  onScrollToCalculator?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToHowItWorks, onScrollToCalculator }) => {
  const handleScrollToCalc = () => {
    if (onScrollToCalculator) {
      onScrollToCalculator();
      return;
    }
    const el = document.getElementById('revenue-calculator');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero-section" className="relative pt-32 pb-20 md:pt-38 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden border-b border-slate-100">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 left-1/3 w-[550px] h-[550px] bg-gradient-to-br from-sky-400/10 via-sky-200/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-indigo-400/10 via-emerald-200/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle Background Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Direct Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-7 text-left"
          >
            {/* Live Status Positioning Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-xs font-semibold text-sky-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Speed-to-Lead &bull; 4-Second Missed-Call Recovery</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Stop losing <span className="text-sky-600">high-ticket jobs</span> to the first contractor who answers.
            </h1>

            {/* Realistic Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              When your team is on a roof or crawling under a sink, unanswered calls go to voicemail and homeowners dial your competitor. BookedFlowOps texts back in 4 seconds, qualifies the issue, and books the job directly on your schedule.
            </p>

            {/* 4 Practical Value Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Keep your existing phone numbers</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sub-10 second speed-to-lead</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom qualification for your trade</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant dispatch alerts to your team</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id="hero-primary-cta"
                  type="button"
                  onClick={onOpenBooking}
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-bold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-2xl transition-all duration-150 shadow-lg shadow-sky-600/20 group cursor-pointer"
                >
                  <span>Book a Free 20-Min Strategy Call</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-calculator-cta"
                  type="button"
                  onClick={handleScrollToCalc}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl transition-all duration-150 shadow-xs focus-visible:ring-2 focus-visible:ring-sky-600 cursor-pointer"
                >
                  <Sliders className="w-4 h-4 text-sky-600" />
                  <span>Calculate Lost Revenue</span>
                </button>
              </div>

              {/* Trust Signal */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero complex software to learn &bull; Operational in under 48 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Realistic Phone Simulator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center"
          >
            <PhoneSimulator />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
