// src/components/FAQ.js
import React, { useState } from "react";
import "./Footer.css";

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className="faq-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        <FAQItem
          question="How accurate is the facial recognition?"
          answer="Our system uses deep learning models with around 75% accuracy under good lighting."
        />
        <FAQItem
          question="What data is collected?"
          answer="We only process the image for prediction and do not store any personal data."
        />
        <FAQItem
          question="Is my data secure?"
          answer="Yes, your image is processed locally and never sent to external servers."
        />
        <FAQItem
          question="Can I use this on any device?"
          answer="Yes! It works on modern browsers with camera access — desktop, laptop, and mobile."
        />
        <FAQItem
          question="How do I improve accuracy?"
          answer="Ensure your face is centered and well-lit. Avoid shadows or motion blur."
        />
      </div>
    </div>
  );
}
