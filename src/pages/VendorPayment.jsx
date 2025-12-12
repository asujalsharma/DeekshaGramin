import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useRazorpay from "../hooks/useRazorpay";

export default function VendorPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const vendorData = location.state?.vendorData || {};
  const PAYMENT_AMOUNT = 2376;

  // Use the Razorpay hook
  const { initiatePayment, loading, scriptLoaded } = useRazorpay({
    amount: PAYMENT_AMOUNT,
    description: "Vendor Registration Fee",
    prefill: {
      name: vendorData.name || "",
      email: vendorData.email || "",
      contact: vendorData.mobile || "",
    },
    notes: {
      purpose: "Vendor Registration",
      vendor_email: vendorData.email,
    },
    onSuccess: (response) => {
      alert("Payment successful! Your vendor account is now active.");
      navigate("/app", {
        state: {
          paymentCompleted: true,
          paymentId: response.razorpay_payment_id,
        },
      });
    },
    onFailure: (error) => {
      alert("Payment failed: " + (error.description || "Please try again"));
    },
    onDismiss: () => {
      console.log("Payment cancelled by user");
    },
  });

  const handlePayment = (e) => {
    e.preventDefault();
    initiatePayment();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header Card */}
        <div className="bg-white rounded-t-2xl shadow-xl p-8 border-b-2 border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Vendor Registration</h1>
                <p className="text-sm text-gray-600">Complete your payment to activate</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Registration Fee</p>
              <p className="text-3xl font-bold text-blue-600">₹{PAYMENT_AMOUNT}</p>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-green-800">Registration Successful!</p>
              <p className="text-xs text-green-700 mt-1">
                Your vendor account has been created. Please complete the one-time payment to activate your account.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white shadow-xl p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Payment Details
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Vendor Registration Fee</span>
              <span className="font-semibold text-gray-800">₹{PAYMENT_AMOUNT}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-semibold text-gray-800">Included</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="text-lg font-bold text-gray-800">Total Amount</span>
              <span className="text-2xl font-bold text-blue-600">₹{PAYMENT_AMOUNT}</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">What's Included:</h3>
            <ul className="space-y-2">
              {[
                "Lifetime vendor account access",
                "Verified vendor badge",
                "Priority listing in search results",
                "Customer support & dashboard access",
                "Business analytics and insights"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                  <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Razorpay Payment Button */}
          <form onSubmit={handlePayment}>
            <button
              type="submit"
              disabled={loading || !scriptLoaded}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : !scriptLoaded ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading Payment Gateway...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pay ₹{PAYMENT_AMOUNT} with Razorpay
                </>
              )}
            </button>
            <div className="mt-3 flex items-center justify-center gap-2">
              <img 
                src="https://razorpay.com/assets/razorpay-glyph.svg" 
                alt="Razorpay" 
                className="h-5"
              />
              <span className="text-xs text-gray-600">Powered by Razorpay</span>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSL Encrypted
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              PCI DSS Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
