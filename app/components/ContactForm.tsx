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
    value: "high-fashion",
    label: "High-Fashion Shoot",
    subProducts: [
      { value: "hf-studio", label: "Studio Package", rate: 50000 },
      { value: "hf-location", label: "Location Package", rate: 65000 },
      { value: "hf-premium", label: "Premium Package", rate: 85000 },
    ],
  },
  {
    value: "campaign",
    label: "Campaign Shoot",
    subProducts: [
      { value: "camp-single", label: "Single Day Campaign", rate: 40000 },
      { value: "camp-multi", label: "Multi-Day Campaign", rate: 75000 },
      { value: "camp-full", label: "Full Campaign Suite", rate: 120000 },
    ],
  },
  {
    value: "editorial",
    label: "Editorial Shoot",
    subProducts: [
      { value: "edit-basic", label: "Basic Editorial", rate: 35000 },
      { value: "edit-pro", label: "Professional Editorial", rate: 55000 },
      { value: "edit-cover", label: "Magazine Cover Shoot", rate: 75000 },
    ],
  },
  {
    value: "catalogues",
    label: "Catalogues Shoot",
    subProducts: [
      { value: "cat-small", label: "Small Catalogue (10-20 items)", rate: 25000 },
      { value: "cat-medium", label: "Medium Catalogue (20-50 items)", rate: 45000 },
      { value: "cat-large", label: "Large Catalogue (50+ items)", rate: 75000 },
    ],
  },
];

const additionalServices = [
  { value: "social-media", label: "Social Media Handling", rate: 15000 },
  { value: "editing", label: "Professional Editing", rate: 10000 },
  { value: "drone", label: "Drone Coverage", rate: 20000 },
  { value: "styling", label: "Styling & Direction", rate: 12000 },
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

// What happened on the last submit, including which messages actually went out
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
/*  If it is defined inside, React creates a new component type on     */
/*  every keystroke, remounts the <input>, and focus is lost.          */
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
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[9px] tracking-[0.2em] uppercase text-[#a68b6a] font-thin"
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
          className={`w-full bg-[#f5f1ed]/40 border transition-all duration-300 py-3.5 px-4 text-[#3d3d3a] placeholder-[#a68b6a]/40 focus:outline-none text-base font-thin tracking-wide rounded-xl ${
            isFocused
              ? "border-[#c9a86c] bg-[#f5f1ed]/70 shadow-lg shadow-[#c9a86c]/10"
              : error
              ? "border-amber-600/50 bg-[#f5f1ed]/50"
              : "border-[#c9a86c]/20 hover:border-[#c9a86c]/40 hover:bg-[#f5f1ed]/55"
          }`}
        />
      </div>
      {error && (
        <p className="text-[10px] text-amber-700 font-light tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ModernPremiumForm() {
  const [formData, setFormData] = useState(initialFormData);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  // Stays visible until the next submit or "Clear Form"
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  // Shared props for the four text inputs
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      // The inquiry only counts as received if the business got its email.
      // Details for the developer go to the console, not to the customer.
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

      // Success
      setSubmitted(true);
      setOutcome({
        ok: true,
        message: `✓ Inquiry sent! Total: ₹${result.total.toLocaleString("en-IN")}`,
        delivery: {
          clientEmail: !!result.sent.clientEmail,
          whatsapp: !!result.sent.whatsapp,
          email: formData.email,
          phone: formData.phone,
        },
      });

      // Reset the fields after 3 seconds (the result message stays visible)
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
      className="relative min-h-screen py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#f5f1ed] via-yellow-50 to-[#f5f1ed] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl opacity-[0.08]"></div>
        <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-[#c9a86c] rounded-full blur-3xl opacity-[0.08]"></div>
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-[#c9a86c]/30 bg-[#c9a86c]/[0.08]">
            <div className="w-2 h-2 rounded-full bg-[#c9a86c] animate-pulse"></div>
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#c9a86c] font-thin">
              Premium Service
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-[#1a1a1a] leading-tight tracking-tight">
            Let&apos;s Create{" "}
            <span className="text-[#c9a86c] font-extralight">Your Vision</span>
          </h1>

          <p className="text-sm text-[#a68b6a] font-thin tracking-wide max-w-2xl mx-auto leading-relaxed">
            Tell us about your project and we&apos;ll craft a tailored solution
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="space-y-8"
          aria-label="Contact form"
        >
          {/* Step 1: Contact Info */}
          <div className="group/section space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center">
                <span className="text-[#f5f1ed] font-thin text-sm">1</span>
              </div>
              <h2 className="text-xs tracking-[0.25em] uppercase text-[#c9a86c] font-thin">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Full Name" required {...inputProps("name")} />
              <FormInput
                label="Email Address"
                type="email"
                required
                {...inputProps("email")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput label="Location" required {...inputProps("address")} />
              <FormInput
                label="Phone Number"
                type="tel"
                required
                {...inputProps("phone")}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a86c]/15 to-transparent"></div>

          {/* Step 2: Service Selection */}
          <div className="group/section space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center">
                <span className="text-[#f5f1ed] font-thin text-sm">2</span>
              </div>
              <h2 className="text-xs tracking-[0.25em] uppercase text-[#c9a86c] font-thin">
                Choose Your Package
              </h2>
            </div>

            {/* Shoot Type Tabs */}
            <div className="space-y-2">
              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#a68b6a] font-thin">
                Service Type <span className="text-[#c9a86c]">•</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                    className={`relative px-3 py-3 rounded-lg text-[11px] font-thin tracking-wide uppercase transition-all duration-300 overflow-hidden group ${
                      formData.shootType === prod.value
                        ? "bg-[#c9a86c] text-[#f5f1ed] shadow-lg shadow-[#c9a86c]/20"
                        : "bg-[#f5f1ed]/60 border border-[#c9a86c]/20 text-[#c9a86c] hover:border-[#c9a86c]/50 hover:bg-[#f5f1ed]/80"
                    }`}
                  >
                    <span className="relative z-10">{prod.label}</span>
                  </button>
                ))}
              </div>
              {errors.shootType && (
                <p className="text-[10px] text-amber-700 font-light">
                  {errors.shootType}
                </p>
              )}
            </div>

            {/* Package Cards */}
            {formData.shootType && (
              <div className="space-y-3 pt-4">
                <label className="block text-[9px] tracking-[0.2em] uppercase text-[#a68b6a] font-thin">
                  Select Package <span className="text-[#c9a86c]">•</span>
                </label>
                <div className="space-y-2">
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
                          setErrors((prev) => ({ ...prev, selectedProduct: "" }));
                      }}
                      className={`relative w-full p-4 rounded-xl border transition-all duration-300 text-left group ${
                        formData.selectedProduct === subProd.value
                          ? "bg-[#c9a86c]/15 border-[#c9a86c] shadow-lg shadow-[#c9a86c]/15"
                          : "bg-[#f5f1ed]/60 border-[#c9a86c]/20 hover:border-[#c9a86c]/50 hover:bg-[#f5f1ed]/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                              formData.selectedProduct === subProd.value
                                ? "border-[#c9a86c] bg-[#c9a86c]/20"
                                : "border-[#c9a86c]/40 group-hover:border-[#c9a86c]/70"
                            }`}
                          >
                            {formData.selectedProduct === subProd.value && (
                              <div className="w-2 h-2 rounded-full bg-[#c9a86c]"></div>
                            )}
                          </div>
                          <span className="text-sm text-[#3d3d3a] font-thin tracking-wide">
                            {subProd.label}
                          </span>
                        </div>
                        <span className="text-sm text-[#c9a86c] font-thin tracking-wide ml-4">
                          ₹{subProd.rate.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.selectedProduct && (
                  <p className="text-[10px] text-amber-700 font-light">
                    {errors.selectedProduct}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Step 3: Add-ons */}
          <div className="group/section space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center">
                <span className="text-[#f5f1ed] font-thin text-sm">3</span>
              </div>
              <h2 className="text-xs tracking-[0.25em] uppercase text-[#c9a86c] font-thin">
                Add-on Services
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalServices.map((service) => (
                <button
                  key={service.value}
                  type="button"
                  onClick={() => handleServiceChange(service.value)}
                  className={`relative p-4 rounded-xl border transition-all duration-300 text-left group ${
                    formData.services.includes(service.value)
                      ? "bg-[#c9a86c]/15 border-[#c9a86c] shadow-lg shadow-[#c9a86c]/15"
                      : "bg-[#f5f1ed]/60 border-[#c9a86c]/20 hover:border-[#c9a86c]/50 hover:bg-[#f5f1ed]/80"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                          formData.services.includes(service.value)
                            ? "border-[#c9a86c] bg-[#c9a86c]/20"
                            : "border-[#c9a86c]/40 group-hover:border-[#c9a86c]/70"
                        }`}
                      >
                        {formData.services.includes(service.value) && (
                          <svg
                            className="w-2.5 h-2.5 text-[#c9a86c]"
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
                      <p className="text-sm text-[#3d3d3a] font-thin tracking-wide">
                        {service.label}
                      </p>
                      <p className="text-[10px] text-[#c9a86c] font-thin">
                        ₹{service.rate.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Preferences */}
          <div className="group/section space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a86c] to-[#b8975a] flex items-center justify-center">
                <span className="text-[#f5f1ed] font-thin text-sm">4</span>
              </div>
              <h2 className="text-xs tracking-[0.25em] uppercase text-[#c9a86c] font-thin">
                Final Details
              </h2>
            </div>

            <div className="space-y-3">
              <label className="block text-[9px] tracking-[0.2em] uppercase text-[#a68b6a] font-thin">
                Frequency <span className="text-[#c9a86c]">•</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "single-shoot", label: "Single Shoot" },
                  { value: "monthly-shoot", label: "Monthly Shoot" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, lookingFor: opt.value }));
                      if (errors.lookingFor)
                        setErrors((prev) => ({ ...prev, lookingFor: "" }));
                    }}
                    className={`relative px-4 py-3 rounded-lg border transition-all duration-300 text-left group ${
                      formData.lookingFor === opt.value
                        ? "bg-[#c9a86c] text-[#f5f1ed] shadow-lg shadow-[#c9a86c]/20"
                        : "bg-[#f5f1ed]/60 border-[#c9a86c]/20 text-[#3d3d3a] hover:border-[#c9a86c]/50 hover:bg-[#f5f1ed]/80"
                    }`}
                  >
                    <span className="text-[11px] font-thin tracking-wide uppercase">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
              {errors.lookingFor && (
                <p className="text-[10px] text-amber-700 font-light">
                  {errors.lookingFor}
                </p>
              )}
            </div>
          </div>

          {/* Price Summary */}
          <div className="p-4 rounded-xl bg-[#c9a86c]/10 border border-[#c9a86c]/30">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#a68b6a] font-thin tracking-wide">
                Estimated Total
              </span>
              <span className="text-xl text-[#c9a86c] font-thin">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-8 space-y-4">
            <button
              type="submit"
              disabled={submitted || loading}
              className={`relative w-full px-8 py-4 text-[11px] tracking-[0.25em] uppercase font-thin rounded-xl transition-all duration-300 overflow-hidden group ${
                submitted
                  ? "bg-green-600/80 text-[#f5f1ed]"
                  : loading
                  ? "bg-[#c9a86c]/50 text-[#f5f1ed]"
                  : "bg-[#c9a86c] text-[#f5f1ed] hover:shadow-xl hover:shadow-[#c9a86c]/20 active:scale-[0.98]"
              }`}
            >
              <span className="relative z-10">
                {loading
                  ? "Sending..."
                  : submitted
                  ? "✓ Message Sent"
                  : "Submit Inquiry"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="w-full px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-thin text-[#c9a86c] border border-[#c9a86c]/30 rounded-xl hover:border-[#c9a86c]/60 hover:bg-[#c9a86c]/[0.08] transition-all duration-300"
            >
              Clear Form
            </button>
          </div>

          {outcome && (
            <div role="status" className="space-y-2 text-center">
              <p
                className={`text-xs font-light tracking-wider ${
                  outcome.ok ? "text-green-700" : "text-amber-700"
                }`}
              >
                {outcome.message}
              </p>

              {outcome.delivery && (
                <ul className="space-y-1 text-[11px] font-light tracking-wide">
                  <li
                    className={
                      outcome.delivery.clientEmail
                        ? "text-green-700"
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
                        ? "text-green-700"
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