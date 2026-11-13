import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TwoEndings } from './components/TwoEndings';
import { RevenueCalculator } from './components/RevenueCalculator';
import { WhatYouGet } from './components/WhatYouGet';
import { ProcessSection } from './components/ProcessSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* The promise, and the product doing its job */}
        <Hero />

        {/* The problem and how the system solves it, told once */}
        <TwoEndings />

        {/* What the problem costs, in the visitor's own numbers */}
        <RevenueCalculator />

        {/* What is included */}
        <WhatYouGet />

        {/* How setup works */}
        <ProcessSection />

        <FaqSection />

        {/* The single conversion point */}
        <ContactSection />
      </main>

      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      <LegalModals type={legalModalType} onClose={() => setLegalModalType(null)} />
    </div>
  );
}
