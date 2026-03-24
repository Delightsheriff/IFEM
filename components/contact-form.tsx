"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (e.g., Resend, SendGrid)
    alert("Thank you for your message! We'll be in touch soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white rounded-2xl border border-sage/20 p-8 md:p-10">
      <h2 className="font-serif text-3xl font-bold text-charcoal mb-2">
        Send Us a Message
      </h2>
      <p className="text-gray mb-8">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-sage/30 bg-cream focus:outline-none focus:border-forest focus:bg-white transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-sage/30 bg-cream focus:outline-none focus:border-forest focus:bg-white transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-sage/30 bg-cream focus:outline-none focus:border-forest focus:bg-white transition-colors"
              placeholder="+44 (0)20 1234 5678"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-sage/30 bg-cream focus:outline-none focus:border-forest focus:bg-white transition-colors"
              placeholder="How can we help?"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleFormChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-sage/30 bg-cream focus:outline-none focus:border-forest focus:bg-white transition-colors resize-none"
            placeholder="Tell us about your educational goals..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-forest text-white font-semibold py-3 rounded-lg hover:bg-forest/90 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
        >
          Send Message
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-gray text-center">
          We&apos;ll respond to your inquiry within one business day.
        </p>
      </form>
    </div>
  );
}
