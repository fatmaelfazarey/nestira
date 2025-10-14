// import React from 'react'
// import Hero from './Hero'
// import ConnectSection from './ConnectSection'
// import CallToAction from './CallToAction'
// import HowItWork from './HowItWork'
// import Countries from './Countries'
// import Become from './Become'

// const HomePage = () => {
//   return (
//     <div>
//       <Hero/>
//       <ConnectSection/>
//       <CallToAction/>
//       <HowItWork/>
//       <Countries/>
//       <Become />
//     </div>
//   )
// }

// export default HomePage
import React, { Suspense, lazy } from "react";

// Lazy load each section
import Hero from './Hero'
// const Hero = lazy(() => import("./Hero"));
const ConnectSection = lazy(() => import("./ConnectSection"));
const CallToAction = lazy(() => import("./CallToAction"));
const HowItWork = lazy(() => import("./HowItWork"));
const Countries = lazy(() => import("./Countries"));
const Become = lazy(() => import("./Become"));

// Fallback component for loading
const LoadingSection = () => (
  <div className="my-16 flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500"></div>
  </div>
);

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSection />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <ConnectSection />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <CallToAction />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <HowItWork />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Countries />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Become />
      </Suspense>
    </div>
  );
};

export default HomePage;
