"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { colors, styles, applyTheme } from "@/styles/theme";

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: "Please fill in all fields",
      });
      return;
    }

    setIsSubmitting(true);

    // Get credentials from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Send the email using EmailJS
    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setFormStatus({
          submitted: true,
          error: false,
          message: "Thank you for your message! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Failed to send email:", error.text);
        setFormStatus({
          submitted: false,
          error: true,
          message: "Failed to send message. Please try again later.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6" style={{ color: colors.text }}>
        Contact Me
      </h1>
      <p className="mb-6" style={{ color: colors.subtext }}>
        Feel free to reach out if you&apos;d like to work together!
      </p>

      {/* Status message */}
      {formStatus.message && (
        <div
          className="mb-6 p-4 rounded"
          style={{
            backgroundColor: formStatus.error
              ? colors.red + "20"
              : colors.green + "20",
            color: formStatus.error ? colors.red : colors.green,
          }}
        >
          {formStatus.message}
        </div>
      )}

      <form ref={form} onSubmit={handleSubmit} className={styles.contactForm}>
        <div>
          <label className="block mb-1" style={{ color: colors.lavender }}>
            Name
          </label>
          <input
            className={styles.input}
            style={applyTheme("input")}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1" style={{ color: colors.lavender }}>
            Email
          </label>
          <input
            className={styles.input}
            style={applyTheme("input")}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1" style={{ color: colors.lavender }}>
            Message
          </label>
          <textarea
            className={styles.input}
            style={applyTheme("input")}
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          className={styles.button}
          style={applyTheme("button")}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
