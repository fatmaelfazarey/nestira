import React from 'react'
import map from '@/assets/map.9a584763.png';

const Countries = () => {
    return (
       <div className="relative py-24 md:py-32 overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-20"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent opacity-40 -z-10"></div>

  <div className="mx-auto px-4">
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r  from-orange-900 to-secondary-c">
      {/* Lighting effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-500/5 blur-[100px] rounded-full"></div>

      <div className="relative p-8 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-12 md:gap-16">
        {/* Text section */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h1 className="space-y-2">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-c to-secondary-c-hover text-4xl md:text-5xl lg:text-6xl font-bold">
              7+ Countries
            </span>
            <span className="block text-white text-4xl md:text-5xl lg:text-6xl font-bold">
              Trust Our Platform
            </span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Join a growing global community of finance experts and employers. Whether you're a company seeking qualified accountants or a professional looking for your next big opportunity, Finance Gate helps you connect, collaborate, and thrive—no matter where you are in the world.
          </p>
        </div>

        {/* Image section */}
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-yellow-500/20 rounded-3xl blur-2xl"></div>
            <img
              alt="Global Presence Map"
              loading="lazy"
              width={650}
              height={370}
              decoding="async"
              className="relative w-full max-w-[650px] h-auto rounded-3xl"
              src={map}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default Countries
