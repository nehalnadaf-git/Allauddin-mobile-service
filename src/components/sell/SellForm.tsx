"use client";

import React, { useState, useCallback } from "react";
import StepIndicator from "./StepIndicator";
import BrandSelector from "./BrandSelector";
import ConditionSelector from "./ConditionSelector";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SellFormData {
  // Step 1
  brand: string;
  customBrand: string;
  model: string;
  year: string;
  // Step 2
  condition: string;
  issues: string[];
  storage: string;
  hasBox: boolean;
  hasCharger: boolean;
  // Step 3
  name: string;
  phone: string;
  location: string;
  preferredTime: string;
  note: string;
  // Meta
  currentStep: number;
  submitted: boolean;
}

const INITIAL_FORM: SellFormData = {
  brand: "",
  customBrand: "",
  model: "",
  year: "",
  condition: "",
  issues: [],
  storage: "",
  hasBox: false,
  hasCharger: false,
  name: "",
  phone: "",
  location: "",
  preferredTime: "Anytime",
  note: "",
  currentStep: 1,
  submitted: false,
};

const ISSUE_OPTIONS = [
  "Battery drains fast",
  "Camera not working",
  "Speaker issue",
  "Charging port damaged",
  "Back glass broken",
  "Buttons not working",
  "Water damage",
  "Overheating",
  "Face ID broken",
  "No issues — phone is in good condition",
];

const STORAGE_OPTIONS = ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "Not Sure"];

const YEAR_OPTIONS = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "Before 2017", "Not Sure"];

const TIME_OPTIONS = [
  "Morning (9AM–12PM)",
  "Afternoon (12PM–4PM)",
  "Evening (4PM–8PM)",
  "Anytime",
];

// ─── WhatsApp number ──────────────────────────────────────────────────────────
const OWNER_WHATSAPP = "916363278962";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildWhatsAppMessage(form: SellFormData): string {
  const brandDisplay = form.brand === "Other" ? form.customBrand || "Other" : form.brand;
  const issuesDisplay = form.issues.length > 0 ? form.issues.join(", ") : "None mentioned";

  return `Hi Aladdin Mobile Service! 👋

I want to sell my mobile phone. Here are the details:

📱 *Phone Details*
- Brand: ${brandDisplay}
- Model: ${form.model}
- Year of Purchase: ${form.year || "Not specified"}
- Condition: ${form.condition}
- Issues: ${issuesDisplay}
- Storage: ${form.storage || "Not specified"}
- Original Box: ${form.hasBox ? "Yes" : "No"}
- Original Charger: ${form.hasCharger ? "Yes" : "No"}

👤 *My Details*
- Name: ${form.name}
- WhatsApp: ${form.phone}
- Location: ${form.location || "Not specified"}
- Best Time to Contact: ${form.preferredTime}${form.note ? `\n- Note: ${form.note}` : ""}

Please let me know the best price you can offer.
Thank you! 🙏`;
}

// ─── Input component ──────────────────────────────────────────────────────────

function Field({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-dm font-medium" style={{ fontSize: "14px", color: "#374151" }}>
        {label}
      </label>
      {children}
      {helper && !error && (
        <span className="font-dm italic" style={{ fontSize: "13px", color: "#9CA3AF" }}>
          {helper}
        </span>
      )}
      {error && (
        <span
          className="font-dm"
          style={{ fontSize: "13px", color: "#E74C3C", animation: "shake 300ms ease" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontSize: "16px",
  height: "52px",
  borderRadius: "14px",
  border: "1.5px solid rgba(124,58,237,0.2)",
  padding: "0 16px",
  outline: "none",
  color: "#0F0F0F",
  background: "#FFFFFF",
  width: "100%",
  fontFamily: "inherit",
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1.5px solid #E74C3C",
};

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hasError?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={hasError ? inputErrorStyle : inputStyle}
      onFocus={(e) => {
        const el = e.target as HTMLInputElement;
        el.style.borderColor = "#7C3AED";
        el.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
      }}
      onBlur={(e) => {
        const el = e.target as HTMLInputElement;
        el.style.borderColor = hasError ? "#E74C3C" : "rgba(124,58,237,0.2)";
        el.style.boxShadow = "none";
      }}
    />
  );
}

function PillToggle({
  options,
  selected,
  onSelect,
  multi = false,
}: {
  options: string[];
  selected: string | string[];
  onSelect: (val: string) => void;
  multi?: boolean;
}) {
  const isSelected = (opt: string) =>
    multi ? (selected as string[]).includes(opt) : selected === opt;

  return (
    <div className="flex flex-wrap gap-[10px]">
      {options.map((opt) => {
        const active = isSelected(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className="font-dm transition-all duration-150 active:scale-[0.96] cursor-pointer"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "9999px",
              padding: "8px 18px",
              border: `1.5px solid ${active ? "#7C3AED" : "rgba(124,58,237,0.25)"}`,
              background: active ? "#7C3AED" : "#FFFFFF",
              color: active ? "#FFFFFF" : "#374151",
              minHeight: "40px",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── NavButton ────────────────────────────────────────────────────────────────

function NavButtons({
  onNext,
  onBack,
  nextLabel,
  backLabel,
  nextDisabled,
}: {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="font-poppins font-semibold text-white transition-all active:scale-[0.97] w-full"
        style={{
          fontSize: "15px",
          height: "52px",
          borderRadius: "9999px",
          background: nextDisabled
            ? "rgba(124,58,237,0.35)"
            : "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
          boxShadow: nextDisabled ? "none" : "0 6px 20px rgba(124,58,237,0.35)",
          cursor: nextDisabled ? "not-allowed" : "pointer",
          border: "none",
        }}
      >
        {nextLabel ?? "Next →"}
      </button>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="font-poppins font-medium transition-colors duration-150 active:scale-[0.97]"
          style={{ fontSize: "14px", color: "#6B7280", background: "none", border: "none", cursor: "pointer" }}
        >
          {backLabel ?? "← Back"}
        </button>
      )}
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({
  form,
  update,
  onNext,
  errors,
}: {
  form: SellFormData;
  update: (patch: Partial<SellFormData>) => void;
  onNext: () => void;
  errors: Partial<Record<string, string>>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3
          className="font-bricolage font-bold mb-1"
          style={{ fontSize: "clamp(22px, 4vw, 26px)", color: "#0F0F0F" }}
        >
          What is your phone brand?
        </h3>
        <p className="font-dm" style={{ fontSize: "15px", color: "#6B7280" }}>
          Select your brand or type it manually below
        </p>
      </div>

      <BrandSelector
        selectedBrand={form.brand}
        customBrand={form.customBrand}
        onBrandChange={(brand) => update({ brand })}
        onCustomBrandChange={(customBrand) => update({ customBrand })}
        error={errors.brand}
      />

      <Field label="Phone Model" helper="Be as specific as possible — this helps us give you the most accurate assessment" error={errors.model}>
        <TextInput
          value={form.model}
          onChange={(model) => update({ model })}
          placeholder="e.g. Samsung Galaxy S21, iPhone 13..."
          hasError={!!errors.model}
        />
      </Field>

      <Field label="Approx. Year of Purchase">
        <select
          value={form.year}
          onChange={(e) => update({ year: e.target.value })}
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={(e) => {
            const el = e.target as HTMLSelectElement;
            el.style.borderColor = "#7C3AED";
            el.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
          }}
          onBlur={(e) => {
            const el = e.target as HTMLSelectElement;
            el.style.borderColor = "rgba(124,58,237,0.2)";
            el.style.boxShadow = "none";
          }}
        >
          <option value="">Select year...</option>
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </Field>

      <NavButtons
        onNext={onNext}
        nextLabel="Next — Phone Condition →"
        nextDisabled={!form.brand || (form.brand === "Other" && !form.customBrand.trim()) || form.model.trim().length < 2}
      />
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({
  form,
  update,
  onNext,
  onBack,
  errors,
}: {
  form: SellFormData;
  update: (patch: Partial<SellFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Partial<Record<string, string>>;
}) {
  const toggleIssue = (issue: string) => {
    const current = form.issues;
    if (current.includes(issue)) {
      update({ issues: current.filter((i) => i !== issue) });
    } else {
      update({ issues: [...current, issue] });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3
          className="font-bricolage font-bold mb-1"
          style={{ fontSize: "clamp(22px, 4vw, 26px)", color: "#0F0F0F" }}
        >
          What is the condition of your phone?
        </h3>
        <p className="font-dm" style={{ fontSize: "15px", color: "#6B7280" }}>
          Be honest — it helps us give you the best offer
        </p>
      </div>

      <ConditionSelector
        selected={form.condition}
        onChange={(condition) => update({ condition })}
        error={errors.condition}
      />

      <Field label="Any additional issues? (Select all that apply)">
        <PillToggle
          options={ISSUE_OPTIONS}
          selected={form.issues}
          onSelect={toggleIssue}
          multi
        />
      </Field>

      <Field label="Storage Capacity">
        <PillToggle
          options={STORAGE_OPTIONS}
          selected={form.storage}
          onSelect={(storage) => update({ storage })}
        />
      </Field>

      <div className="flex flex-col sm:flex-row gap-4">
        <Field label='Do you have the original box?'>
          <PillToggle
            options={["Yes", "No"]}
            selected={form.hasBox ? "Yes" : "No"}
            onSelect={(v) => update({ hasBox: v === "Yes" })}
          />
        </Field>
        <Field label='Do you have original charger?'>
          <PillToggle
            options={["Yes", "No"]}
            selected={form.hasCharger ? "Yes" : "No"}
            onSelect={(v) => update({ hasCharger: v === "Yes" })}
          />
        </Field>
      </div>

      <NavButtons
        onNext={onNext}
        onBack={onBack}
        nextLabel="Next — Your Details →"
        backLabel="← Back"
        nextDisabled={!form.condition}
      />
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3({
  form,
  update,
  onNext,
  onBack,
  errors,
}: {
  form: SellFormData;
  update: (patch: Partial<SellFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Partial<Record<string, string>>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3
          className="font-bricolage font-bold mb-1"
          style={{ fontSize: "clamp(22px, 4vw, 26px)", color: "#0F0F0F" }}
        >
          Almost done! Your contact details
        </h3>
        <p className="font-dm" style={{ fontSize: "15px", color: "#6B7280" }}>
          We will contact you directly on WhatsApp
        </p>
      </div>

      <Field label="Your Name" error={errors.name}>
        <TextInput
          value={form.name}
          onChange={(name) => update({ name })}
          placeholder="Enter your name"
          hasError={!!errors.name}
        />
      </Field>

      <Field label="Your WhatsApp Number" helper="We will send you a message on this number" error={errors.phone}>
        <TextInput
          value={form.phone}
          onChange={(phone) => update({ phone })}
          placeholder="+91 XXXXX XXXXX"
          type="tel"
          hasError={!!errors.phone}
        />
      </Field>

      <Field label="Your Location in Hubli" helper="This helps us arrange collection if needed">
        <TextInput
          value={form.location}
          onChange={(location) => update({ location })}
          placeholder="Area / Landmark (e.g. Vidyanagar, CBT...)"
        />
      </Field>

      <Field label="Preferred Contact Time">
        <PillToggle
          options={TIME_OPTIONS}
          selected={form.preferredTime}
          onSelect={(preferredTime) => update({ preferredTime })}
        />
      </Field>

      <Field label="Anything else to mention? (Optional)">
        <textarea
          value={form.note}
          onChange={(e) => update({ note: e.target.value })}
          placeholder="Any extra info about your phone, accessories included, urgency, etc."
          style={{
            fontSize: "16px",
            borderRadius: "14px",
            border: "1.5px solid rgba(124,58,237,0.2)",
            padding: "14px 16px",
            outline: "none",
            color: "#0F0F0F",
            background: "#FFFFFF",
            width: "100%",
            fontFamily: "inherit",
            minHeight: "100px",
            resize: "vertical",
          }}
          onFocus={(e) => {
            const el = e.target as HTMLTextAreaElement;
            el.style.borderColor = "#7C3AED";
            el.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
          }}
          onBlur={(e) => {
            const el = e.target as HTMLTextAreaElement;
            el.style.borderColor = "rgba(124,58,237,0.2)";
            el.style.boxShadow = "none";
          }}
        />
      </Field>

      <NavButtons
        onNext={onNext}
        onBack={onBack}
        nextLabel="Review My Details →"
        backLabel="← Back"
        nextDisabled={
          form.name.trim().length < 2 ||
          !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/[\s\-()]/g, ""))
        }
      />
    </div>
  );
}

// ─── Step 4 (Review & Send) ───────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-start justify-between gap-4 py-[10px]"
      style={{ borderBottom: "1px solid rgba(124,58,237,0.08)" }}
    >
      <span
        className="font-dm font-medium flex-shrink-0"
        style={{ fontSize: "13px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.04em" }}
      >
        {label}
      </span>
      <span className="font-dm text-right" style={{ fontSize: "15px", color: "#0F0F0F" }}>
        {value || "—"}
      </span>
    </div>
  );
}

function Step4({
  form,
  onBack,
  onSubmit,
}: {
  form: SellFormData;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const brandDisplay = form.brand === "Other" ? form.customBrand || "Other" : form.brand;
  const issuesDisplay = form.issues.length > 0 ? form.issues.join(", ") : "None mentioned";
  const message = buildWhatsAppMessage(form);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3
          className="font-bricolage font-bold mb-1"
          style={{ fontSize: "clamp(22px, 4vw, 26px)", color: "#0F0F0F" }}
        >
          Review your submission
        </h3>
        <p className="font-dm" style={{ fontSize: "15px", color: "#6B7280" }}>
          Check everything before sending to WhatsApp
        </p>
      </div>

      {/* Summary card */}
      <div
        style={{
          background: "#F5F3FF",
          border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: "20px",
          padding: "28px",
        }}
      >
        <p className="font-poppins font-semibold mb-4" style={{ fontSize: "15px", color: "#7C3AED" }}>
          📱 Phone Details
        </p>
        <SummaryRow label="Brand" value={brandDisplay} />
        <SummaryRow label="Model" value={form.model} />
        <SummaryRow label="Year" value={form.year} />
        <SummaryRow label="Condition" value={form.condition} />
        <SummaryRow label="Issues" value={issuesDisplay} />
        <SummaryRow label="Storage" value={form.storage} />
        <SummaryRow label="Original Box" value={form.hasBox ? "Yes" : "No"} />
        <SummaryRow label="Charger" value={form.hasCharger ? "Yes" : "No"} />

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => form.currentStep !== 1 && onBack()}
            className="font-poppins font-medium"
            style={{ fontSize: "13px", color: "#7C3AED", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Edit Phone Details
          </button>
        </div>

        <div style={{ height: "1px", background: "rgba(124,58,237,0.1)", margin: "16px 0" }} />

        <p className="font-poppins font-semibold mb-4" style={{ fontSize: "15px", color: "#7C3AED" }}>
          👤 Your Details
        </p>
        <SummaryRow label="Your Name" value={form.name} />
        <SummaryRow label="WhatsApp" value={form.phone} />
        <SummaryRow label="Location" value={form.location || "Not specified"} />
        <SummaryRow label="Contact Time" value={form.preferredTime} />
        {form.note && <SummaryRow label="Note" value={form.note} />}

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={onBack}
            className="font-poppins font-medium"
            style={{ fontSize: "13px", color: "#7C3AED", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Edit Contact Details
          </button>
        </div>
      </div>

      {/* Message preview */}
      <div>
        <p className="font-dm font-medium mb-2" style={{ fontSize: "13px", color: "#374151" }}>
          Message that will be sent to Aladdin Mobile Service:
        </p>
        <div
          style={{
            background: "rgba(37,211,102,0.06)",
            border: "1px solid rgba(37,211,102,0.2)",
            borderLeft: "4px solid #25D366",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          <p
            className="font-dm whitespace-pre-wrap"
            style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7 }}
          >
            {message}
          </p>
        </div>
      </div>

      {/* Send button */}
      <button
        type="button"
        onClick={onSubmit}
        className="flex items-center justify-center gap-3 w-full font-poppins font-semibold text-white transition-all active:scale-[0.97]"
        style={{
          fontSize: "17px",
          height: "60px",
          borderRadius: "9999px",
          background: "#25D366",
          boxShadow: "0 6px 20px rgba(37,211,102,0.45)",
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#22C55E";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(37,211,102,0.55)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#25D366";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,211,102,0.45)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* WhatsApp icon */}
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M16 3C8.82 3 3 8.82 3 16c0 2.47.68 4.78 1.86 6.74L3 29l6.5-1.83A12.94 12.94 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.6c-2.16 0-4.18-.6-5.9-1.65l-.42-.25-4.35 1.22 1.24-4.22-.27-.44A10.54 10.54 0 015.4 16c0-5.85 4.76-10.6 10.6-10.6S26.6 10.15 26.6 16 21.85 26.6 16 26.6zm5.82-7.94c-.32-.16-1.9-.94-2.2-1.04-.3-.1-.51-.16-.72.16-.22.32-.84 1.04-1.03 1.26-.19.22-.38.24-.7.08-.32-.16-1.34-.5-2.56-1.6-.94-.84-1.58-1.88-1.76-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.22-.3.32-.51.11-.22.06-.4-.02-.57-.08-.16-.72-1.73-.99-2.38-.26-.62-.53-.54-.72-.55l-.62-.01a1.19 1.19 0 00-.86.4c-.3.32-1.13 1.1-1.13 2.68 0 1.58 1.16 3.1 1.32 3.31.16.22 2.27 3.47 5.5 4.87.77.33 1.37.53 1.84.68.77.24 1.47.2 2.02.12.62-.09 1.9-.78 2.17-1.54.26-.75.26-1.4.18-1.54-.08-.14-.3-.22-.62-.38z" fill="white"/>
        </svg>
        Send to WhatsApp →
      </button>

      <button
        type="button"
        onClick={onBack}
        className="font-poppins font-medium transition-colors"
        style={{ fontSize: "14px", color: "#6B7280", background: "none", border: "none", cursor: "pointer" }}
      >
        ← Edit Answers
      </button>
    </div>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-8 gap-5">
      {/* Checkmark */}
      <div
        className="flex items-center justify-center"
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "9999px",
          background: "#27AE60",
          boxShadow: "0 8px 24px rgba(39,174,96,0.35)",
          animation: "popIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 16l7 7 13-13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3
        className="font-bricolage font-bold"
        style={{ fontSize: "clamp(22px, 4vw, 26px)", color: "#0F0F0F" }}
      >
        Sent to WhatsApp! 🎉
      </h3>
      <p className="font-dm max-w-[400px]" style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7 }}>
        Aladdin Mobile Service has received your details.
        Expect a WhatsApp reply within a few hours.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={onReset}
          className="font-poppins font-semibold transition-all active:scale-[0.97]"
          style={{
            fontSize: "15px",
            height: "48px",
            borderRadius: "9999px",
            border: "2px solid #7C3AED",
            color: "#7C3AED",
            background: "transparent",
            padding: "0 24px",
            cursor: "pointer",
          }}
        >
          Submit Another Phone
        </button>
        <a
          href="/"
          className="font-poppins font-medium flex items-center justify-center"
          style={{ fontSize: "15px", color: "#7C3AED", textDecoration: "none", height: "48px" }}
        >
          Go Back Home
        </a>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Main SellForm ────────────────────────────────────────────────────────────

export default function SellForm() {
  const [form, setForm] = useState<SellFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState<"forward" | "backward">("forward");

  const update = useCallback((patch: Partial<SellFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  const navigate = (nextStep: number, dir: "forward" | "backward") => {
    setTransitionDir(dir);
    setTransitioning(true);
    setTimeout(() => {
      update({ currentStep: nextStep });
      setTransitioning(false);
    }, 250);
  };

  const validateStep1 = () => {
    const errs: Partial<Record<string, string>> = {};
    if (!form.brand) errs.brand = "Please select a brand";
    if (form.brand === "Other" && !form.customBrand.trim()) errs.brand = "Please enter your brand name";
    if (form.model.trim().length < 2) errs.model = "Please enter a valid model name";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Partial<Record<string, string>> = {};
    if (!form.condition) errs.condition = "Please select the phone condition";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Partial<Record<string, string>> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name";
    const cleanPhone = form.phone.replace(/[\s\-()]/g, "").replace(/^\+91/, "");
    if (!/^[6-9][0-9]{9}$/.test(cleanPhone)) errs.phone = "Please enter a valid 10-digit Indian mobile number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSend = () => {
    const message = buildWhatsAppMessage(form);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
    update({ submitted: true });
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const transitionStyle: React.CSSProperties = {
    transition: "opacity 250ms ease, transform 250ms ease",
    opacity: transitioning ? 0 : 1,
    transform: transitioning
      ? transitionDir === "forward"
        ? "translateX(-30px)"
        : "translateX(30px)"
      : "translateX(0)",
  };

  return (
    <div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>

      <StepIndicator currentStep={form.currentStep} />

      <div style={transitionStyle}>
        {form.submitted ? (
          <SuccessState onReset={handleReset} />
        ) : form.currentStep === 1 ? (
          <Step1
            form={form}
            update={update}
            errors={errors}
            onNext={() => {
              if (validateStep1()) navigate(2, "forward");
            }}
          />
        ) : form.currentStep === 2 ? (
          <Step2
            form={form}
            update={update}
            errors={errors}
            onNext={() => {
              if (validateStep2()) navigate(3, "forward");
            }}
            onBack={() => navigate(1, "backward")}
          />
        ) : form.currentStep === 3 ? (
          <Step3
            form={form}
            update={update}
            errors={errors}
            onNext={() => {
              if (validateStep3()) navigate(4, "forward");
            }}
            onBack={() => navigate(2, "backward")}
          />
        ) : (
          <Step4
            form={form}
            onBack={() => navigate(3, "backward")}
            onSubmit={handleSend}
          />
        )}
      </div>
    </div>
  );
}
