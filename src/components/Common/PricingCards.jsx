import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const CheckIcon = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

const PricingCards = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [membershipType, setMembershipType] = useState(null);
  const [remainingDays, setRemainingDays] = useState(0);

  const verifyPremium = async (paymentResponse) => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data?.isPremium) {
        setIsPremiumUser(true);
        setMembershipType(res.data?.membershipType?.toUpperCase() || null);
        const validityDate = new Date(res.data?.membershipValidity);
        const today = new Date();
        const diffTime = validityDate - today;
        const remaining = Math.max(
          0,
          Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        );

        setRemainingDays(remaining);
      } else {
        setIsPremiumUser(false);
        setMembershipType("");
        setRemainingDays(0);
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong.";
      console.error(msg);
    }
  };

  useEffect(() => {
    verifyPremium();
  }, []);

  const Feature = ({ children }) => (
    <li className="flex items-start gap-3">
      <CheckIcon className="mt-1 h-5 w-5 text-success shrink-0" />
      <span>{children}</span>
    </li>
  );
  const handleBuyClick = async (plan) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: plan },
        { withCredentials: true }
      );
      console.log(order.data);
      const { amount, currency, orderId } = order?.data?.data || {};
      const notes = order?.data?.data?.notes || {};
      const options = {
        key: order?.data?.keyId,
        amount,
        currency,
        name: "DEVTALK",
        description: "Connect with developers",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName || ""} ${notes.lastName || ""}`.trim(),
          email: notes.email || "",
        },
        theme: { color: plan === "gold" ? "#FCB700" : "#000000" },
        handler: function (response) {
          verifyPremium(response);
        },
      };
      if (!window.Razorpay) {
        console.error("Razorpay not loaded");
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error : " + err);
    }
  };

  return (
    <>
      {isPremiumUser ? (
        //create a box for existing plan
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">You are a Premium User!</h2>
            <p className="text-lg mb-6">
              Thank you for being a valued member of our community.
            </p>

            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <span className="font-semibold">
                {membershipType} membership Active
              </span>
            </div>
            <p className="text-lg mb-6">Remainig days are {remainingDays}</p>
          </div>
        </div>
      ) : (
        <section className="w-full pb-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Choose your plan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Silver */}
              <div className="card h-full bg-base-100 border border-base-300 shadow-2xl shadow-black">
                <div className="card-body">
                  <h3 className="card-title">Silver</h3>
                  <p className="text-base-content/70">
                    Everything you need to get started.
                  </p>

                  <div className="divider my-2" />

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ₹19
                    </span>
                    <span className="text-base-content/60">/month</span>
                  </div>

                  <ul className="mt-4 space-y-3">
                    <Feature>Chat with other people</Feature>
                    <Feature>100 Connection request per day</Feature>
                    <Feature>Blue tick</Feature>
                    <Feature>3 months</Feature>
                  </ul>

                  <div className="card-actions mt-6">
                    <button
                      className="btn btn-primary btn-outline w-full"
                      onClick={() => handleBuyClick("silver")}
                    >
                      Choose Silver
                    </button>
                  </div>
                </div>
              </div>

              {/* Gold */}
              <div className="card relative h-full bg-base-100  border-2 border-warning/40 ring-2 ring-warning/30 shadow-2xl shadow-warning">
                <div className="absolute right-4 -top-3">
                  <span className="badge badge-warning badge-lg shadow">
                    Most popular
                  </span>
                </div>

                <div className="card-body bg-gradient-to-b from-warning/10 to-transparent">
                  <h3 className="card-title">Gold</h3>
                  <p className="text-base-content/70">
                    Advanced features for teams that need more.
                  </p>

                  <div className="divider my-2" />

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">
                      ₹30
                    </span>
                    <span className="text-base-content/60">/month</span>
                  </div>

                  <ul className="mt-4 space-y-3">
                    <Feature>chat with other people</Feature>
                    <Feature>unlimited connection request per day</Feature>
                    <Feature>Blue tick</Feature>
                    <Feature>6 months</Feature>
                  </ul>

                  <div className="card-actions mt-6">
                    <button
                      className="btn btn-warning w-full"
                      onClick={() => handleBuyClick("gold")}
                    >
                      Choose Gold
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PricingCards;
