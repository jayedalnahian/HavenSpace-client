import React from "react";
import { useLocation } from "react-router";

const PaymentSuccessPage = () => {
  const location = useLocation();

  // Extract propertyId from query string
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("propertyId");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Payment Successful!</h1>
      {propertyId ? (
        <p className="text-lg text-gray-700">
          Thank you for your purchase. Your transaction for property ID <strong>{propertyId}</strong> was completed successfully.
        </p>
      ) : (
        <p className="text-lg text-gray-700">Thank you for your purchase!</p>
      )}
      <button
        onClick={() => window.location.href = "/"}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
