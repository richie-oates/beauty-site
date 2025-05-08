import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionDivider from './components/SectionDivider';
import AvailabilitySection from './components/Availability';

export function Public() {
    return (
        <>
            <Header />
            <main>
                <HomeSection />
                <SectionDivider />
                <AboutSection />
                <SectionDivider />
                <ServicesSection />
                <SectionDivider />
                <AvailabilitySection />
                <SectionDivider />
                <ContactSection />
            </main>
            <Footer />
        </>
    )
}