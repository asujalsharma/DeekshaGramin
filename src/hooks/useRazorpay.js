import { useState, useEffect } from "react";

/**
 * Reusable Razorpay payment hook
 * 
 * @param {Object} options
 * @param {number} options.amount - Amount in rupees (will be converted to paise)
 * @param {string} options.description - Payment description
 * @param {Object} options.prefill - Customer details { name, email, contact }
 * @param {Object} options.notes - Additional notes/metadata
 * @param {Function} options.onSuccess - Callback on successful payment
 * @param {Function} options.onFailure - Callback on payment failure
 * @param {Function} options.onDismiss - Callback when payment modal is dismissed
 * 
 * @returns {Object} { initiatePayment, loading, scriptLoaded }
 */
export default function useRazorpay({
  amount,
  description = "Payment",
  prefill = {},
  notes = {},
  onSuccess,
  onFailure,
  onDismiss,
}) {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Razorpay script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      setScriptLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      try {
        document.body.removeChild(script);
      } catch (e) {
        // Script might already be removed
      }
    };
  }, []);

  const initiatePayment = async () => {
    if (!scriptLoaded) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    setLoading(true);

    try {
      // In production, you would call your backend to create an order
      // const response = await fetch('/api/create-razorpay-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: amount * 100 })
      // });
      // const order = await response.json();

      const options = {
        key: "rzp_test_YOUR_KEY_ID", // Replace with your Razorpay Key ID
        amount: amount * 100, // Convert rupees to paise
        currency: "INR",
        name: "DeekshaGramin",
        description: description,
        image: "/logo.png", // Add your logo path
        // order_id: order.id, // Use this when you have backend integration
        handler: function (response) {
          // Payment successful
          console.log("Payment successful:", response);
          setLoading(false);

          // In production, verify payment on backend
          // fetch('/api/verify-razorpay-payment', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     razorpay_order_id: response.razorpay_order_id,
          //     razorpay_payment_id: response.razorpay_payment_id,
          //     razorpay_signature: response.razorpay_signature
          //   })
          // });

          if (onSuccess) {
            onSuccess(response);
          }
        },
        prefill: {
          name: prefill.name || "",
          email: prefill.email || "",
          contact: prefill.contact || "",
        },
        notes: notes,
        theme: {
          color: "#2563eb", // Blue color matching your app theme
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            console.log("Payment cancelled by user");
            if (onDismiss) {
              onDismiss();
            }
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        setLoading(false);
        console.error("Payment failed:", response.error);
        if (onFailure) {
          onFailure(response.error);
        }
      });

      razorpay.open();
    } catch (error) {
      setLoading(false);
      console.error("Payment error:", error);
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  return {
    initiatePayment,
    loading,
    scriptLoaded,
  };
}
