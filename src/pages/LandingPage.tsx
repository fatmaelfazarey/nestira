
// import Footer from '@/components/Landing Page/Footer';
// import Header from '@/components/Landing Page/Header';
// import Hero from '@/components/Landing Page/Home/Hero';
// import { Button } from '@/components/ui/button';
// import React from 'react'
// import { Link, Outlet } from 'react-router-dom';


// const LandingPage = () => {
//     return (
//         // <div className='text-center h-[100vh] flex justify-center items-center flex-col gap-2'>
//         <div>
//             <Header />
//             <Outlet />
//             <Footer />
//         </div>
//     )
// }

// export default LandingPage

import Header from '@/components/Landing Page/Header';
import Hero from '@/components/Landing Page/Hero';
import Benefits from '@/components/Landing Page/Benefits';
import HowItWorks from '@/components/Landing Page/HowItWorks';
import WhyNestira from '@/components/Landing Page/WhyNestira';
import TrustIndicators from '@/components/Landing Page/TrustIndicators';
import Testimonials from '@/components/Landing Page/Testimonials';
import Mission from '@/components/Landing Page/Mission';
import Footer from '@/components/Landing Page/Footer';

const Index = () => {
    return (
        <main className="min-h-screen">
            <Header />
            <Hero />
            <Benefits />
            <HowItWorks />
            <WhyNestira />
            <TrustIndicators />
            <Testimonials />
            <Mission />
            <Footer />
        </main>
    );
};

export default Index;
