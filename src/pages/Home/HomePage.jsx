import React, { useEffect } from 'react';
import HeroSection from '../../components/HomePageComponents/HeroSection';
import FeaturedListings from '../../components/HomePageComponents/FeaturedListings';
import QACarousel from '../../components/HomePageComponents/QACarousel';
import AboutSection from '../../components/HomePageComponents/AboutSection';
import WebsiteReviews from '../../components/WebsiteReviews';
import PropertySearch from '../../components/HomePageComponents/PropertySearch';
import Newsletter from '../../components/HomePageComponents/Newsletter';

const HomePage = () => {
    useEffect(() => {
        document.title = "HavenSpace | Home";
    }, []);
    return (
        <div>
            <HeroSection></HeroSection>
            < PropertySearch></PropertySearch>
            <WebsiteReviews></WebsiteReviews> 
            <QACarousel></QACarousel>
            <AboutSection></AboutSection>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;