import React,{ useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL : "http://localhost:3000/api/",
    withCredentials: true
})

const Loading = () => {
    return (
      <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-cyan-400 text-center">
          🎵 Loading inspiration, empowering artists, and unlocking possibilities through our platform...
        </p>
      </div>
    );
  };
const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trans, setTrans] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    artist_id,
    amount = 0,
    planIds = [],
    paymentIds = [], // Optional existing payment IDs
    returnPath = "/",
    heading = "Payment Required"
  } = location.state || {};

  const handlePaymentSuccess = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = {
        trans_id: trans,
        artist_id:artist_id,
        plan_ids: planIds
      };

      const response = await axiosApi.post("/payments/multi", formData);
      

      // Return to calling screen with payment data
      navigate(returnPath, {
        state: {
          status: "success",
          paymentData: {
            newPaymentIds: response.data.data.payments.map(p => p.id),
            existingPaymentIds: paymentIds,
            transactionId: trans
          }
        },
        replace: true
      });
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if(returnPath.includes('auth') ){
      logout();
    }
    navigate(returnPath, {
      state: {
        status: "cancelled"
      },
      replace: true
    });
  };

  return (
    <div className="relative">
      {loading && <Loading />}
    <div className="bg-black min-h-[calc(100vh-70px)] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-cyan-400 text-xl font-extrabold mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,1)] text-center">
        {heading} <span className="text-cyan-400">₹{amount}/-</span>
      </h1>

      <div className="flex flex-col items-center gap-6 max-w-md w-full">
              <img
          src="/qr.png"
          alt="QR Code"
          className="w-48 h-48 drop-shadow-[0_0_15px_rgb(252 253 253 / 45%))]"
        />

        <h2 className="text-xl text-center">SCAN QR AND PAY WITH UPI</h2>

        <div className="text-gray-400 text-sm text-center">
          Scan QR code, complete payment and enter the transaction ID below
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handlePaymentSuccess} className="w-full space-y-4">
          <input
            type="text"
            placeholder="Enter Transaction ID"
            value={trans}
            onChange={(e) => setTrans(e.target.value)}
            className="w-full bg-gray-800 rounded-md px-4 py-3 text-white"
            required
            disabled={loading}
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full border border-cyan-400 text-cyan-400 py-3 rounded-md"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-cyan-400 text-black py-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default PaymentScreen;
