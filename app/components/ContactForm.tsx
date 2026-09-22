"use client";

import { useState } from "react";

interface SubProduct {
  value: string;
  label: string;
  rate: number;
}

interface Product {
  value: string;
  label: string;
  subProducts: SubProduct[];
}

const products: Product[] = [
  {
    value: "catalogues",
    label: "Catalogues Shoot",
    subProducts: [
      { value: "cat-starting", label: "Starting from", rate: 10000 },
    ],
  },
  {
    value: "editorial",
    label: "Editorial Shoot",
    subProducts: [
      { value: "edit-starting", label: "Starting from", rate: 4500 },
    ],
  },
  {
    value: "campaign",
    label: "Campaign Shoot",
    subProducts: [
      { value: "camp-starting", label: "Starting from", rate: 4500 },
    ],
  },
  {
    value: "high-fashion",
    label: "High-Fashion Shoot",
    subProducts: [
      { value: "hf-starting", label: "Starting from", rate: 25000 },
    ],
  },
  {
    value: "monthly",
    label: "Monthly Package",
    subProducts: [
      {
        value: "monthly-starting",
        label:
          "Starting from — Includes: 5 Dress Catalogues + 1 Campaign + 1 Editorial + Social Media Handling",
        rate: 25000,
      },
    ],
  },
];

const additionalServices = [
  { value: "social-media", label: "Social Media Handling", rate: 15000 },
  { value: "model", label: "Model", rate: 3000 },
  { value: "makeup", label: "Makeup", rate: 3000 },
];

const initialFormData = {
  name: "",
  email: "",
  address: "",
  phone: "",
  shootType: "",
  selectedProduct: "",
  lookingFor: "",
  budget: "",
  services: [] as string[],
};

type TextFieldId = "name" | "email" | "address" | "phone";

interface SubmitOutcome {
  ok: boolean;
  message: string;
  delivery?: {
    clientEmail: boolean;
    whatsapp: boolean;
    email: string;
    phone: string;
  };
}

/* ------------------------------------------------------------------ */
/*  FormInput lives OUTSIDE the main component.                        */
/* ------------------------------------------------------------------ */
interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  type?: string;
  required?: boolean;
  error?: string;
}

function FormInput({
  id,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused,
  type = "text",
  required = false,
  error,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-[11px] tracking-[0.18em] uppercase text-[#5c4a3a] font-medium"
      >
        {label} {required && <span className="text-[#c9a86c]">•</span>}
      </label>
      <div className="relative group">
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Your answer"
          aria-invalid={!!error}
          className={`w-full bg-white/90 border transition-all duration-300 py-3.5 px-4 text-[#1f1f1c] placeholder:text-[#8a7a68]/70 focus:outline-none text-[15px] font-light tracking-wide rounded-xl shadow-sm ${
            isFocused
              ? "border-[#c9a86c] bg-white shadow-md shadow-[#c9a86c]/15 ring-1 ring-[#c9a86c]/30"
              : error
              ? "border-amber-600/60 bg-white"
              : "border-[#d4c4b0] hover:border-[#c9a86c]/70 hover:bg-white"
          }`}
        />
      </div>
      {error && (
        <p className="text-[11px] text-amber-700 font-medium tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
}

// Helper to format price as K
const formatPrice = (rate: number) => {
  if (rate >= 1000) {
    const kValue = rate / 1000;
    return kValue % 1 === 0 ? `${kValue}K` : `${kValue}K`;
  }
  return rate.toString();
};

export default function ModernPremiumForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleServiceChange = (serviceValue: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceValue)
        ? prev.services.filter((s) => s !== serviceValue)
        : [...prev.services, serviceValue];
      return { ...prev, services };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid";
    }
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.shootType) newErrors.shootType = "Required";
    if (!formData.selectedProduct) newErrors.selectedProduct = "Required";
    if (!formData.lookingFor) newErrors.lookingFor = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputProps = (id: TextFieldId) => ({
    id,
    value: formData[id],
    onChange: handleFormChange,
    onFocus: () => setFocusedField(id),
    onBlur: () => setFocusedField(null),
    isFocused: focusedField === id,
    error: errors[id],
  });

  const calculateTotal = () => {
    let total = 0;
    const selectedSubProduct = products
      .find((p) => p.value === formData.shootType)
      ?.subProducts.find((sp) => sp.value === formData.selectedProduct);

    if (selectedSubProduct) {
      total += selectedSubProduct.rate;
    }

    formData.services.forEach((service) => {
      const svc = additionalServices.find((s) => s.value === service);
      if (svc) total += svc.rate;
    });

    return total;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setOutcome(null);

    try {
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      if (!result.sent?.businessEmail) {
        console.error("Inquiry was not delivered:", result.errors);
        throw new Error(
          "We couldn't deliver your inquiry. Please try again or contact us directly."
        );
      }

      if (result.errors?.clientEmail) {
        console.warn("Confirmation email not sent:", result.errors.clientEmail);
      }
      if (result.errors?.whatsapp) {
        console.warn("WhatsApp not sent:", result.errors.whatsapp);
      }

      setSubmitted(true);
      setOutcome({
        ok: true,
        message: `✓ Inquiry sent! Total: ₹${formatPrice(result.total)}`,
        delivery: {
          clientEmail: !!result.sent.clientEmail,
          whatsapp: !!result.sent.whatsapp,
          email: formData.email,
          phone: formData.phone,
        },
      });

      setTimeout(() => {
        setFormData(initialFormData);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setOutcome({ ok: false, message: `✗ Error: ${errorMessage}` });
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
    setOutcome(null);
  };

  const currentSubProducts =
    products.find((p) => p.value === formData.shootType)?.subProducts || [];
  const total = calculateTotal();

  return (
    <section
      id="contact"
      className="relative min-h-screen py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#f8f4ef] via-[#f5f0e8] to-[#f8f4ef] overflow-hidden"
    >
      {/* Soft gold ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 -right-64 w-[28rem] h-[28rem] bg-[#c9a86c] rounded-full blur-3xl opacity-[0.07]" />
        <div className="absolute bottom-1/3 -left-64 w-[28rem] h-[28rem] bg-[#c9a86c] rounded-full blur-3xl opacity-[0.07]" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-14 md:mb-20 space-y-5">
          <div className="inline-flex items-center justify-center gap-2.5 px-5 py-2 rounded-full border border-[#c9a86c]/40 bg-[#c9a86c]/10 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#c9a86c] animate-pulse" />
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8a6d4a] font-medium">
              Premium Service
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1814] leading-tight tracking-tight">
            Let&apos;s Create{" "}
            <span className="text-[#b8955a] font-extralight">Your Vision</span>
          </h1>

          <p className="text-[15px] text-[#6b5a48] font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Tell us about your project and we&apos;ll craft a tailored solution
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="space-y-10"
          aria-label="Contact form"
        >
          {/* ── Step 1: Contact Info ── */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center shadow-md shadow-[#c9a86c]/25">
                <span className="text-white font-medium text-sm">1</span>
              </div>
              <h2 className="text-[13px] tracking-[0.22em] uppercase text-[#8a6d4a] font-medium">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput label="Full Name" required {...inputProps("name")} />
              <FormInput
                label="Email Address"
                type="email"
                required
                {...inputProps("email")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput label="Location" required {...inputProps("address")} />
              <FormInput
                label="Phone Number"
                type="tel"
                required
                {...inputProps("phone")}
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a86c]/25 to-transparent" />

          {/* ── Step 2: Frequency (moved up) ── */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center shadow-md shadow-[#c9a86c]/25">
                <span className="text-white font-medium text-sm">2</span>
              </div>
              <h2 className="text-[13px] tracking-[0.22em] uppercase text-[#8a6d4a] font-medium">
                Frequency
              </h2>
            </div>

            <div className="space-y-2.5">
              <label className="block text-[11px] tracking-[0.18em] uppercase text-[#5c4a3a] font-medium">
                Choose Frequency <span className="text-[#c9a86c]">•</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { value: "single-shoot", label: "Single Shoot" },
                  { value: "monthly-shoot", label: "Monthly Shoot" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        lookingFor: opt.value,
                      }));
                      if (errors.lookingFor)
                        setErrors((prev) => ({ ...prev, lookingFor: "" }));
                    }}
                    className={`relative px-4 py-3.5 rounded-xl border transition-all duration-300 text-left ${
                      formData.lookingFor === opt.value
                        ? "bg-[#c9a86c] text-white shadow-lg shadow-[#c9a86c]/30"
                        : "bg-white/80 border-[#d4c4b0] text-[#5c4a3a] hover:border-[#c9a86c] hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <span className="text-[13px] font-medium tracking-wide uppercase">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
              {errors.lookingFor && (
                <p className="text-[11px] text-amber-700 font-medium">
                  {errors.lookingFor}
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a86c]/25 to-transparent" />

          {/* ── Step 3: Package ── */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center shadow-md shadow-[#c9a86c]/25">
                <span className="text-white font-medium text-sm">3</span>
              </div>
              <h2 className="text-[13px] tracking-[0.22em] uppercase text-[#8a6d4a] font-medium">
                Choose Your Package
              </h2>
            </div>

            <div className="space-y-2.5">
              <label className="block text-[11px] tracking-[0.18em] uppercase text-[#5c4a3a] font-medium">
                Service Type <span className="text-[#c9a86c]">•</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {products.map((prod) => (
                  <button
                    key={prod.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        shootType: prod.value,
                        selectedProduct: "",
                      }));
                      if (errors.shootType)
                        setErrors((prev) => ({ ...prev, shootType: "" }));
                    }}
                    className={`relative px-3 py-3.5 rounded-xl text-[12px] font-medium tracking-wide uppercase transition-all duration-300 ${
                      formData.shootType === prod.value
                        ? "bg-[#c9a86c] text-white shadow-lg shadow-[#c9a86c]/30"
                        : "bg-white/80 border border-[#d4c4b0] text-[#5c4a3a] hover:border-[#c9a86c] hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    {prod.label}
                  </button>
                ))}
              </div>
              {errors.shootType && (
                <p className="text-[11px] text-amber-700 font-medium">
                  {errors.shootType}
                </p>
              )}
            </div>

            {formData.shootType && (
              <div className="space-y-3 pt-3">
                <label className="block text-[11px] tracking-[0.18em] uppercase text-[#5c4a3a] font-medium">
                  Select Package <span className="text-[#c9a86c]">•</span>
                </label>
                <div className="space-y-2.5">
                  {currentSubProducts.map((subProd) => (
                    <button
                      key={subProd.value}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          selectedProduct: subProd.value,
                        }));
                        if (errors.selectedProduct)
                          setErrors((prev) => ({
                            ...prev,
                            selectedProduct: "",
                          }));
                      }}
                      className={`relative w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                        formData.selectedProduct === subProd.value
                          ? "bg-[#c9a86c]/12 border-[#c9a86c] shadow-md shadow-[#c9a86c]/15"
                          : "bg-white/80 border-[#d4c4b0] hover:border-[#c9a86c]/80 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <div
                            className={`w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                              formData.selectedProduct === subProd.value
                                ? "border-[#c9a86c] bg-[#c9a86c]"
                                : "border-[#c9a86c]/50"
                            }`}
                          >
                            {formData.selectedProduct === subProd.value && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-[15px] text-[#1f1f1c] font-light tracking-wide leading-snug">
                            {subProd.label}
                          </span>
                        </div>
                        <span className="text-[15px] text-[#b8955a] font-medium tracking-wide whitespace-nowrap">
                          ₹{formatPrice(subProd.rate)}*
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.selectedProduct && (
                  <p className="text-[11px] text-amber-700 font-medium">
                    {errors.selectedProduct}
                  </p>
                )}
                <p className="text-[11px] text-[#8a6d4a] mt-1 tracking-wide">
                  * Starting prices. Final quote may vary based on requirements.
                </p>
              </div>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a86c]/25 to-transparent" />

          {/* ── Step 4: Add-ons ── */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center shadow-md shadow-[#c9a86c]/25">
                <span className="text-white font-medium text-sm">4</span>
              </div>
              <h2 className="text-[13px] tracking-[0.22em] uppercase text-[#8a6d4a] font-medium">
                Add-on Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalServices.map((service) => (
                <button
                  key={service.value}
                  type="button"
                  onClick={() => handleServiceChange(service.value)}
                  className={`relative p-4 rounded-xl border transition-all duration-300 text-left ${
                    formData.services.includes(service.value)
                      ? "bg-[#c9a86c]/12 border-[#c9a86c] shadow-md shadow-[#c9a86c]/15"
                      : "bg-white/80 border-[#d4c4b0] hover:border-[#c9a86c]/80 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="pt-0.5">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.services.includes(service.value)
                            ? "border-[#c9a86c] bg-[#c9a86c]"
                            : "border-[#c9a86c]/50"
                        }`}
                      >
                        {formData.services.includes(service.value) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] text-[#1f1f1c] font-light tracking-wide">
                        {service.label}
                      </p>
                      <p className="text-[13px] text-[#b8955a] font-medium mt-0.5">
                        ₹{formatPrice(service.rate)}*
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#8a6d4a] tracking-wide">
              * Starting prices. Final quote may vary based on requirements.
            </p>
          </div>

          {/* Price Summary */}
          <div className="p-5 rounded-2xl bg-white/90 border border-[#c9a86c]/30 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[15px] text-[#5c4a3a] font-medium tracking-wide">
                Estimated Total
              </span>
              <span className="text-2xl text-[#b8955a] font-light tracking-tight">
                ₹{formatPrice(total)}*
              </span>
            </div>
            <p className="text-[11px] text-[#8a6d4a] mt-2 tracking-wide">
              * Starting prices. Final quote may vary based on requirements.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={submitted || loading}
              className={`relative w-full px-8 py-4 text-[13px] tracking-[0.22em] uppercase font-medium rounded-xl transition-all duration-300 ${
                submitted
                  ? "bg-emerald-600 text-white"
                  : loading
                  ? "bg-[#c9a86c]/60 text-white cursor-wait"
                  : "bg-[#c9a86c] text-white hover:bg-[#b8955a] hover:shadow-xl hover:shadow-[#c9a86c]/25 active:scale-[0.99]"
              }`}
            >
              {loading
                ? "Sending..."
                : submitted
                ? "✓ Message Sent"
                : "Submit Inquiry"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="w-full px-8 py-3.5 text-[12px] tracking-[0.18em] uppercase font-medium text-[#8a6d4a] border border-[#d4c4b0] rounded-xl hover:border-[#c9a86c] hover:bg-white/60 transition-all duration-300"
            >
              Clear Form
            </button>
          </div>

          {outcome && (
            <div role="status" className="space-y-2 text-center pt-2">
              <p
                className={`text-sm font-medium tracking-wide ${
                  outcome.ok ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {outcome.message}
              </p>

              {outcome.delivery && (
                <ul className="space-y-1.5 text-[13px] font-light tracking-wide">
                  <li
                    className={
                      outcome.delivery.clientEmail
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }
                  >
                    {outcome.delivery.clientEmail
                      ? `✓ Confirmation email sent to ${outcome.delivery.email}`
                      : "! We couldn't send the confirmation email, but we have your inquiry."}
                  </li>
                  <li
                    className={
                      outcome.delivery.whatsapp
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }
                  >
                    {outcome.delivery.whatsapp
                      ? `✓ WhatsApp summary sent to ${outcome.delivery.phone}`
                      : "! We couldn't send the WhatsApp message, but we have your inquiry."}
                  </li>
                </ul>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
