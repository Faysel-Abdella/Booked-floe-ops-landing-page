import React from 'react';
import { siteConfig } from '../config/site';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, Mail, PhoneCall } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToContact: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onJumpToContact,
}) => {
  if (!isOpen) return null;

  const isPlaceholder = siteConfig.bookingUrl === 'BOOKING_URL_PLACEHOLDER';

  const handleBookingClick = () => {
    if (!isPlaceholder) {
      window.open(siteConfig.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      onClose();
      onJumpToContact();
    }
  };

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="booking-modal-container"
        className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-sky-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>Lead Flow Strategy Session</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            Book a Free 20-Min Strategy Call
          </h3>
          <p className="text-sm text-slate-600">
            Let&apos;s evaluate your current inbound lead handling, identify where missed calls are occurring, and map out a response system for your business.
          </p>
        </div>

        {/* What We Cover */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 mb-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            What we review together:
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Current missed-call &amp; website response bottlenecks</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Qualification questions tailored to your service trade</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Compatibility with your existing CRM and calendar</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleBookingClick}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl transition-colors shadow-sm hover:shadow-md"
          >
            <span>{isPlaceholder ? 'Continue to Inquiry & Details' : 'Open Calendar Scheduler'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-500">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="hover:text-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>Or email {siteConfig.contactEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
