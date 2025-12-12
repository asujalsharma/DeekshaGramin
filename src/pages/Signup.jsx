// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // "user" or "vendor"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Document uploads for vendors
  const [aadharDoc, setAadharDoc] = useState(null);
  const [panDoc, setPanDoc] = useState(null);
  const [qualificationDoc, setQualificationDoc] = useState(null);

  // Backend base (from your message)
  const BASE =
    "https://gramin-solar-backend-git-main-techembers-projects.vercel.app";

  // helper: max file size 5MB
  const MAX_FILE_BYTES = 5 * 1024 * 1024;

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // simple client-side validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !mobile.trim() ||
      !address.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation: keep strong requirement (8)
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Mobile number validation (Indian format: 10 digits)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      setError(
        "Please enter a valid 10-digit mobile number starting with 6-9."
      );
      return;
    }

    // For vendors, Aadhar and PAN are required
    if (role === "vendor") {
      if (!aadhar.trim()) {
        setError("Aadhar number is required for vendor registration.");
        return;
      }
      if (!pan.trim()) {
        setError("PAN card is required for vendor registration.");
        return;
      }
      // if (!aadharDoc) {
      //   setError("Please upload Aadhar card document.");
      //   return;
      // }
      // if (!panDoc) {
      //   setError("Please upload PAN card document.");
      //   return;
      // }
      // if (!qualificationDoc) {
      //   setError(
      //     "Please upload qualification document (10th/12th/Graduate/Postgraduate marksheet)."
      //   );
      //   return;
      // }
    }

    // Aadhar validation (if present)
    if (aadhar.trim()) {
      const aadharRegex = /^\d{12}$/;
      if (!aadharRegex.test(aadhar.replace(/\s/g, ""))) {
        setError("Aadhar number must be 12 digits.");
        return;
      }
    }

    // PAN validation (if present)
    if (pan.trim()) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(pan.toUpperCase())) {
        setError(
          "PAN card must be in format: ABCDE1234F (5 letters, 4 digits, 1 letter)."
        );
        return;
      }
    }

    // Check file sizes (vendors)
    // if (role === "vendor") {
    //   const files = [aadharDoc, panDoc, qualificationDoc];
    //   for (const f of files) {
    //     if (f && f.size > MAX_FILE_BYTES) {
    //       setError(`File "${f.name}" exceeds 5MB limit.`);
    //       return;
    //     }
    //   }
    // }

    setLoading(true);

    try {
      if (role === "vendor") {
        const payload = {
          role,
          fullName: name.trim(),
          email: email.trim(),
          password,
          phoneNo: mobile.trim(),
          address: address.trim(),

          aadhaarNo: aadhar.trim(),
          panCard: pan.trim().toUpperCase(),
        };

        const res = await fetch(
          "https://graminsolarbackend.onrender.com/api/venderAuth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Vendor signup failed");
        }

        navigate("/vendor-payment", {
          state: { vendorData: { name, email, mobile } },
        });
      } else {
        // User signup: send JSON
        const payload = {
          role,
          fullname: name.trim(),
          email: email.trim(),
          password,
          phoneNo: mobile.trim(),
          address: address.trim(),
          aadhar: aadhar.trim() || undefined,
          pan: pan.trim().toUpperCase() || undefined,
        };

        const res = await fetch(
          `https://graminsolarbackend.onrender.com/api/userAuth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || data?.error || "Signup failed");
        }

        // success — navigate to app
        navigate("/app");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create an account
        </h2>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4" noValidate>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Register as <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`px-4 py-3 rounded-lg border-2 transition font-medium ${
                  role === "user"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>User</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`px-4 py-3 rounded-lg border-2 transition font-medium ${
                  role === "vendor"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>Vendor</span>
                </div>
              </button>
            </div>
            {role === "vendor" && (
              <p className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                ℹ️ Vendors must provide Aadhar and PAN details for verification
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10-digit mobile number"
              maxLength="10"
              required
              aria-required="true"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter 10-digit mobile number starting with 6-9
            </p>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter your full address"
              rows="3"
              required
              aria-required="true"
            />
            <p className="mt-1 text-xs text-gray-500">
              Include street, city, state, and PIN code
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                placeholder="Create a password"
                required
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-pressed={showPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 px-2 py-1 hover:text-gray-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">Minimum 8 characters.</p>
          </div>

          {/* Document Upload Section - Only for Vendors */}
          {role === "vendor" && (
            <div className="border-t-2 border-gray-200 pt-6 mt-6">
              <div>
                <label
                  htmlFor="aadhar"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="aadhar"
                  name="aadhar"
                  type="text"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12-digit Aadhar number"
                  maxLength="12"
                  required={role === "vendor"}
                  aria-required={role === "vendor"}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {role === "vendor"
                    ? "Required for vendor registration"
                    : "Enter 12-digit Aadhar number (optional)"}
                </p>
              </div>

              <div>
                <label
                  htmlFor="pan"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PAN Card <span className="text-red-500">*</span>
                </label>
                <input
                  id="pan"
                  name="pan"
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength="10"
                  required={role === "vendor"}
                  aria-required={role === "vendor"}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {role === "vendor"
                    ? "Required for vendor registration - Format: ABCDE1234F"
                    : "Format: 5 letters, 4 digits, 1 letter (optional)"}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-bold text-gray-800">
                  Upload Documents <span className="text-red-500">*</span>
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                All documents are required for vendor verification
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Aadhar Document */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aadhar Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="aadharDoc"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setAadharDoc(e.target.files[0])}
                    className="hidden"
                  />
                  <label
                    htmlFor="aadharDoc"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 group"
                    style={{ borderColor: aadharDoc ? "#10b981" : "#d1d5db" }}
                  >
                    {aadharDoc ? (
                      <>
                        <svg
                          className="w-10 h-10 text-green-500 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-green-700 text-center px-2">
                          {aadharDoc.name}
                        </span>
                        <span className="text-xs text-green-600 mt-1">
                          Click to change
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-10 h-10 text-gray-400 mb-2 group-hover:text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                          Upload Aadhar
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* PAN Document */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PAN Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="panDoc"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setPanDoc(e.target.files[0])}
                    className="hidden"
                  />
                  <label
                    htmlFor="panDoc"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 group"
                    style={{ borderColor: panDoc ? "#10b981" : "#d1d5db" }}
                  >
                    {panDoc ? (
                      <>
                        <svg
                          className="w-10 h-10 text-green-500 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-green-700 text-center px-2">
                          {panDoc.name}
                        </span>
                        <span className="text-xs text-green-600 mt-1">
                          Click to change
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-10 h-10 text-gray-400 mb-2 group-hover:text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                          Upload PAN
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Qualification Document */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Qualification Document <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Upload any one: 10th Marksheet, 12th Marksheet, Graduate
                  Degree, or Postgraduate Degree
                </p>
                <input
                  id="qualificationDoc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setQualificationDoc(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="qualificationDoc"
                  className="flex items-center justify-between w-full px-6 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50 group"
                  style={{
                    borderColor: qualificationDoc ? "#10b981" : "#d1d5db",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {qualificationDoc ? (
                      <svg
                        className="w-12 h-12 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-12 h-12 text-gray-400 group-hover:text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    )}
                    <div>
                      {qualificationDoc ? (
                        <>
                          <p className="text-sm font-medium text-green-700">
                            {qualificationDoc.name}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            File uploaded successfully
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                            Click to upload qualification document
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Accepted formats: PDF, JPG, PNG (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
