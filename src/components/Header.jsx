import { useState } from "react";
import logo from "../assets/qb_logo_image.jpg"
import titleImage from "../assets/qb_logo_words.jpg"

export default function Header({ title }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">

                {/* Logo / Site Name linking to top */}
                <a href="#home" className="logo">
                    <img src={logo} height="40px"></img>
                    <img src={titleImage} height="40px" />
                </a>

                {/* Desktop Navigation */}
                <nav className="nav-links">
                    <a href="#">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>

                {/* Mobile Hamburger Icon */}
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <svg
                        className="hamburger-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="mobile-menu">
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                </div>
            )}
        </header>
    );
}
