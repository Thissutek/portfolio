"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AtSign,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertTriangle,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { tokens, fonts } from "@/styles/theme";

const Field = ({ id, label, icon: Icon, hint, children }) => (
  <label htmlFor={id} className="block" style={{ fontFamily: fonts.mono }}>
    <span
      className="flex items-center gap-2 text-xs mb-1.5"
      style={{ color: tokens.fgMuted }}
    >
      <Icon size={12} style={{ color: tokens.accent }} />
      <span style={{ color: tokens.codeKeyword }}>const</span>{" "}
      <span style={{ color: tokens.codeFunction }}>{label}</span>{" "}
      <span style={{ color: tokens.codePunct }}>=</span>
    </span>
    {children}
    {hint && (
      <span
        className="block mt-1 text-[10px]"
        style={{ color: tokens.fgDim }}
      >
        {`// ${hint}`}
      </span>
    )}
  </label>
);

const ContactForm = () => {
  const form = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ kind: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ kind: "error", message: "All fields required to submit issue." });
      return;
    }
    setSubmitting(true);
    setStatus({ kind: "idle", message: "" });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setStatus({
          kind: "success",
          message: "Issue submitted. Reply incoming within 48h.",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus({
          kind: "error",
          message: "Submission failed. Try again or email directly.",
        });
      })
      .finally(() => setSubmitting(false));
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(17,17,27,0.85)",
    color: tokens.fg,
    border: `1px solid ${tokens.divider}`,
    borderRadius: 10,
    padding: "0.75rem 1rem",
    fontFamily: fonts.mono,
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <div className="w-full max-w-3xl">
      {/* Header */}
      <div className="mb-8" style={{ fontFamily: fonts.mono }}>
        <div className="text-xs mb-2" style={{ color: tokens.fgDim }}>
          <span style={{ color: tokens.accent }}>$</span> gh issue create --repo
          jonathan-yau/contact
        </div>
        <h1
          className="font-display font-bold leading-tight tracking-tight"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            background: `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentSoft})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Open an Issue
        </h1>
        <p
          className="mt-3 text-sm md:text-base leading-relaxed max-w-xl"
          style={{ color: tokens.fgMuted, fontFamily: fonts.body }}
        >
          Got a project, collab, or just want to say hi? File it below — I&apos;ll
          triage and reply within 48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
        {/* Form panel */}
        <div className="glass-panel-strong rounded-2xl overflow-hidden">
          {/* chrome */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{
              borderColor: "rgba(180,190,254,0.10)",
              background: "rgba(17,17,27,0.6)",
              fontFamily: fonts.mono,
            }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: "#f38ba8" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#f9e2af" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#a6e3a1" }} />
            <span
              className="ml-3 inline-flex items-center gap-2 px-2 py-0.5 rounded-md text-[10px]"
              style={{
                background: "rgba(49,50,68,0.7)",
                color: tokens.fgMuted,
                border: "1px solid rgba(180,190,254,0.08)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-sm"
                style={{ background: tokens.accent }}
              />
              new-issue.md
            </span>
            <span className="ml-auto text-[10px]" style={{ color: tokens.fgDim }}>
              {"// contact form"}
            </span>
          </div>

          <form
            ref={form}
            onSubmit={handleSubmit}
            className="p-6 md:p-8 space-y-5"
          >
            {status.message && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-3 p-4 rounded-lg"
                style={{
                  background:
                    status.kind === "error"
                      ? "rgba(243,139,168,0.10)"
                      : "rgba(166,227,161,0.10)",
                  border: `1px solid ${
                    status.kind === "error" ? tokens.accentDanger : tokens.accentSuccess
                  }55`,
                  color:
                    status.kind === "error"
                      ? tokens.accentDanger
                      : tokens.accentSuccess,
                  fontFamily: fonts.mono,
                  fontSize: "0.85rem",
                }}
              >
                {status.kind === "error" ? (
                  <AlertTriangle size={16} />
                ) : (
                  <CheckCircle2 size={16} />
                )}
                <div>
                  <div>
                    {status.kind === "error" ? "ERROR" : "SUCCESS"}
                  </div>
                  <div style={{ color: tokens.fg }}>{status.message}</div>
                </div>
              </div>
            )}

            <Field id="name" label="from" icon={User} hint="who's reaching out">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="your name"
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = tokens.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${tokens.accent}22`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = tokens.divider;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </Field>

            <Field id="email" label="reply_to" icon={AtSign} hint="where I should reply">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@domain.com"
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = tokens.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${tokens.accent}22`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = tokens.divider;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </Field>

            <Field id="message" label="body" icon={MessageSquare} hint="the actual ask — be as detailed as you'd like">
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="// describe the project, collab, or question…"
                style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = tokens.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${tokens.accent}22`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = tokens.divider;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm w-full md:w-auto"
              style={{
                background: submitting
                  ? "rgba(180,190,254,0.45)"
                  : `linear-gradient(120deg, ${tokens.accent}, ${tokens.accentSoft})`,
                color: tokens.bg,
                fontFamily: fonts.mono,
                cursor: submitting ? "wait" : "pointer",
                boxShadow: `0 16px 40px -12px ${tokens.accent}66`,
              }}
            >
              {submitting ? (
                <>
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{
                      border: `2px solid ${tokens.bg}`,
                      borderRightColor: "transparent",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  submitting…
                </>
              ) : (
                <>
                  <Send size={14} />
                  submit_issue()
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar — direct channels */}
        <aside
          className="glass-panel rounded-2xl p-5 flex flex-col gap-3 h-fit"
          style={{ fontFamily: fonts.mono }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.3em] mb-1"
            style={{ color: tokens.fgDim }}
          >
            {"// direct"}
          </div>

          <a
            href="mailto:jonathan_yau@outlook.com"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{
              background: "rgba(49,50,68,0.6)",
              border: `1px solid ${tokens.divider}`,
              color: tokens.fg,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tokens.accentWarm;
              e.currentTarget.style.color = tokens.accentWarm;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = tokens.divider;
              e.currentTarget.style.color = tokens.fg;
            }}
          >
            <Mail size={14} />
            email
          </a>

          <a
            href="https://github.com/Thissutek"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{
              background: "rgba(49,50,68,0.6)",
              border: `1px solid ${tokens.divider}`,
              color: tokens.fg,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tokens.accentSuccess;
              e.currentTarget.style.color = tokens.accentSuccess;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = tokens.divider;
              e.currentTarget.style.color = tokens.fg;
            }}
          >
            <Github size={14} />
            github
          </a>

          <a
            href="https://www.linkedin.com/in/jonathan-yau-6a649a207/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{
              background: "rgba(49,50,68,0.6)",
              border: `1px solid ${tokens.divider}`,
              color: tokens.fg,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = tokens.accentSoft;
              e.currentTarget.style.color = tokens.accentSoft;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = tokens.divider;
              e.currentTarget.style.color = tokens.fg;
            }}
          >
            <Linkedin size={14} />
            linkedin
          </a>

          <div
            className="mt-2 pt-3 text-[11px] leading-relaxed border-t"
            style={{
              borderColor: tokens.divider,
              color: tokens.fgMuted,
              fontFamily: fonts.body,
            }}
          >
            Based in Toronto · Open to remote, hybrid, and on-site for the right
            project.
          </div>
        </aside>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
