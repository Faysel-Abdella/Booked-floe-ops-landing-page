import React from 'react';
import { Plus } from 'lucide-react';

// Ordered by what stops an owner from booking, not by what is easiest to answer.
const FAQS = [
  {
    q: 'What does the text say, and can I change it?',
    a: 'It is written for your business during setup: your name, your questions, your tone. It reads like someone in your office sent it. If you want different wording, we change it.',
  },
  {
    q: 'What about emergencies, or a customer who needs a real person?',
    a: 'The first question is whether it is urgent. Urgent jobs are flagged and your team is alerted straight away. Any time a conversation needs a person, it is handed to your team with everything the customer has said so far.',
  },
  {
    q: 'Can I see what was said to my customers?',
    a: 'Yes. Your team gets a summary of every lead, and the lead is recorded in your CRM with its status.',
  },
  {
    q: 'Do I have to change my phone number?',
    a: 'No. You keep the number your customers already call.',
  },
  {
    q: 'Do I need a new CRM or a new website?',
    a: 'No. It is set up to work with the CRM and calendar you already use wherever possible, and it connects to the forms on the website you have now.',
  },
  {
    q: 'Do you only work with HVAC companies?',
    a: 'No. It is built for any service business that lives on inbound calls and booked jobs: HVAC, plumbing, roofing, electrical, general contracting, cleaning, landscaping and more.',
  },
  {
    q: 'How quickly can it go live?',
    a: 'Most setups are live within 48 hours of the first call. If you need a deeper integration with your CRM it can take longer, and we will tell you the timeline up front.',
  },
  {
    q: 'What does it cost?',
    a: 'It depends on your call volume and what we connect to. You get a clear price on the free call.',
  },
];

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
        <h2 className="lg:col-span-4 text-5xl sm:text-6xl text-ink">Questions owners ask</h2>

        <div className="lg:col-span-8 border-t-2 border-ink">
          {FAQS.map((item, index) => (
            <details key={item.q} id={`faq-item-${index + 1}`} className="group border-b border-line" open={index === 0}>
              <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-xl font-semibold text-ink">{item.q}</span>
                <Plus
                  className="w-6 h-6 shrink-0 text-ink transition-transform duration-150 group-open:rotate-45"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-6 pr-10 text-lg text-body max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
