import React from 'react';
import Banner from './Banner';
import RecentCars from './RecentCars';
import WhyChoose from './whyChoose';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            <RecentCars></RecentCars>

            <WhyChoose></WhyChoose>
        </div>
    );
};

export default Home;