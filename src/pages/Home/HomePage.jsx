import React from 'react';
import HeroSection from '../../components/HomePageComponents/HeroSection';
import FeaturedListings from '../../components/HomePageComponents/FeaturedListings';
import QACarousel from '../../components/HomePageComponents/QACarousel';
import AboutSection from '../../components/HomePageComponents/AboutSection';
import WebsiteReviews from '../../components/WebsiteReviews';

const HomePage = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <FeaturedListings></FeaturedListings>
           <WebsiteReviews></WebsiteReviews>
           <QACarousel></QACarousel>
           <AboutSection></AboutSection>
        </div>
    );
};

export default HomePage;