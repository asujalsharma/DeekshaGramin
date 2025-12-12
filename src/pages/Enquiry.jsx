// src/pages/PlanDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useRazorpay from "../hooks/useRazorpay";

/**
 * PlanDetails page
 *
 * - Reads plan from location.state?.plan OR fetches by id (mock fetch shown).
 * - Displays: Title, Price, Downpayment, Subsidy, Warranty (3 years on all plans).
 * - Shows computed Final Price (price - subsidy) and Downpayment percentage.
 * - CTA "Enquire about this plan" navigates to /app/1-KVA (Enquiry) and passes plan in location.state.
 *
 * Integration:
 * - If your app has an API, replace `loadPlan` mock with real fetch.
 * - Route example: <Route path="plan/:id" element={<PlanDetails/>} />
 */

export default function PlanDetails() {
  const { id } = useParams(); // optional plan id from route
  const location = useLocation();
  const navigate = useNavigate();

  // plan can be passed via link state to avoid refetching
  const initialPlan = location.state?.plan || null;


  const [plan, setPlan] = useState(initialPlan);
  const [loading, setLoading] = useState(!initialPlan);
  const [error, setError] = useState("");

  // Razorpay hook for payment
  const { initiatePayment, loading: paymentLoading, scriptLoaded } = useRazorpay({
    amount: plan?.downpayment || 0,
    description: `Down Payment for ${plan?.Title || 'Solar Plan'}`,
    prefill: {
      name: "", // Can be filled from user context/auth
      email: "",
      contact: "",
    },
    notes: {
      plan_id: plan?.id || "",
      plan_title: plan?.Title || "",
      payment_type: "downpayment",
    },
    onSuccess: (response) => {
      alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      // You can navigate to a success page or show order confirmation
      navigate("/app", {
        state: {
          orderCompleted: true,
          paymentId: response.razorpay_payment_id,
          plan: plan,
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

  const handleBuyNow = () => {
    if (!plan) {
      alert("Plan information not available");
      return;
    }
    initiatePayment();
  };

  // Mock loader — replace with your API call if needed
  useEffect(() => {
    if (plan || !id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadPlan(planId) {
      setLoading(true);
      try {
        // TODO: Replace with real fetch:
        // const res = await fetch(`/api/plans/${planId}`);
        // const data = await res.json();
        // Example mock data:
        const mock = {
          id: planId,
          title: `${planId.toUpperCase()} Solar Plan`,
          price: 52000, // base price in INR (number)
          downpayment: 12000,
          subsidy: 8000,
          warrantyYears: 3,
          bullets: [
            "Monocrystalline solar panels",
            "5-year performance guarantee",
            "Installation included",
            "Free site survey",
          ],
          banner: "/solar/banner1.jpeg", // optional
        };

        if (!cancelled) setPlan(mock);
      } catch (err) {
        if (!cancelled) setError("Failed to load plan.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPlan(id);
    return () => {
      cancelled = true;
    };
  }, [id, plan]);

  // derived values
  const finalPrice = useMemo(
    () => (plan ? Math.max(0, plan.price - (plan.subsidy || 0)) : 0),
    [plan]
  );

  const downpaymentPercent = useMemo(() => {
    if (!plan || !plan.price) return 0;
    return Math.round((plan.downpayment / plan.price) * 100);
  }, [plan]);

  const handleEnquire = () => {
    // navigate to the enquiry page and pass the plan as state so user doesn't need to re-select
    navigate("/app/1-KVA", { state: { plan } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-gray-600">Loading plan…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-gray-700">No plan found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="bg-white rounded-2xl shadow p-6 md:p-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {plan.banner ? (
              <img
                src={plan.banner}
                alt={plan.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 rounded-lg bg-gradient-to-r from-sky-100 to-indigo-100 mb-4 flex items-center justify-center text-gray-600">
                <span className="text-lg font-medium">Plan image</span>
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-semibold">{plan.title}</h1>
            <p className="mt-2 text-gray-600">
              Warranty:{" "}
              <span className="font-medium">
                {plan.warrantyYears || 3} years
              </span>
            </p>

            <p className="mt-4 text-gray-700">
              {plan.description ||
                "A reliable solar solution for your home or business."}
            </p>

            <ul className="mt-4 space-y-2">
              {(plan.bullets || []).map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-block bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-medium">
                    ✓
                  </span>
                  <span className="text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="md:col-span-1 flex flex-col gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-2xl font-bold">
                    ₹{plan.price.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Subsidy</div>
                  <div className="text-lg font-semibold text-emerald-600">
                    - ₹{(plan.subsidy || 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <hr className="my-3" />

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Final price</div>
                <div className="text-lg font-semibold">
                  ₹{finalPrice.toLocaleString()}
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Downpayment:{" "}
                <span className="font-medium">
                  ₹{plan.downpayment.toLocaleString()}
                </span>{" "}
                <span className="text-gray-400">
                  ({downpaymentPercent}% of price)
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {/* <button
                  onClick={handleEnquire}
                  className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Enquire about this plan
                </button> */}

                <button
                  onClick={handleBuyNow}
                  disabled={paymentLoading || !scriptLoaded}
                  className="w-full border bg-blue-700 border-gray-200 rounded-lg py-2 hover:bg-blue-800 text-white transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {paymentLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : !scriptLoaded ? (
                    "Loading..."
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Buy now
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="text-sm text-gray-500">Warranty</div>
              <div className="mt-1 font-medium text-gray-800">
                {plan.warrantyYears || 3} years
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Standard manufacturer warranty for panels and installation.
                Terms and conditions apply.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="text-sm text-gray-500">Plan details</div>
              <table className="w-full mt-3 text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-600">Price</td>
                    <td className="py-2 font-medium text-right">
                      ₹{plan.price.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Downpayment</td>
                    <td className="py-2 font-medium text-right">
                      ₹{plan.downpayment.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Subsidy</td>
                    <td className="py-2 font-medium text-right">
                      ₹{(plan.subsidy || 0).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Warranty</td>
                    <td className="py-2 font-medium text-right">
                      {plan.warrantyYears || 3} yrs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </aside>
        </div>

        {/* FAQ / Notes */}
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-4 text-gray-700">
              <details className="p-3 rounded-lg border">
                <summary className="cursor-pointer font-medium">
                  What does the subsidy cover?
                </summary>
                <div className="mt-2 text-sm text-gray-600">
                  Subsidy amount shown is an estimate based on current
                  government incentives. Actual subsidy depends on approvals.
                </div>
              </details>

              <details className="p-3 rounded-lg border">
                <summary className="cursor-pointer font-medium">
                  How long for installation?
                </summary>
                <div className="mt-2 text-sm text-gray-600">
                  Typical installation is 1–3 business days after site survey
                  and approvals.
                </div>
              </details>

              <details className="p-3 rounded-lg border">
                <summary className="cursor-pointer font-medium">
                  What does warranty include?
                </summary>
                <div className="mt-2 text-sm text-gray-600">
                  Warranty covers manufacturing defects and workmanship for the
                  period shown. Battery and inverter may have separate
                  warranties.
                </div>
              </details>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold">Need help?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Contact our sales team for a free site survey and tailored
              quotation.
            </p>
            <button
              onClick={handleEnquire}
              className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
            >
              Request site survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
