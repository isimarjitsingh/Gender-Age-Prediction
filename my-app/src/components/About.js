import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About This Website</h1>

      <section>
        <h2>What Is This Website?</h2>
        <p>
          This website is an AI-powered facial recognition platform that can
          predict your <strong>age</strong> and <strong>gender</strong> simply by
          accessing your camera. No need to upload anything — just look at the
          screen and let our model do the rest.
        </p>
      </section>

      <section>
        <h2>Why Is It Needed?</h2>
        <p>
          Age and gender detection has real-world use cases in areas like
          audience analysis, smart advertising, retail analytics, and
          personalized user experiences. Our platform demonstrates how such
          technology can be used safely and responsibly.
        </p>
        <p>
          With privacy at the core, no personal data is stored or shared. Everything
          runs right in your browser with minimal backend involvement.
        </p>
      </section>

      <section>
        <h2>Does It Really Work?</h2>
        <p>
          Yes — the backend uses pre-trained deep learning models built with
          OpenCV and Caffe that are proven in computer vision research. These
          models have shown high accuracy when faces are clearly visible and
          properly lit.
        </p>
        <p>
          You can test it live on this site. Just allow camera access, look at the screen, and click "Predict."
        </p>
      </section>
    </div>
  );
}
