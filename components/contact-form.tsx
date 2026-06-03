"use client";

import React, { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Please tell us your name.";
  if (!data.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "That email doesn't look right.";
  if (!data.subject.trim()) errors.subject = "Please add a short subject.";
  if (!data.message.trim()) errors.message = "Please share a few details so we can help.";
  else if (data.message.trim().length < 10) errors.message = "Tell us a little more (10+ characters).";
  return errors;
}

export default function ContactForm() {
  const formId = useId();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactFormData;
    const fieldErrors = validate(formData);
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors = validate(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields and try again.");
      const firstInvalid = Object.keys(fieldErrors)[0];
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { errors?: FormErrors };
        if (data.errors) {
          setErrors(data.errors);
          toast.error("Please fix the highlighted fields and try again.");
        } else {
          toast.error("Something went wrong. Please try again or email us directly.");
        }
        return;
      }

      toast.success("Message sent. We'll respond within one business day.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (name: keyof ContactFormData) =>
    cn(
      "w-full px-4 py-3 rounded-sm border bg-cream focus:outline-none focus:bg-white transition-colors focus-ring",
      errors[name]
        ? "border-terracotta focus:border-terracotta"
        : "border-sage/30 focus:border-forest",
    );

  const errorId = (name: keyof ContactFormData) =>
    errors[name] ? `${formId}-${name}-error` : undefined;

  return (
    <div className="bg-white rounded-sm border border-sage/20 p-8 md:p-10">
      <h2 className="font-serif text-3xl font-bold text-charcoal mb-2">
        Send Us a Message
      </h2>
      <p className="text-gray mb-2">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>
      <p className="text-xs text-gray/80 mb-8">
        Required fields are marked with <span className="text-terracotta" aria-hidden="true">*</span>.
      </p>

      <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
        {/* Honeypot — invisible to humans, catches bots */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-name`} className="block text-sm font-semibold text-charcoal mb-2">
              Full Name <span className="text-terracotta" aria-hidden="true">*</span>
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              onBlur={handleBlur}
              required
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errorId("name")}
              className={fieldClass("name")}
              placeholder="Your name"
            />
            {errors.name && (
              <p id={`${formId}-name-error`} className="mt-1.5 text-xs text-terracotta">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${formId}-email`} className="block text-sm font-semibold text-charcoal mb-2">
              Email <span className="text-terracotta" aria-hidden="true">*</span>
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              onBlur={handleBlur}
              required
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errorId("email")}
              className={fieldClass("email")}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p id={`${formId}-email-error`} className="mt-1.5 text-xs text-terracotta">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${formId}-phone`} className="block text-sm font-semibold text-charcoal mb-2">
              Phone <span className="text-gray/60 text-xs font-normal">(optional)</span>
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              autoComplete="tel"
              className={fieldClass("phone")}
              placeholder="+234 (0)80 1234 5678"
            />
          </div>
          <div>
            <label htmlFor={`${formId}-subject`} className="block text-sm font-semibold text-charcoal mb-2">
              Subject <span className="text-terracotta" aria-hidden="true">*</span>
            </label>
            <input
              id={`${formId}-subject`}
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleFormChange}
              onBlur={handleBlur}
              required
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={errorId("subject")}
              className={fieldClass("subject")}
              placeholder="How can we help?"
            />
            {errors.subject && (
              <p id={`${formId}-subject-error`} className="mt-1.5 text-xs text-terracotta">
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className="block text-sm font-semibold text-charcoal mb-2">
            Message <span className="text-terracotta" aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            value={formData.message}
            onChange={handleFormChange}
            onBlur={handleBlur}
            required
            rows={5}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errorId("message")}
            className={cn(fieldClass("message"), "resize-none")}
            placeholder="Tell us about your educational goals..."
          />
          {errors.message && (
            <p id={`${formId}-message-error`} className="mt-1.5 text-xs text-terracotta">
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={submitting}
          loadingText="Sending..."
          className="w-full"
        >
          Send Message
          <ArrowRight aria-hidden="true" />
        </Button>

        <p className="text-xs text-gray text-center">
          We&apos;ll respond to your inquiry within one business day. By submitting, you
          agree to our <a href="/privacy" className="underline underline-offset-4 hover:text-forest focus-ring rounded-sm">privacy policy</a>.
        </p>
      </form>
    </div>
  );
}
