// React - PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get("oid");
    const amt = params.get("amt");
    const refId = params.get("refId");

    if (oid && amt && refId) {
      axios.post("http://localhost:8000/api/esewa-payment-success/", {
        oid,
        amt,
        refId
      })
      .then(() => {
        alert("Payment successful!");
        navigate("/");  // Redirect to home page
      })
      .catch(err => {
        console.error(err);
        alert("Failed to verify payment.");
      });
    }
  }, []);

  return <div>Here You Are...</div>;
}

export default PaymentSuccess;
