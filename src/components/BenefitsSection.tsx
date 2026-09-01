import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface BenefitsSectionProps {
  onOpenBooking: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenBooking }) => {
  const benefits = [
    'Respond to missed calls automatically',
    'Respond to website leads in seconds',
    'Qualify inbound inquiries',
    'Reduce repetitive administrative work',
    'Give your team better lead visibility',
    'Recover opportunities that would otherwise be lost',
  ];

  return (
    <section id="benefits-section" className="py-24 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Short Explanation & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
                Operational Efficiency
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Your team should focus on the job — <span className="text-sky-600">not chasing leads.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                When technicians and office staff are constantly interrupted by unvetted calls or overwhelmed with manual follow-up messages, valuable time is burned and good customers wait. BookedFlowOps handles the initial response and qualification automatically, keeping your schedule full and your technicians focused on delivery.
              </p>

              <div className="pt-2">
                <button
                  id="benefits-cta-button"
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-600 group"
                >
                  <span>See What This Looks Like For You</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Side: Benefit Checklist */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
                  Direct Business Impact
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div
                      key={benefit}
                      id={`benefit-item-${index + 1}`}
                      className="flex items-start gap-3.5 p-2 rounded-lg hover:bg-white transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-slate-800">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
