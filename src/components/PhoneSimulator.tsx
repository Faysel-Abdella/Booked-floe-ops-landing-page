import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneMissed, MessageSquare, CheckCircle2, Clock, RotateCcw, Play, Pause, ChevronRight, Sparkles, Bell } from 'lucide-react';

interface TradeScenario {
  id: string;
  name: string;
  caller: string;
  callerPhone: string;
  inquiry: string;
  aiPrompt: string;
  customerReply: string;
  aiBookingConfirm: string;
  jobValue: string;
  slot: string;
}

const SCENARIOS: TradeScenario[] = [
  {
    id: 'hvac',
    name: 'HVAC Emergency',
    caller: 'Sarah Mitchell',
    callerPhone: '(555) 342-8901',
    inquiry: 'Inbound Call (Missed)',
    aiPrompt: 'Hi Sarah, apologies for missing your call from Apex Heating & Cooling! Our crew is on a job site. Are you dealing with an emergency breakdown or looking to schedule a seasonal tune-up?',
    customerReply: 'Emergency. The AC stopped blowing cold air and our house is already 86 degrees.',
    aiBookingConfirm: 'Understood Sarah. We have our technician available for an emergency diagnostic tomorrow between 8:00 AM – 10:00 AM. Should we lock that slot in for your home?',
    jobValue: '$650 – $1,400',
    slot: 'Tomorrow, 8:00 AM',
  },
  {
    id: 'plumbing',
    name: 'Urgent Plumbing',
    caller: 'David Miller',
    callerPhone: '(555) 782-4412',
    inquiry: 'Inbound Call (Missed)',
    aiPrompt: 'Hi David, sorry we missed your call at BlueLine Plumbing! We are currently dispatched. Is this an active leak or a standard installation request?',
    customerReply: 'Our 50-gallon water heater in the basement is leaking water across the floor.',
    aiBookingConfirm: 'Got it David. We can have our master plumber at your property tomorrow at 9:30 AM to inspect and shut off the main line safely. Can we confirm that time?',
    jobValue: '$1,200 – $2,800',
    slot: 'Tomorrow, 9:30 AM',
  },
  {
    id: 'roofing',
    name: 'Roof Inspection',
    caller: 'Elena Rostova',
    callerPhone: '(555) 918-2044',
    inquiry: 'Inbound Call (Missed)',
    aiPrompt: 'Hello Elena, sorry we missed your call at Summit Roofing! We are currently on an inspection. Are you needing storm damage repair or a full replacement quote?',
    customerReply: 'High winds tore shingles off our roof and we have water dripping into the upstairs hallway.',
    aiBookingConfirm: 'We can have our senior estimator out tomorrow at 11:00 AM for emergency tarping and insurance photo documentation. Would that time work?',
    jobValue: '$3,500 – $8,200',
    slot: 'Tomorrow, 11:00 AM',
  },
];

export const PhoneSimulator: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('hvac');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Auto-play timeline step controller
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout;

    if (currentStep === 0) {
      // Step 0: Missed call shows, then after 1.8s start typing animation
      timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setCurrentStep(1);
        }, 1400);
      }, 1800);
    } else if (currentStep === 1) {
      // Step 1: Automated SMS shown, customer responds after 2.6s
      timer = setTimeout(() => {
        setCurrentStep(2);
      }, 2600);
    } else if (currentStep === 2) {
      // Step 2: Customer replied, show AI typing then confirm
      timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setCurrentStep(3);
        }, 1300);
      }, 2000);
    } else if (currentStep === 3) {
      // Step 3: Complete, pause briefly before keeping at completed state
      timer = setTimeout(() => {
        // stays completed
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, activeScenarioId]);

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    setCurrentStep(0);
    setIsTyping(false);
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setCurrentStep(0);
    setIsTyping(false);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Trade Selector Pills with Animated Sliding Background */}
      <div className="relative flex items-center justify-between gap-1 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90 mb-5 shadow-xs">
        {SCENARIOS.map((s) => {
          const isActive = activeScenarioId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleScenarioChange(s.id)}
              className={`relative z-10 flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 text-center truncate ${
                isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTradePill"
                  className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/80 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Realistic Hardware Frame with Buttons & Outer Glow */}
      <div className="relative">
        {/* Soft Ambient Phone Shadow & Backlight Glow */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500/20 via-slate-400/10 to-indigo-500/20 rounded-[50px] blur-xl opacity-75 -z-10 pointer-events-none" />

        {/* Physical Hardware Volume & Power Buttons */}
        <div className="absolute -left-1 top-24 w-1 h-10 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-1 top-38 w-1 h-12 bg-slate-700 rounded-l-md" />
        <div className="absolute -right-1 top-28 w-1 h-16 bg-slate-700 rounded-r-md" />

        {/* Outer Phone Shell */}
        <div className="relative rounded-[46px] bg-slate-950 p-3.5 shadow-2xl border-4 border-slate-800/90">
          {/* Glass Specular Glare Reflection */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-white/10 via-transparent to-transparent rounded-tr-[42px] pointer-events-none z-30" />

          {/* Interactive Dynamic Island */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300">
            <motion.div
              animate={{
                width: currentStep === 3 ? 220 : currentStep === 0 ? 170 : 130,
                height: currentStep === 3 ? 34 : 26,
              }}
              className="bg-black rounded-full px-3.5 flex items-center justify-between shadow-md border border-slate-800/60"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-tight">
                  {currentStep === 3 ? 'CALENDAR BOOKED' : currentStep === 0 ? 'CALL DETECTED' : 'ACTIVE 4.1s'}
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            </motion.div>
          </div>

          {/* Inner High-Resolution Screen */}
          <div className="bg-slate-50 rounded-[36px] overflow-hidden border border-slate-200/90 flex flex-col h-[525px] text-slate-900 relative">
            {/* Status Bar */}
            <div className="pt-3.5 pb-2 px-7 flex items-center justify-between text-[11px] font-semibold text-slate-700 bg-white/90 backdrop-blur-xs border-b border-slate-100 select-none z-20">
              <span className="font-mono">6:42 PM</span>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <span>5G</span>
                <div className="w-4 h-2 rounded-xs border border-slate-400 p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-700 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Inbound Contact Header */}
            <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center justify-between z-10 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-sky-100 border border-sky-200 text-sky-800 font-bold text-xs flex items-center justify-center">
                    {scenario.caller.charAt(0)}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{scenario.caller}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      Caller
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {scenario.callerPhone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-sky-600" />
                <span>Auto-Pilot</span>
              </div>
            </div>

            {/* Live Message Stream Container */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs relative">
              {/* Step 0: Missed Call Incident Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-rose-50/90 border border-rose-200 rounded-2xl p-3 shadow-2xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5 text-rose-600 animate-pulse">
                    <PhoneMissed className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-rose-950 uppercase tracking-wider">
                        Missed Inbound Call
                      </span>
                      <span className="text-rose-700 font-mono text-[10px] font-semibold">6:42:01 PM</span>
                    </div>
                    <p className="text-[11px] text-rose-800 leading-snug">
                      Caller hung up with no voicemail. Tech team occupied on site.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Typing Indicator for AI (between step 0 and 1) */}
              <AnimatePresence>
                {isTyping && currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-2 px-1 text-[11px] text-sky-700 font-semibold"
                  >
                    <div className="bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-2xs">
                      <span className="text-[10px] text-sky-800 font-medium mr-1">BookedFlowOps responding</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 typing-dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 typing-dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 typing-dot-3" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 1: Immediate SMS Sent to Customer */}
              {currentStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 font-medium">
                    <span className="text-sky-700 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-600" />
                      Sent in 4.1s
                    </span>
                    <span className="font-mono">6:42:05 PM</span>
                  </div>
                  <div className="bg-sky-600 text-white rounded-2xl rounded-tr-xs p-3 text-xs leading-relaxed shadow-sm">
                    {scenario.aiPrompt}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Customer Reply */}
              {currentStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 font-medium">
                    <span className="text-slate-700 font-semibold">{scenario.caller}</span>
                    <span className="font-mono">6:42:24 PM</span>
                  </div>
                  <div className="bg-white border border-slate-200/90 text-slate-800 rounded-2xl rounded-tl-xs p-3 text-xs leading-relaxed shadow-xs">
                    {scenario.customerReply}
                  </div>
                </motion.div>
              )}

              {/* Typing Indicator for AI (between step 2 and 3) */}
              <AnimatePresence>
                {isTyping && currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-2 px-1 text-[11px] text-sky-700 font-semibold"
                  >
                    <div className="bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-2xs">
                      <span className="text-[10px] text-sky-800 font-medium mr-1">Qualifying issue</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 typing-dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 typing-dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 typing-dot-3" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: Calendar Lock-in & Dispatch Alert */}
              {currentStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="space-y-2.5"
                >
                  <div className="bg-sky-600 text-white rounded-2xl rounded-tr-xs p-3 text-xs leading-relaxed shadow-sm">
                    {scenario.aiBookingConfirm}
                  </div>

                  {/* Confirmed Dispatch Notification Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold text-emerald-950 text-xs tracking-tight">
                          Dispatch Calendar Locked
                        </span>
                      </div>
                      <span className="text-[10px] font-bold font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        CONFIRMED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-emerald-200/60">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Time Slot:</span>
                        <span className="font-bold text-slate-900">{scenario.slot}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Est. Ticket:</span>
                        <span className="font-extrabold text-emerald-700 font-mono">{scenario.jobValue}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Bottom Playback & Progress Controller */}
            <div className="p-3 bg-white/95 backdrop-blur-xs border-t border-slate-200/80 flex items-center justify-between text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  Step {currentStep + 1} of 4
                </span>
                {/* Visual Progress Dots */}
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3].map((stepIdx) => (
                    <div
                      key={stepIdx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        stepIdx === currentStep
                          ? 'w-4 bg-sky-600'
                          : stepIdx < currentStep
                          ? 'w-2 bg-emerald-500'
                          : 'w-1.5 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold transition-all active:scale-95"
                >
                  <RotateCcw className="w-3 h-3 text-slate-600" />
                  <span>Replay</span>
                </button>

                {currentStep < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsTyping(false);
                      setCurrentStep((prev) => Math.min(3, prev + 1));
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white bg-sky-600 hover:bg-sky-700 text-xs font-semibold transition-all active:scale-95 shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3 h-3 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
