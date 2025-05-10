import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Public } from './Public.jsx'
import AdminPanel from './admin-components/AdminPanel.jsx'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500, // animation lasts 1 second
      once: false,     // animate only once when scrolled into view
    });
  }, []);

  return (
    <Router basename="/beauty-site">
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App
