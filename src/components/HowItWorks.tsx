import React from 'react';
import { PhoneIncoming, Zap, CheckCircle2, CalendarCheck2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Lead Comes In',
      desc: 'A customer calls your business number or submits an inquiry through your website form.',
      icon: PhoneIncoming,
      accent: 'text-sky-600',
      iconBg: 'bg-sky-50 border-sky-100',
    },
    {
      step: '02',
      title: 'Respond Instantly',
      desc: 'If the call is missed, the system automatically texts the caller. Website leads receive an immediate response.',
      icon: Zap,
      accent: 'text-blue-600',
      iconBg: 'bg-blue-50 border-blue-100',
    },
    {
      step: '03',
      title: 'Qualify',
      desc: 'The system asks the right questions and collects the critical information your dispatch or estimators need.',
      icon: CheckCircle2,
      accent: 'text-indigo-600',
      iconBg: 'bg-indigo-50 border-indigo-100',
    },
    {
      step: '04',
      title: 'Book or Hand Off',
      desc: 'Qualified leads are moved toward booking, while your team is notified when human involvement is needed.',
      icon: CalendarCheck2,
      accent: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            System Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            From missed opportunity to booked job.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A continuous, disciplined lead response loop that operates seamlessly in the background so your team never misses revenue.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                id={`how-it-works-step-${s.step}`}
                className="relative bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-mono text-slate-400">
                      {s.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${s.iconBg}`}>
                      <Icon className={`w-5 h-5 ${s.accent}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Subtitle / Progress tag */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Step {idx + 1} of 4</span>
                  {idx < 3 ? (
                    <ArrowRight className="w-4 h-4 text-slate-400 hidden lg:block" />
                  ) : (
                    <span className="text-emerald-700 font-semibold">Job Secured</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
