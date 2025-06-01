import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Public } from './Public.jsx'
import AdminPanel from './admin-components/AdminPanel.jsx'
import BookSlotPage from './admin-components/BookSlotPage.jsx'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // animation lasts 1 second
      once: false,     // animate only once when scrolled into view
    });
  }, []);

  return (
    <Router >
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/book-slot" element={<BookSlotPage />} />
      </Routes>
    </Router>
  );
}

export default App
