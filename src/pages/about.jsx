import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-8 mb-10">
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          <p className="mt-3 text-gray-600">
            We are dedicated to bringing clean, affordable, and reliable solar
            energy to homes and businesses across India. Our mission is simple:
            reduce electricity bills and increase energy independence.
          </p>
        </div>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden shadow mb-10">
          <img
            src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-72 object-cover"
            alt="Solar installation team"
          />
        </div>

        {/* Our story */}
        <div className="bg-white rounded-xl shadow p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Founded in 2020, our company began with a small team of passionate
            engineers who believed solar energy should be accessible to everyone.
            Today, we have completed over <strong>3,500+ installations</strong>
            and helped thousands of families save on electricity bills.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Quality",
              desc: "We use premium-grade solar panels with long-term warranties."
            },
            {
              title: "Transparency",
              desc: "Clear pricing, honest recommendations, zero hidden costs."
            },
            {
              title: "Support",
              desc: "Dedicated customer support and hassle-free maintenance."
            },
          ].map((v, i) => (
            <div key={i} className="bg-white shadow rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900">{v.title}</h3>
              <p className="mt-2 text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-semibold text-gray-900">Our Team</h2>
          <p className="mt-3 text-gray-600">
            A group of passionate solar professionals — engineers, technicians,
            consultants — all working together to deliver clean energy solutions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1544723452-1c2a01554602?auto=format&fit=crop&w=600&q=80",
            ].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow">
                <img
                  src={img}
                  alt="Team member"
                  className="w-full h-56 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
