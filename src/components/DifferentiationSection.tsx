import React from 'react';
import { ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const DifferentiationSection: React.FC = () => {
  const gaps = [
    { name: 'Lead', desc: 'Inbound phone call or web form submission' },
    { name: 'Response', desc: 'Instant text / under 10-second acknowledgement' },
    { name: 'Qualification', desc: 'Service details, location, urgency gathered' },
    { name: 'Booking', desc: 'Scheduled appointment & human notification' },
  ];

  return (
    <section id="differentiation-section" className="py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            We don&apos;t replace your business. <br />
            <span className="text-slate-500">We improve the way leads move through it.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            BookedFlowOps works around the systems and processes your company already has. We focus on closing the operational friction points between the moment a prospect discovers you and the moment they are booked.
          </p>
        </div>

        {/* Lead Journey Gap Visualizer */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 mb-12 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">
            Where leads get lost vs. Where BookedFlowOps protects revenue
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {gaps.map((item, idx) => (
              <div key={item.name} className="relative">
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-center h-full flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors">
                  <div>
                    <div className="text-xs font-mono text-sky-700 font-bold mb-1">
                      STAGE 0{idx + 1}
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-1.5">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-600 leading-normal">
                      {item.desc}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Protected</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-sky-50 rounded-xl p-4 border border-sky-100 text-sm text-slate-700">
            <strong className="text-slate-900">Core Philosophy:</strong> The goal is not to introduce unnecessary software bloat. The goal is to ensure high-intent leads never slip away to a competitor.
          </div>
        </div>
      </div>
    </section>
  );
};
