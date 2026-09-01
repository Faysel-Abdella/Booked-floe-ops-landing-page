import React from 'react';
import { PhoneCall, Globe, RefreshCw, Check } from 'lucide-react';

export const CoreOffer: React.FC = () => {
  const offers = [
    {
      id: 'offer-missed-call-recovery',
      icon: PhoneCall,
      title: 'Missed-Call Recovery',
      tagline: 'Automatically follow up with callers your team couldn’t answer.',
      features: [
        'Instant missed-call text',
        'Two-way SMS conversation',
        'Lead qualification',
        'Lead information collection',
        'Booking assistance',
        'Team notifications',
      ],
      badge: 'Core Solution',
    },
    {
      id: 'offer-speed-to-lead',
      icon: Globe,
      title: 'Website Speed-to-Lead',
      tagline: 'Respond to website inquiries in under 10 seconds.',
      features: [
        'Instant inquiry response',
        'Lead qualification',
        'Automated follow-up',
        'Booking assistance',
        'Human handoff when necessary',
      ],
      badge: 'Instant Response',
    },
    {
      id: 'offer-lead-follow-up',
      icon: RefreshCw,
      title: 'Lead Follow-Up',
      tagline: 'Keep conversations moving without requiring your staff to manually follow up with every inquiry.',
      features: [
        'Automated follow-ups',
        'Lead status tracking',
        'CRM integration',
        'Notifications',
        'Custom workflows',
      ],
      badge: 'System Automation',
    },
  ];

  return (
    <section id="what-we-do" className="py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            One system. Fewer lost leads.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A cohesive lead capture and response infrastructure designed specifically for appointment and job-based service companies.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                id={offer.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-slate-100"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                      {offer.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {offer.tagline}
                  </p>

                  <div className="pt-6 border-t border-slate-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Capabilities
                    </div>
                    {offer.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
