/**
 * Central configuration for BookedFlowOps website.
 * Update branding, contact information, and booking calendar URLs in one place.
 */

export const siteConfig = {
  name: 'BookedFlowOps',
  legalName: 'BookedFlowOps LLC',
  tagline: 'Turn missed calls & leads into booked jobs.',
  domain: 'bookedflowops.com',
  url: 'https://bookedflowops.com',
  contactEmail: 'hello@faysela.com',
  
  // Replace this placeholder URL with your real Calendly / Cal.com / HubSpot booking link
  bookingUrl: 'BOOKING_URL_PLACEHOLDER',

  navigation: [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'What We Do', href: '#what-we-do' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ],

  stats: {
    responseTimeGoal: '< 10s',
    coverage: '24/7/365',
    focus: 'Zero Lost Inquiries',
  },

  businessTypes: [
    'HVAC & Air Conditioning',
    'Plumbing & Drainage',
    'Roofing & Siding',
    'Electrical Services',
    'General Construction & Contracting',
    'Home Cleaning & Restoration',
    'Landscaping & Tree Care',
    'Legal & Professional Services',
    'Other Appointment/Job-Based Business',
  ],

  inboundVolumeOptions: [
    '1 - 30 leads / month',
    '30 - 75 leads / month',
    '75 - 150 leads / month',
    '150 - 300 leads / month',
    '300+ leads / month',
  ],

  missedCallHandlingOptions: [
    'Goes to voicemail (we call back when someone is free)',
    'We try to text back manually if we remember',
    'Answering service / call center',
    'Nothing currently (calls are lost)',
    'Other / Combination',
  ],
};
