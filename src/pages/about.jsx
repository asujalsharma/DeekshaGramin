import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
          About Deeksha Gramin Solar
        </h1>

        {/* Introduction */}
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          <strong>Deeksha Gramin Solar</strong> is your trusted partner for
          bringing clean, affordable, and reliable solar energy directly to your
          home. Our mission is simple — to make solar installation easy,
          accessible, and hassle-free for every family, especially in rural and
          semi-urban areas.
        </p>

        {/* Section */}
        <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">
          What We Do
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We provide end-to-end solar solutions, from choosing the right solar
          package to installation and maintenance — all through our simple and
          user-friendly website. Whether you are looking for a small home setup
          or a larger energy solution, we deliver everything right to your
          doorstep.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-green-50 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Doorstep Installation
            </h3>
            <p className="text-gray-600 text-sm">
              Our expert engineers visit your location and install solar systems
              quickly and professionally.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Easy Online Process
            </h3>
            <p className="text-gray-600 text-sm">
              Choose your solar plan, request a quote, and book installation —
              all from your phone.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Trusted Service
            </h3>
            <p className="text-gray-600 text-sm">
              We use certified products and provide long-term support for your
              solar system.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <h2 className="text-2xl font-semibold text-green-600 mt-12 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          To empower every household with clean energy by simplifying access to
          solar installations. We believe that renewable energy should not be
          complicated — it should be affordable, accessible, and easy for
          everyone.
        </p>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow"
          >
            Explore Solar Plans
          </a>
        </div>
      </div>
    </div>
  );
}
