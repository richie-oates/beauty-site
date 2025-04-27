import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { useEffect } from 'react';

import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionDivider from './components/SectionDivider';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // animation lasts 1 second
      once: false,     // animate only once when scrolled into view
    });
  }, []);

  return (
    <Router>
      <Header title="Queen Bee Beauty Official" />
      <main>
        <HomeSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ServicesSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </Router>
  );
}

export default App
