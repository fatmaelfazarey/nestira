
import Footer from '@/components/Landing Page/Footer';
import Header from '@/components/Landing Page/Header';
import Hero from '@/components/Landing Page/Home/Hero';
import { Button } from '@/components/ui/button';
import React from 'react'
import { Link, Outlet } from 'react-router-dom';


const LandingPage = () => {
    return (
        // <div className='text-center h-[100vh] flex justify-center items-center flex-col gap-2'>
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default LandingPage
