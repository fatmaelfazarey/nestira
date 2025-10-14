import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card"
import heroPeople from '@/assets/hero-people.png';

const Hero = () => {
    return (

        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-background overflow-hidden">
            {/* Left Side */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
                    Easy to <span className="text-secondary-c inline-block mb-2">Hire</span><br />
                    Talented <span className="text-secondary-c inline-block mb-2">Finance</span> &<br />
                    Accounting <span className="text-secondary-c inline-block ">Professionals</span>

                </h1>

                <p className='text-gray-600 text-lg md:text-xl mb-12 leading-relaxed'>
                    Find and connect with top accounting professionals for your business needs. Our platform makes hiring simple and efficient.
                </p>


                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button className="bg-secondary-c text-white hover:bg-secondary-c/80">

                        <Link to='/signup/candidate'>Find a Job</Link>
                    </Button>
                    <Button variant="outline" className="hover:bg-secondary-c/10">
                        <Link to='/signup/employer'> Hire Talent</Link>

                    </Button>
                </div> */}
                <div className='flex flex-wrap gap-4'>

                    <div className='flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-400/10 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-0.5 hover:bg-opacity-80'>
                        <span className='text-2xl transform transition-transform duration-300 group-hover:rotate-12'>🎯</span>
                        <span className='text-gray-700 font-medium'>Smart Matching</span>
                    </div>
                    <div className='flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-400/10 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-0.5 hover:bg-opacity-80'>
                        <span className='text-2xl transform transition-transform duration-300 group-hover:rotate-12'>🌟
                        </span>
                        <span className='text-gray-700 font-medium'>Top Talent
                        </span>
                    </div>    <div className='flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-400/10 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-0.5 hover:bg-opacity-80'>
                        <span className='text-2xl transform transition-transform duration-300 group-hover:rotate-12'>🔒</span>
                        <span className='text-gray-700 font-medium'>
                            Secure Hiring</span>
                    </div>
                </div>

            </div>

            {/* Right Side (Optional Illustration or Image) */}
            <div className="mt-10 md:mt-0 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-orange-300/20 rounded-[3rem] blur-3xl transform rotate-6 animate-pulse-slow"></div>
                <img
                    src={heroPeople}
                    alt="heroPeople"
                    width="660"
                    height="655"
                    className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-xl mx-auto transform hover:scale-[1.03] transition-all duration-500 ease-out"
                />
            </div>
        </section>
    )
}

export default Hero
