// src/components/IntroSection.js
import React from "react";
import "./IntroSection.css";

export default function IntroSection() {
  return (
    <div className="intro-section">
      <h2 className="footer-heading">About Our Website</h2>
      <p className="footer-description">
        Our web app uses AI-powered facial recognition to predict age and gender through a simple camera feed. It’s secure, fast, and built using Python and React — no data stored, privacy guaranteed.
      </p>
    </div>
  );
}
