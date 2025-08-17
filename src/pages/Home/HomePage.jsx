import React, { useEffect } from 'react';
import HeroSection from '../../components/HomePageComponents/HeroSection';
import QACarousel from '../../components/HomePageComponents/QACarousel';
import AboutSection from '../../components/HomePageComponents/AboutSection';
import PropertySearch from '../../components/HomePageComponents/PropertySearch';
import Newsletter from '../../components/HomePageComponents/Newsletter';
import HowItWorks from '../../components/HomePageComponents/HowItWorks';
import WebsiteReviewModal from '../../components/WebsiteReviewModal';
import WebsiteReviews from '../../components/WebsiteReviews';

const HomePage = () => {
    useEffect(() => {
        document.title = "HavenSpace | Home";
    }, []);
    return (
        <div>
            <HeroSection></HeroSection>
            <PropertySearch></PropertySearch>
            <HowItWorks></HowItWorks>
            <QACarousel></QACarousel>
            <AboutSection></AboutSection>
            <WebsiteReviews></WebsiteReviews>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;