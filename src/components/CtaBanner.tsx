import React from 'react';
import { ArrowRight, PhoneCall, CheckCircle } from 'lucide-react';

interface CtaBannerProps {
  onOpenBooking: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenBooking }) => {
  return (
    <section id="cta-banner-section" className="py-20 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-sky-400">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Lead Flow Strategy Call</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              How many leads could you be losing every month?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s look at your current lead flow and see where opportunities may be falling through the cracks.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="cta-banner-book-call-btn"
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all duration-150 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-sky-400 group"
              >
                <span>Book a Free Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-medium pt-2">
              No pressure. Just a quick conversation about your current process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
