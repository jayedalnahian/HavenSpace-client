import React from "react";
import { Building2, Users, ShieldCheck, Code, Heart, Mail, Github, Linkedin, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#F2EFE7] text-[#006A71] flex flex-col items-center px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About HavenSpace</h1>
        <p className="text-lg md:text-xl text-gray-700">
          HavenSpace is a modern real estate platform designed to connect buyers, 
          agents, and property owners in a seamless and secure way. 
          Whether you’re looking to purchase your dream home, list properties as an agent, 
          or manage everything from one dashboard — HavenSpace is here for you.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Mission */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <Building2 className="w-12 h-12 text-[#48A6A7] mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To make property buying and selling simple, transparent, and accessible 
            for everyone, everywhere.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <Users className="w-12 h-12 text-[#48A6A7] mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To build a trusted global platform where users, agents, and 
            administrators collaborate for smarter real estate solutions.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <ShieldCheck className="w-12 h-12 text-[#48A6A7] mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <p className="text-gray-600">
            Integrity, innovation, and inclusivity — we value the trust 
            of our users and work hard to deliver secure and fair services.
          </p>
        </div>
      </div>

      {/* Creator Section */}
      <div className="max-w-4xl text-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet the Creator</h2>
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
          <Code className="w-12 h-12 text-[#48A6A7] mb-4" />
          <h3 className="text-xl font-semibold">MD. Jayed Al Nahian</h3>
          <p className="text-gray-600 mt-2">
            Junior MERN Stack Developer from Dinajpur, Bangladesh. Passionate about building 
            modern web applications with seamless user experiences. Fluent in Bengali, English, 
            and conversational Hindi.
          </p>
          <p className="flex items-center gap-2 mt-4 text-gray-700">
            <Heart className="w-5 h-5 text-red-500" /> Dedicated to empowering people through technology.
          </p>

          {/* Social Links */}
          <div className="flex gap-6 mt-6">
            <a href="mailto:jnahian752@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-[#006A71] transition">
              <Mail className="w-5 h-5" /> Email
            </a>
            <a href="https://github.com/jayedalnahian" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-[#006A71] transition">
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a href="https://linkedin.com/in/jayedalnahian" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-[#006A71] transition">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://jayedalnahian-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-[#006A71] transition">
              <Globe className="w-5 h-5" /> Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Closing Section */}
      <div className="max-w-4xl text-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose HavenSpace?</h2>
        <p className="text-lg text-gray-700">
          With role-based dashboards, Stripe-powered payments, property reviews, and 
          powerful search features, HavenSpace ensures that your real estate journey 
          is smooth, secure, and successful.
        </p>
      </div>
    </div>
  );
};

export default About;
