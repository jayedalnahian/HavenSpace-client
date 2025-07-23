import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentStatus, setPaymentStatus] = useState("verifying");

  useEffect(() => {
    document.title = "HavenSpace | Payment Success";
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get("https://b11a12-server-side-jayedalnahian.vercel.app/api/payment/verify", {
          params: { session_id: sessionId },
        });

        if (response.data.verified) {
          setPaymentStatus("success");
        } else {
         
          setPaymentStatus("failed");
        }
      } catch (err) {
        setPaymentStatus("error");
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto p-4">
      {paymentStatus === "verifying" && (
        <div>
          <h1 className="text-2xl font-bold">Verifying payment...</h1>
          <p>Please wait while we confirm your payment.</p>
        </div>
      )}

      {paymentStatus === "success" && (
        <div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p>Thank you for your purchase.</p>
        </div>
      )}

      {paymentStatus === "failed" && (
        <div>
          <h1 className="text-2xl font-bold">Payment Not Verified</h1>
          <p>We couldn't verify your payment. Please contact support.</p>
        </div>
      )}

      {paymentStatus === "error" && (
        <div>
          <h1 className="text-2xl font-bold">Error Occurred</h1>
          <p>There was an error verifying your payment.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
