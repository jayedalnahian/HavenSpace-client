import React from 'react';
import { 
  FaCheckCircle, 
  FaUserShield, 
  FaHandsHelping, 
  FaMapMarkedAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    id: 1,
    icon: FaCheckCircle,
    title: "Verified Listings",
    description: "All properties on HavenSpace are manually reviewed and verified for accuracy."
  },
  {
    id: 2,
    icon: FaUserShield,
    title: "Secure Transactions",
    description: "We prioritize safety with encrypted payments and identity-verified agents."
  },
  {
    id: 3,
    icon: FaHandsHelping,
    title: "Dedicated Support",
    description: "Our support team is available 24/7 to assist you at every step."
  },
  {
    id: 4,
    icon: FaMapMarkedAlt,
    title: "Location Intelligence",
    description: "We offer neighborhood insights, school ratings, and public transport access."
  }
];

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
    >
      <div className="bg-[#9ACBD0] bg-opacity-20 p-4 rounded-full mb-4">
        <Icon className="text-[#48A6A7]" size={32} />
      </div>
      <h3 className="text-xl font-bold text-[#006A71] mb-2">{title}</h3>
      <p className="text-[#006A71]">{description}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F2EFE7]" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#006A71] mb-4">
            Why Choose HavenSpace?
          </h2>
          <p className="text-lg text-[#48A6A7] max-w-3xl mx-auto">
            HavenSpace revolutionizes real estate by combining cutting-edge technology with 
            personalized service, helping you find, buy, or sell properties with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#48A6A7] bg-opacity-10 p-8 rounded-2xl border border-[#48A6A7] border-opacity-30"
        >
          <h3 className="text-2xl font-bold text-[#006A71] mb-4 text-center">
            Our Mission
          </h3>
          <p className="text-[#006A71] text-center max-w-4xl mx-auto">
            To simplify real estate transactions through transparency, innovation, and 
            exceptional service, making property ownership accessible and stress-free for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;