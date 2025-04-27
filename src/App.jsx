import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionDivider from './components/SectionDivider';

function App() {
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
