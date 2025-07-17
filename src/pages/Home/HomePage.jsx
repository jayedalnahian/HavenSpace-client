import React from 'react';
import HeroSection from '../../components/HomePageComponents/HeroSection';
import FeaturedListings from '../../components/HomePageComponents/FeaturedListings';
import QACarousel from '../../components/HomePageComponents/QACarousel';
import AboutSection from '../../components/HomePageComponents/AboutSection';
import LatestReviews from '../../components/LatestReviews';
import HomeReviews from '../../components/HomeReviews';

const HomePage = () => {
    return (
        <div>
           <HeroSection></HeroSection>
           <FeaturedListings></FeaturedListings>
           <HomeReviews></HomeReviews>
           <QACarousel></QACarousel>
           <AboutSection></AboutSection>
        </div>
    );
};

export default HomePage;