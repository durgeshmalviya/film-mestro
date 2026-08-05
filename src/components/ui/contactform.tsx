"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Message sent on WhatsApp!");
        setName("");
        setMessage("");
        setOpen(false); // close after sending
      } else {
        console.error(data);
        alert("❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
 <FaWhatsapp size={24} color="green" />
      </button>

      {/* Popup contact form */}
      {open && (
        <div className="fixed bottom-20 right-6 bg-[#111] p-6 rounded-xl shadow-lg w-80 z-50">
          <h2 className="text-lg font-bold mb-4 text-white">Contact Us</h2>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-black text-white border border-gray-600"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-black text-white border border-gray-600"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send on WhatsApp"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
