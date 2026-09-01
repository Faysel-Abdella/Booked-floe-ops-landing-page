import React from 'react';
import { ArrowRight, Search, Wrench, Rocket } from 'lucide-react';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'We Learn Your Process',
      desc: 'Understand how your business currently handles calls, inquiries, qualification, and booking.',
      icon: Search,
    },
    {
      num: '02',
      title: 'We Build the System',
      desc: 'Create the response, qualification, and follow-up workflow specifically around your existing operations.',
      icon: Wrench,
    },
    {
      num: '03',
      title: 'We Launch & Optimize',
      desc: 'Deploy it live, monitor response metrics and booking rates, and continuously refine the workflow over time.',
      icon: Rocket,
    },
  ];

  return (
    <section id="process-section" className="py-24 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Implementation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Simple to start. Built around your business.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We handle the setup and configuration so you don&apos;t have to figure out complex technical integrations or disrupt your daily business operations.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                id={`process-step-${step.num}`}
                className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono text-sky-600">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4">
          <button
            id="process-cta-book-call"
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-all duration-150 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-600 group"
          >
            <span>Book a Free Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
