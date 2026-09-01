import React from 'react';
import { PhoneOff, Hourglass, UserX, TrendingDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      id: 'problem-missed-calls',
      icon: PhoneOff,
      title: 'Missed Calls',
      description:
        'Potential customers call while your team is busy on the job, after hours, or already helping another customer.',
    },
    {
      id: 'problem-slow-responses',
      icon: Hourglass,
      title: 'Slow Responses',
      description:
        'A lead waits minutes or hours for a response while competitors are only one Google search away.',
    },
    {
      id: 'problem-manual-follow-up',
      icon: UserX,
      title: 'Manual Follow-Up',
      description:
        'Your staff shouldn’t have to manually chase every inbound inquiry or remember to text back hours later.',
    },
    {
      id: 'problem-lost-revenue',
      icon: TrendingDown,
      title: 'Lost Revenue',
      description:
        'The result is simple: opportunities and revenue that should have become booked jobs disappear.',
    },
  ];

  return (
    <section id="problem-section" className="py-20 md:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            You&apos;re already paying for the leads. <br className="hidden sm:inline" />
            <span className="text-slate-500">Don&apos;t let them disappear.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Service businesses invest significant money and effort into marketing and reputation to generate inbound inquiries. Yet, high percentages of opportunities slip away simply because no one answers or responds in the first critical minutes.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-slate-50/60 border border-slate-200 hover:border-slate-300 hover:bg-white rounded-xl p-6 transition-all duration-200 flex flex-col justify-between hover:shadow-md hover:shadow-slate-100"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-5">
                    <Icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
