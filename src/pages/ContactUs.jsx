import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-6">
          Contact Us
        </h1>

        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
          We're here to help you make the switch to clean and affordable solar
          energy. Whether you have questions about installation, pricing, or
          choosing the right solar package, feel free to reach out to us
          anytime.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Phone */}
          <div className="bg-green-50 border p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Call Us
            </h3>
            <p className="text-gray-600 text-sm">+91 9211969965</p>
          </div>

          {/* Email */}
          <div className="bg-green-50 border p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Email</h3>
            <p className="text-gray-600 text-sm">
              deekshagraminsolar@gmail.com
            </p>
          </div>

          {/* Address */}
          <div className="bg-green-50 border p-6 rounded-lg shadow-sm text-center">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Address
            </h3>
            <p className="text-gray-600 text-sm">
              D 284 First floor Near iskcon temple sant nagar East of Kailash
              110065
            </p>
            <p className="text-gray-500 text-xs mt-1">(Demo address)</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Send Us a Message
          </h2>

          <form className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-sm mt-10">
          We aim to respond to all queries within 24 hours.
        </p>
      </div>
    </div>
  );
}
