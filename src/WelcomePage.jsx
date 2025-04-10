// src/WelcomePage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from './assets/logo_transparent.png';

const WelcomePage = () => {
  // Fixed countdown target date: update this to match your launch configuration.
  const targetDateString = "2025-05-01T10:00:00Z"; // Adjust this date/time as needed.

  const [timeLeft, setTimeLeft] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const targetDate = new Date(targetDateString);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateString]);

  // Handler for showing contact modal (if needed)
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Handler to open Calendly popup
  const openCalendlyPopup = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/niranjanantcoandcu' });
    } else {
      console.error("Calendly script is not loaded.");
    }
    return false;
  };

  return (
    <div className="App">
      {/* Main content area */}
      <div className="main-content">
        <div className="hero-container">
          {/* Custom Logo */}
          <img src={logo} alt="Co & Cu Logo" className="hero-logo" />

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Where Custom Meets Care
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Experience a new era of customization and gifting excellence—launching soon in India & UAE.
          </motion.p>

          <p className="hero-text">
            Join our curated vendor ecosystem and become part of a groundbreaking journey.
          </p>

          {/* Countdown Timer */}
          {typeof timeLeft.days !== "undefined" ? (
            <div className="countdown-timer">
              <div className="timer-item">
                <div className="timer-number">{timeLeft.days}</div>
                <div className="timer-label">Days</div>
              </div>
              <div className="timer-item">
                <div className="timer-number">{timeLeft.hours}</div>
                <div className="timer-label">Hours</div>
              </div>
              <div className="timer-item">
                <div className="timer-number">{timeLeft.minutes}</div>
                <div className="timer-label">Minutes</div>
              </div>
              <div className="timer-item">
                <div className="timer-number">{timeLeft.seconds}</div>
                <div className="timer-label">Seconds</div>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '1.5rem' }}>
              Vendor registrations are now open!
            </div>
          )}

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button className="cta-button blue" onClick={openModal}>
              Connect with Us – Your Journey Begins Here
            </button>
            <button className="cta-button green" onClick={openCalendlyPopup}>
              Schedule Your Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup for additional contact options */}
      {modalOpen && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Modal */}
            <button className="close-icon-button" onClick={closeModal}>
              &times;
            </button>

            <h2>Connect with Us</h2>
            <p>
              Reach out through your favorite platform and let’s start building something extraordinary.
            </p>
            <div className="modal-grid">
              <a href="tel:+919446415489">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/483/483947.png"
                  alt="Phone"
                />
                <span>Phone</span>
              </a>
              <a href="https://wa.me/919446415489" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
                  alt="WhatsApp"
                />
                <span>WhatsApp</span>
              </a>
              <a href="https://www.instagram.com/coandcu.official/" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                  alt="Instagram"
                />
                <span>Instagram</span>
              </a>
              <a href="https://www.linkedin.com/company/coandcu" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                />
                <span>LinkedIn</span>
              </a>
              <a href="https://www.youtube.com/channel/UCO4JzUW1ppUIJa9J8xe59hA" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                  alt="YouTube"
                />
                <span>YouTube</span>
              </a>
              <a href="https://botim.com/919446415489" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/565/565547.png"
                  alt="Botim"
                />
                <span>Botim</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Co & Cu. Built with care and innovation.
      </footer>
    </div>
  );
};

export default WelcomePage;