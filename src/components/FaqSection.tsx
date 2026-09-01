import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'What exactly does BookedFlowOps do?',
      a: 'We build lead-response and follow-up systems that help businesses respond to missed calls and website inquiries quickly, qualify inbound leads, and move them toward booking.',
    },
    {
      q: 'Do I need to replace my existing CRM?',
      a: 'No. The goal is to work with your existing tools and processes whenever possible.',
    },
    {
      q: 'What happens when a customer needs a human?',
      a: 'The system can hand the conversation to your team and notify the appropriate person when human involvement is needed.',
    },
    {
      q: 'Can this work with my existing website?',
      a: 'Yes. The website lead-response system can be connected to an existing website and configured around the business’s current lead flow.',
    },
    {
      q: 'Do you only work with HVAC companies?',
      a: 'No. BookedFlowOps is designed for service businesses that rely on inbound calls, website inquiries and appointments or jobs.',
    },
    {
      q: 'How quickly can this be implemented?',
      a: 'Implementation depends on the business’s existing systems and workflow. After an initial conversation, we can outline the required setup and timeline.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Clear, honest answers about how BookedFlowOps integrates into your operations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                id={`faq-accordion-item-${index + 1}`}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index + 1}`}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-sky-600"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index + 1}`}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
