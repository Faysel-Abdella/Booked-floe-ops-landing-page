import React from 'react';
import { siteConfig } from '../config/site';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close legal modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-md bg-primer flex items-center justify-center text-ink">
            {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-4xl text-ink">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
            <p className="text-xs text-slate-500">Last updated: August 2026</p>
          </div>
        </div>

        <div className="overflow-y-auto pr-2 space-y-4 text-sm text-body leading-relaxed custom-scrollbar">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>{siteConfig.name}</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect information when you visit <strong>{siteConfig.domain}</strong> or submit an inquiry.
              </p>
              <h4 className="text-base font-bold text-ink pt-2">1. Information We Collect</h4>
              <p>
                When you submit our contact form or book a call, we collect the contact details you provide (including your name, work email address, company name, phone number, website, and business information).
              </p>
              <h4 className="text-base font-bold text-ink pt-2">2. How We Use Information</h4>
              <p>
                We strictly use your information to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-body">
                <li>Respond to your lead inquiry and discuss our automation services.</li>
                <li>Coordinate appointments or demonstrations requested by you.</li>
                <li>Maintain internal records regarding customer requests.</li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal or business data to third parties for marketing purposes.
              </p>
              <h4 className="text-base font-bold text-ink pt-2">3. Data Security</h4>
              <p>
                We implement industry-standard encryption and security procedures to safeguard your submitted information against unauthorized access or disclosure.
              </p>
              <h4 className="text-base font-bold text-ink pt-2">4. Contact Us</h4>
              <p>
                If you have questions regarding this Privacy Policy, please contact us at <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline font-medium">{siteConfig.contactEmail}</a>.
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the <strong>{siteConfig.name}</strong> website ({siteConfig.domain}). By accessing or using our website, you agree to comply with these Terms.
              </p>
              <h4 className="text-base font-bold text-ink pt-2">1. Services &amp; Consultations</h4>
              <p>
                BookedFlowOps provides lead-response, missed-call recovery, and follow-up workflow systems for service businesses. Any consultations or discussions scheduled through this site are exploratory and do not create a binding service agreement until a formal statement of work is executed.
              </p>
              <h4 className="text-base font-bold text-ink pt-2">2. Intellectual Property</h4>
              <p>
                All website copy, system workflows, visual designs, and branding are the intellectual property of {siteConfig.name}.
              </p>
              <h4 className="text-base font-bold text-ink pt-2">3. Limitation of Liability</h4>
              <p>
                While we strive for high reliability and rapid response architecture, website content is provided on an &ldquo;as is&rdquo; basis for informational and consulting inquiry purposes.
              </p>
              <h4 className="text-base font-bold text-ink pt-2">4. Inquiries</h4>
              <p>
                For inquiries regarding these Terms, please reach out to <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline font-medium">{siteConfig.contactEmail}</a>.
              </p>
            </>
          )}
        </div>

        <div className="pt-6 mt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
