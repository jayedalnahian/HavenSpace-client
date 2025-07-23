import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaHandshake,
  FaHome,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const qnaData = [
  {
    id: 1,
    question: "How do I book a property tour?",
    answer: "Click the 'Schedule Tour' button on the property details page and choose a suitable time.",
    icon: FaCalendarAlt,
  },
  {
    id: 2,
    question: "What documents are required to purchase a home?",
    answer: "You'll typically need a national ID, proof of income, and a bank approval letter.",
    icon: FaFileAlt,
  },
  {
    id: 3,
    question: "Are there any hidden fees involved?",
    answer: "HavenSpace ensures full transparency. All service fees are listed before final payment.",
    icon: FaMoneyBillWave,
  },
  {
    id: 4,
    question: "Can I negotiate the listed property price?",
    answer: "Yes! Use the 'Make an Offer' feature or directly contact the listing agent.",
    icon: FaHandshake,
  },
  {
    id: 5,
    question: "How do I verify if a property is sold or available?",
    answer: "Properties show a 'Sold' badge if unavailable. You can also check the listing status.",
    icon: FaHome,
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F2EFE7] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#006A71]">Frequently Asked Questions</h2>
          <p className="text-[#48A6A7] mt-2">Quick answers to common queries about HavenSpace</p>
        </div>

        <div className="space-y-4">
          {qnaData?.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all border border-[#9ACBD0]/40"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left text-[#006A71] hover:bg-[#f7f7f5] transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="text-[#48A6A7]" />
                    <span className="font-medium">{item.question}</span>
                  </div>
                  <span className="ml-auto">
                    {isOpen ? (
                      <FaChevronUp className="text-[#48A6A7]" />
                    ) : (
                      <FaChevronDown className="text-[#48A6A7]" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-4 text-[#006A71] text-sm"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
