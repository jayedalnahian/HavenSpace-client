import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosInterceptor from "../../CustomHooks/useAxiosInterceptor";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";

const PaymentSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propertyId, setPropertyId] = useState("");
  const [agentId, setAgentId] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosInterceptor();
  const [isProcessing, setIsProcessing] = useState(true);

  // Extract IDs from params
  useEffect(() => {
    if (id) {
      const ids = id.split(",");
      if (ids.length >= 2) {
        setPropertyId(ids[0]);
        setAgentId(ids[1]);
      }
    }
  }, [id]);

  // Mutation for marking property as sold
  const { mutate: markAsSold } = useMutation({
    mutationFn: async () => {
      if (!propertyId || !user?.uid || !agentId) return;

      return await axiosSecure.patch(`/api/property/${propertyId}`, {
        availability: "Sold",
      });
    },
    onSuccess: () => {
      setIsProcessing(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Property purchase completed!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      setIsProcessing(false);
      console.error("Error marking property as sold:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an issue completing your purchase. Please contact support.",
      });
    },
  });

  // Process the payment success
  useEffect(() => {
    if (propertyId && user?.uid && agentId) {
      markAsSold();
    } else {
      setIsProcessing(false);
    }
  }, [propertyId, user, agentId, markAsSold]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
        <LoadingSpinner />
        <p className="mt-4 text-gray-700">Completing your purchase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-green-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-green-700">
          Payment Successful!
        </h1>
        {propertyId ? (
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your purchase. Your transaction for property ID{" "}
            <strong>{propertyId}</strong> was completed successfully.
          </p>
        ) : (
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your purchase!
          </p>
        )}
        <button
          onClick={() => navigate("/")}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
