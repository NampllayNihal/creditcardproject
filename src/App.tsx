import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import MetricsSection from './components/MetricsSection';
import Footer from './components/Footer';
import { FraudDetectionProvider } from './context/FraudDetectionContext';

function App() {
  return (
    <FraudDetectionProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <UploadSection />
        <ResultsSection />
        <MetricsSection />
        <Footer />
      </div>
    </FraudDetectionProvider>
  );
}

export default App;