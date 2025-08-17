import React from "react";
import { FaRegUser, FaHome, FaClipboardCheck, FaDollarSign, FaStar } from "react-icons/fa";

const steps = [
  {
    icon: <FaRegUser className="text-5xl text-[#48A6A7]" />,
    title: "Sign Up / Login",
    description:
      "Register as a User, Agent, or Admin. Your account lets you access dashboards and manage properties or offers.",
    subPoints: [
      "Email/password authentication",
      "Social login option",
      "Secure private routes for each role",
    ],
  },
  {
    icon: <FaHome className="text-5xl text-[#48A6A7]" />,
    title: "Browse Properties",
    description:
      "Explore all verified properties with detailed information including images, location, and agent details.",
    subPoints: [
      "Filter and sort by price, location, and property type",
      "Add properties to wishlist",
      "View latest reviews for properties",
    ],
  },
  {
    icon: <FaClipboardCheck className="text-5xl text-[#48A6A7]" />,
    title: "Make an Offer",
    description:
      "Select a property and submit your offer through a secure form with validation to ensure the price is within range.",
    subPoints: [
      "Offer form pre-fills property and buyer info",
      "Pending status until agent accepts or rejects",
      "View all offers in User Dashboard",
    ],
  },
  {
    icon: <FaDollarSign className="text-5xl text-[#48A6A7]" />,
    title: "Complete Purchase",
    description:
      "Once the offer is accepted, complete payment using integrated payment methods. Transaction details are saved securely.",
    subPoints: [
      "Stripe integration for payments",
      "Update status to 'bought' upon completion",
      "Transaction ID visible for confirmation",
    ],
  },
  {
    icon: <FaStar className="text-5xl text-[#48A6A7]" />,
    title: "Add Reviews",
    description:
      "Provide feedback for properties you bought or visited. Reviews help other users make informed decisions.",
    subPoints: [
      "Add reviews via modal on property details page",
      "Manage your reviews in User Dashboard",
      "Admins can moderate all reviews",
    ],
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#006A71] mb-12">
          How Our Platform Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">{step.icon}</div>
                <h3 className="text-2xl font-semibold text-[#006A71]">{step.title}</h3>
              </div>
              <p className="text-[#006A71]/90 mb-3">{step.description}</p>
              {step.subPoints && (
                <ul className="list-disc list-inside text-[#006A71]/70 space-y-1">
                  {step.subPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
