import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { siteConfig } from '../config/site';
import { hasBookingUrl } from '../lib/booking';
import { ContactFormData, ContactApiResponse } from '../types';

const EMPTY_FORM: ContactFormData = {
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
};

const ON_THE_CALL = [
  'Where missed calls and slow replies are costing you jobs',
  'The questions your leads should be asked for your trade',
  'Whether it fits the CRM and calendar you use now',
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.firstName.trim()) next.firstName = 'Enter your first name.';
    if (!formData.companyName.trim()) next.companyName = 'Enter your company name.';
    if (!formData.workEmail.trim()) {
      next.workEmail = 'Enter your email so we can reply.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail.trim())) {
      next.workEmail = 'That email does not look right. Check it and try again.';
    }
    if (!formData.businessType) next.businessType = 'Choose your type of business.';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
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
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data: ContactApiResponse | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data?.success) {
        setSubmitSuccess(true);
        setFormData(EMPTY_FORM);
      } else {
        if (data?.errors) setErrors(data.errors);
        setSubmitError(
          data?.message ||
            `Your request was not sent. Try again, or email ${siteConfig.contactEmail}.`,
        );
      }
    } catch {
      setSubmitError(
        `Your request was not sent because the server could not be reached. Try again, or email ${siteConfig.contactEmail}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="on-dark py-16 sm:py-24 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        {/* Why book */}
        <div className="lg:col-span-5">
          <h2 className="text-5xl sm:text-6xl">How many jobs are you losing every month?</h2>
          <p className="mt-5 text-lg sm:text-xl text-white/75">
            Book a free 20-minute call. We&apos;ll look at how your leads are handled today and where
            they are slipping away.
          </p>

          <ul className="mt-8 space-y-3 text-lg">
            {ON_THE_CALL.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 shrink-0 text-hivis" strokeWidth={3} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-lg text-white/75">
            No pressure. If it&apos;s not a fit for your business, we&apos;ll say so.
          </p>

          {hasBookingUrl && (
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              Pick a time on the calendar
            </a>
          )}
        </div>

        {/* Request form */}
        <div className="lg:col-span-7">
          <div className="rounded-lg bg-white text-ink p-6 sm:p-9">
            {submitSuccess ? (
              <div id="contact-form-success-state" role="status" className="py-6">
                <div className="w-12 h-12 rounded-full bg-booked-tint text-booked flex items-center justify-center">
                  <Check className="w-6 h-6" strokeWidth={3} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-4xl">Request received.</h3>
                <p className="mt-3 text-lg text-body max-w-md">
                  We&apos;ll reach out by email or phone to set a time for your call.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 font-semibold underline cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form id="contact-inquiry-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="text-4xl">
                  {hasBookingUrl ? 'Or have us reach out' : 'Request your free call'}
                </h3>

                {submitError && (
                  <p id="contact-form-error-alert" role="alert" className="rounded-md bg-missed-tint text-missed px-4 py-3 font-medium">
                    {submitError}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="firstName" label="First name" error={errors.firstName}>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.firstName)}
                      className="field"
                    />
                  </Field>

                  <Field id="companyName" label="Company" error={errors.companyName}>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      autoComplete="organization"
                      value={formData.companyName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.companyName)}
                      className="field"
                    />
                  </Field>

                  <Field id="workEmail" label="Email" error={errors.workEmail}>
                    <input
                      type="email"
                      id="workEmail"
                      name="workEmail"
                      autoComplete="email"
                      inputMode="email"
                      value={formData.workEmail}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.workEmail)}
                      className="field"
                    />
                  </Field>

                  <Field id="phone" label="Phone" optional>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="field"
                    />
                  </Field>
                </div>

                <Field id="businessType" label="Type of business" error={errors.businessType}>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.businessType)}
                    className="field"
                  >
                    <option value="">Choose one</option>
                    {siteConfig.businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Useful context, never required. Closed by default to keep the form short. */}
                <details className="group border-y border-line">
                  <summary className="py-3.5 cursor-pointer font-semibold list-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                    <span>Tell us more (optional)</span>
                    <span className="text-2xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="pb-5 space-y-5">
                    <Field id="website" label="Website" optional>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        autoComplete="url"
                        inputMode="url"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="field"
                      />
                    </Field>

                    <Field id="monthlyLeadsVolume" label="Calls and leads per month" optional>
                      <select
                        id="monthlyLeadsVolume"
                        name="monthlyLeadsVolume"
                        value={formData.monthlyLeadsVolume}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="field"
                      >
                        <option value="">Choose one</option>
                        {siteConfig.inboundVolumeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field id="missedCallHandling" label="What happens now when you miss a call?" optional>
                      <select
                        id="missedCallHandling"
                        name="missedCallHandling"
                        value={formData.missedCallHandling}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="field"
                      >
                        <option value="">Choose one</option>
                        {siteConfig.missedCallHandlingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field id="message" label="Anything else we should know?" optional>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="field resize-y"
                      />
                    </Field>
                  </div>
                </details>

                <button
                  id="contact-form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isSubmitting ? 'Sending your request…' : 'Request my free call'}
                </button>

                <p className="text-sm text-body">
                  We only use your details to reply to this request. Prefer email?{' '}
                  <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-ink underline">
                    {siteConfig.contactEmail}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ id, label, optional = false, error, children }) => (
  <div>
    <label htmlFor={id} className="block mb-1.5 text-base font-semibold text-ink">
      {label}
      {optional && <span className="font-normal text-body"> (optional)</span>}
    </label>
    {children}
    {error && (
      <p className="mt-1.5 text-sm font-medium text-missed" role="alert">
        {error}
      </p>
    )}
  </div>
);
