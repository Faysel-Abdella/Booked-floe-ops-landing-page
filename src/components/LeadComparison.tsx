import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PhoneMissed, PhoneOff, MessageSquare, CalendarCheck, Clock, XCircle, CheckCircle2, AlertOctagon, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface LeadComparisonProps {
  onOpenBooking: () => void;
}

export const LeadComparison: React.FC<LeadComparisonProps> = ({ onOpenBooking }) => {
  const [replayKey, setReplayKey] = useState<number>(0);

  const stepsWithout = [
    {
      time: '6:14 PM',
      title: 'Inbound Call Rings',
      desc: 'A homeowner calls with an urgent repair request. Your technicians are driving or already occupied on another job site.',
      status: 'neutral',
    },
    {
      time: '6:15 PM',
      title: 'Call Routes to Voicemail',
      desc: 'The phone rings 5 times and clicks into your generic voicemail greeting.',
      status: 'neutral',
    },
    {
      time: '6:16 PM',
      title: 'Caller Hangs Up Silently',
      desc: 'More than 80% of residential callers refuse to leave a voicemail. They immediately return to the Google search results.',
      status: 'negative',
    },
    {
      time: '6:18 PM',
      title: 'Competitor Answers & Books',
      desc: 'The next contractor on Google answers on the second ring, books the diagnostic slot, and collects the deposit.',
      status: 'critical',
    },
  ];

  const stepsWith = [
    {
      time: '6:14 PM',
      title: 'Call Finishes Ringing',
      desc: 'Your phone completes ringing without answer. The system instantly registers the missed opportunity.',
      status: 'neutral',
    },
    {
      time: '6:14 PM (4.1s)',
      title: 'Automated Tailored Text Sent',
      desc: 'The caller receives an immediate branded SMS apologizing for missing them and asking how they can be assisted.',
      status: 'active',
    },
    {
      time: '6:15 PM',
      title: 'Live Qualification & Issue Triage',
      desc: 'Caller replies with their issue and address. The system confirms urgency and filters out non-service territory.',
      status: 'active',
    },
    {
      time: '6:16 PM',
      title: 'Calendar Slot Locked & Dispatched',
      desc: 'Appointment locked into your schedule. Dispatch receives an SMS summary. Customer stops searching Google.',
      status: 'success',
    },
  ];

  return (
    <section id="lead-comparison" className="py-24 md:py-32 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Background Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>The Reality Check</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            What happens when an inbound call goes unanswered?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            When a homeowner has an urgent breakdown, they don&apos;t wait for your team to check voicemail tomorrow morning. Here is the exact contrast between a conventional phone setup and an automated response engine.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div key={replayKey} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Column A: Without BookedFlowOps */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200/90 flex items-center justify-center text-rose-600">
                    <PhoneOff className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Without BookedFlowOps
                    </h3>
                    <p className="text-xs text-slate-500">The Conventional Lead Leak</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/70 font-mono">
                  Revenue Lost
                </span>
              </div>

              {/* Connected Timeline Column */}
              <div className="space-y-6 relative pl-3">
                {/* Vertical Dotted Track Line */}
                <div className="absolute left-[22px] top-3 bottom-3 w-0.5 border-l-2 border-dashed border-rose-200" />

                {stepsWithout.map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12 + 0.1, duration: 0.35 }}
                    className="flex items-start gap-4 relative z-10 group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border-2 transition-colors ${
                        step.status === 'critical'
                          ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                          : step.status === 'negative'
                          ? 'bg-rose-100 border-rose-300 text-rose-800'
                          : 'bg-white border-slate-300 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-slate-50/70 group-hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 transition-colors">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                        <span>{step.title}</span>
                        <span className="font-mono text-[11px] text-slate-500 font-semibold">{step.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Outcome Card */}
            <div className="mt-8 pt-4 border-t border-slate-100 bg-rose-50/70 -mx-6 -mb-6 sm:-mx-9 sm:-mb-9 p-5 rounded-b-3xl flex items-center justify-between border-t border-rose-100">
              <div className="flex items-center gap-2.5">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-rose-950 uppercase tracking-wide">
                    Net Outcome
                  </div>
                  <div className="text-xs text-rose-800">
                    $1,800 job permanently captured by competitor
                  </div>
                </div>
              </div>
              <span className="text-xs font-extrabold font-mono text-rose-700 bg-white px-2.5 py-1 rounded-md border border-rose-200 shadow-2xs">
                0% Recovered
              </span>
            </div>
          </div>

          {/* Column B: With BookedFlowOps */}
          <div className="bg-gradient-to-b from-sky-50/40 via-white to-white border-2 border-sky-400 rounded-3xl p-6 sm:p-9 flex flex-col justify-between shadow-xl shadow-sky-100/60 relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-sky-100 mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm shadow-sky-600/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      With BookedFlowOps
                    </h3>
                    <p className="text-xs text-sky-700 font-semibold">4.1s Speed-to-Lead Engine</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Lead Secured
                </span>
              </div>

              {/* Connected Timeline Column */}
              <div className="space-y-6 relative pl-3">
                {/* Vertical Solid Vibrant Track Line */}
                <div className="absolute left-[22px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-sky-300 via-sky-500 to-emerald-500" />

                {stepsWith.map((step, idx) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12 + 0.15, duration: 0.35 }}
                    className="flex items-start gap-4 relative z-10 group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 border-2 shadow-xs transition-colors ${
                        step.status === 'success'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : step.status === 'active'
                          ? 'bg-sky-600 border-sky-600 text-white'
                          : 'bg-white border-sky-400 text-sky-800'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-white group-hover:bg-sky-50/50 border border-sky-200/80 rounded-2xl p-3.5 transition-colors shadow-2xs">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                        <span>{step.title}</span>
                        <span className="font-mono text-[11px] text-sky-700 font-bold">{step.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Outcome Card */}
            <div className="mt-8 pt-4 border-t border-sky-100 bg-emerald-50/80 -mx-6 -mb-6 sm:-mx-9 sm:-mb-9 p-5 rounded-b-3xl flex items-center justify-between border-t border-emerald-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                    Net Outcome
                  </div>
                  <div className="text-xs text-emerald-800">
                    $1,800 job locked in while hands were occupied on site
                  </div>
                </div>
              </div>
              <span className="text-xs font-extrabold font-mono text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-emerald-200 shadow-2xs">
                100% Protected
              </span>
            </div>
          </div>
        </div>

        {/* Action Button & Replay Controller */}
        <div className="text-center pt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-2xl transition-all duration-150 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-sky-600 group cursor-pointer"
          >
            <span>Protect Your Business From Missed Leads</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
            className="inline-flex items-center gap-2 px-5 py-4 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-2xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Replay Contrast</span>
          </button>
        </div>
      </div>
    </section>
  );
};
