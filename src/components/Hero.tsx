import React, { useState } from 'react';
import { ArrowRight, PhoneMissed, MessageSquare, CheckCircle2, CalendarCheck, Sparkles, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToHowItWorks }) => {
  const [activeTab, setActiveTab] = useState<'missedCall' | 'websiteLead'>('missedCall');

  return (
    <section id="hero-section" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-slate-50/80 via-white to-white overflow-hidden border-b border-slate-100">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Positioning Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span>Speed-to-Lead &amp; Missed-Call Recovery</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Turn missed calls &amp; leads into <span className="text-sky-600">booked jobs.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              BookedFlowOps helps service businesses respond to missed calls and website inquiries in seconds — so fewer potential customers move on to the competition.
            </p>

            {/* CTA Group */}
            <div className="space-y-3.5 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id="hero-primary-cta"
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-600 group"
                >
                  <span>Book a Free Call</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  id="hero-secondary-cta"
                  type="button"
                  onClick={onScrollToHowItWorks}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all duration-150 shadow-xs focus-visible:ring-2 focus-visible:ring-sky-600"
                >
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Trust Line */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Built around your existing lead flow &amp; dispatch schedule.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Business Workflow Visualization */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-5 sm:p-6 relative">
              {/* Header inside visualization */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Lead Response Flow
                  </span>
                </div>
                {/* Scenario Toggle */}
                <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('missedCall')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === 'missedCall'
                        ? 'bg-white text-sky-700 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Missed Call
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('websiteLead')}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === 'websiteLead'
                        ? 'bg-white text-sky-700 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Web Inquiry
                  </button>
                </div>
              </div>

              {/* 4-Step Pipeline Flow Cards */}
              <div className="space-y-3">
                {/* Step 1: Inbound Trigger */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneMissed className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900 uppercase tracking-wider">
                        {activeTab === 'missedCall' ? '01. CALL MISSED' : '01. WEB INQUIRY'}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">0.0s</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeTab === 'missedCall'
                        ? 'Inbound call from (555) 234-8901 — staff busy on job site'
                        : 'New quote request submitted via website contact form'}
                    </p>
                  </div>
                </div>

                {/* Connecting Line with Fast Indicator */}
                <div className="flex items-center justify-center">
                  <div className="w-px h-3 bg-slate-200 relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full bg-sky-100 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    </div>
                  </div>
                </div>

                {/* Step 2: Instant Text */}
                <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-3.5 flex items-start gap-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-sky-900 uppercase tracking-wider">
                        02. INSTANT TEXT
                      </span>
                      <span className="text-sky-700 font-mono text-[11px] font-bold">4.2s later</span>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 text-xs text-slate-700 border border-sky-100 italic shadow-2xs">
                      &ldquo;Hi, sorry we missed your call! Are you looking for emergency service or scheduling a free quote?&rdquo;
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="flex items-center justify-center">
                  <div className="w-px h-3 bg-slate-200 relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full bg-sky-100 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    </div>
                  </div>
                </div>

                {/* Step 3: Lead Qualified */}
                <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900 uppercase tracking-wider">
                        03. LEAD QUALIFIED
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">32s total</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                        Type: Urgent Repair
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                        Location: Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                <div className="flex items-center justify-center">
                  <div className="w-px h-3 bg-slate-200 relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Step 4: Booked & Team Notified */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-emerald-900 uppercase tracking-wider">
                        04. BOOKED &amp; DISPATCHED
                      </span>
                      <span className="text-emerald-700 font-mono text-[11px] font-bold">58s total</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Appointment scheduled on calendar. Dispatch team received immediate SMS summary.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom outcome badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  Response speed: &lt; 10 seconds
                </span>
                <span className="text-emerald-700 font-semibold">Customer retained</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
