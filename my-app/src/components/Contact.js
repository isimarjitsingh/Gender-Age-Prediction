import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! ✅");
    // You can later connect this to backend or email API
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label>Your Problem / Message</label>
        <textarea
          name="message"
          rows="5"
          placeholder="Tell us what you're facing..."
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
      {/* <img src="/conatct.jpeg"></img> */}
    </div>
  );
}
