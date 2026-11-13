import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RevenueCalculator } from './components/RevenueCalculator';
import { LeadComparison } from './components/LeadComparison';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorks } from './components/HowItWorks';
import { CoreOffer } from './components/CoreOffer';
import { BenefitsSection } from './components/BenefitsSection';
import { DifferentiationSection } from './components/DifferentiationSection';
import { ProcessSection } from './components/ProcessSection';
import { CtaBanner } from './components/CtaBanner';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('revenue-calculator');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleJumpToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      // Focus first input
      setTimeout(() => {
        const input = document.getElementById('firstName');
        if (input) input.focus();
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-900">
      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Live Smartphone Simulator */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onScrollToHowItWorks={handleScrollToHowItWorks}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* Upgrade 1: Interactive Lost Revenue Leak Calculator */}
        <RevenueCalculator onOpenBooking={handleOpenBooking} />

        {/* Upgrade 3: The Brutal Truth Side-by-Side Comparison */}
        <LeadComparison onOpenBooking={handleOpenBooking} />

        {/* Operational Problem Breakdown */}
        <ProblemSection />

        {/* System Workflow */}
        <HowItWorks />

        {/* Core Capabilities */}
        <CoreOffer />

        {/* Direct Benefits & Efficiency */}
        <BenefitsSection onOpenBooking={handleOpenBooking} />

        {/* System Differentiation */}
        <DifferentiationSection />

        {/* 3-Step Setup Process */}
        <ProcessSection onOpenBooking={handleOpenBooking} />

        {/* Strategy Call Banner */}
        <CtaBanner onOpenBooking={handleOpenBooking} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Lead Audit & Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        onJumpToContact={handleJumpToContact}
      />

      {/* Privacy Policy & Terms Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
