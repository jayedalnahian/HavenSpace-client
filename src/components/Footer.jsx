import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "FAQs", "Terms"],
    },
    {
      title: "Explore",
      links: ["All Properties", "Agents", "Reviews", "Wishlist"],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, name: "Facebook" },
    { icon: <FaTwitter />, name: "Twitter" },
    { icon: <FaInstagram />, name: "Instagram" },
    { icon: <FaLinkedin />, name: "LinkedIn" },
  ];



  

  return (
    <footer 
      className={`w-full py-12 px-4 sm:px-6 lg:px-8`}
      style={{ backgroundColor: '#F2EFE7' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h2 
              className="text-2xl font-bold mb-2" 
              style={{ color: '#006A71' }}
            >
              HavenSpace
            </h2>
            <p className="text-lg mb-4" style={{ color: '#006A71' }}>
              Find Your Perfect Place
            </p>
            <div className="flex space-x-4">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-2xl hover:text-[#48A6A7] transition-colors"
                  style={{ color: '#006A71' }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks?.map((column, index) => (
            <div key={index}>
              <h3 
                className="text-lg font-semibold mb-4" 
                style={{ color: '#006A71' }}
              >
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="hover:text-[#48A6A7] transition-colors"
                      style={{ color: '#006A71' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4" 
              style={{ color: '#006A71' }}
            >
              Stay Updated
            </h3>
            <div className="flex">
              <div className="relative flex-grow">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                  style={{ color: '#006A71' }} 
                  size={20} 
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-2 rounded-l-lg focus:outline-none"
                  style={{ backgroundColor: '#9ACBD0', color: '#006A71' }}
                />
              </div>
              <button
                className="px-4 py-2 rounded-r-lg font-medium transition-colors"
                style={{ 
                  backgroundColor: '#48A6A7',
                  color: '#F2EFE7'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#006A71'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#48A6A7'}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="pt-6 border-t text-center" 
          style={{ borderColor: '#9ACBD0', color: '#006A71' }}
        >
          <p>© 2025 HavenSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;