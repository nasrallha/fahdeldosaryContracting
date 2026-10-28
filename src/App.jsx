import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const ChooseUs = lazy(() => import('./components/ChooseUs'));
const MissionVision = lazy(() => import('./components/MissionVision'));
const Clients = lazy(() => import('./components/Clients'));
const Equipments = lazy(() => import('./components/Equipments'));
const Contact = lazy(() => import('./components/Contact'));

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>loading...</p>
  </div>
);

function App() {
  return (
    <>
      <Navbar />
      <main>
     
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <About />
          <MissionVision />
          <ChooseUs />
          <Equipments />
          <Clients />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;