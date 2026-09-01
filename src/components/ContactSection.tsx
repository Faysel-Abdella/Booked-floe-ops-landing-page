import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { ContactFormData, ContactApiResponse } from '../types';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Building, Phone, Globe, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    website: '',
    businessType: '',
    monthlyLeadsVolume: '',
    missedCallHandling: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail.trim())) {
      newErrors.workEmail = 'Please enter a valid work email address';
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.businessType) {
      newErrors.businessType = 'Please select your business type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ContactApiResponse = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setSubmissionId(data.submissionId || null);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          workEmail: '',
          companyName: '',
          phone: '',
          website: '',
          businessType: '',
          monthlyLeadsVolume: '',
          missedCallHandling: '',
          message: '',
        });
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        setSubmitError(
          data.message || 'Unable to submit your inquiry. Please verify your information and try again.'
        );
      }
    } catch (err) {
      console.error('Network error during form submission:', err);
      setSubmitError(
        'A network error occurred. Please try again or email us directly at hello@faysela.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Let&apos;s find the leaks in your lead flow.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tell us a little about your business and how you currently handle inbound leads. We&apos;ll get back to you to discuss whether there&apos;s an opportunity to improve it.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm relative">
          {submitSuccess ? (
            <div
              id="contact-form-success-state"
              className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  Thanks — your inquiry has been received.
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  We&apos;ll be in touch shortly to discuss your lead flow and review next steps.
                </p>
                {submissionId && (
                  <p className="text-xs font-mono text-slate-500 pt-2">
                    Reference ID: {submissionId}
                  </p>
                )}
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-800 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form id="contact-inquiry-form" onSubmit={handleSubmit} noValidate className="space-y-6">
              {submitError && (
                <div
                  id="contact-form-error-alert"
                  className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    First Name <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Jane"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white transition-colors ${
                      errors.firstName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-sky-600'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Work Email & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="workEmail" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Work Email <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="jane@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white transition-colors ${
                      errors.workEmail ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-sky-600'
                    }`}
                  />
                  {errors.workEmail && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.workEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Company Name <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Apex Services LLC"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white transition-colors ${
                      errors.companyName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-sky-600'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.companyName}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Phone & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Business Type */}
              <div>
                <label htmlFor="businessType" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  What type of business do you run? <span className="text-sky-600">*</span>
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm focus:outline-none focus:bg-white transition-colors ${
                    errors.businessType ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-sky-600'
                  }`}
                >
                  <option value="" disabled className="text-slate-400">
                    Select your industry...
                  </option>
                  {siteConfig.businessTypes.map((type) => (
                    <option key={type} value={type} className="text-slate-900">
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="text-xs text-rose-600 mt-1.5">{errors.businessType}</p>
                )}
              </div>

              {/* Row 5: Monthly Inbound Volume & Missed Call Handling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="monthlyLeadsVolume" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    Approx. Inbound Calls/Leads Per Month
                  </label>
                  <select
                    id="monthlyLeadsVolume"
                    name="monthlyLeadsVolume"
                    value={formData.monthlyLeadsVolume}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 text-sm focus:outline-none transition-colors"
                  >
                    <option value="" className="text-slate-400">Select monthly volume (optional)</option>
                    {siteConfig.inboundVolumeOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-slate-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="missedCallHandling" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                    What happens when you miss a call?
                  </label>
                  <select
                    id="missedCallHandling"
                    name="missedCallHandling"
                    value={formData.missedCallHandling}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 text-sm focus:outline-none transition-colors"
                  >
                    <option value="" className="text-slate-400">Select current handling (optional)</option>
                    {siteConfig.missedCallHandlingOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-slate-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 6: Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Message / Anything else you&apos;d like us to know
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Tell us about your current lead response process, biggest bottlenecks, or specific goals..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Submit Button & Privacy */}
              <div className="pt-2 space-y-4">
                <button
                  id="contact-form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-all duration-150 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-sky-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Your information is only used to respond to your inquiry.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
