import React from 'react'
import { Link } from 'react-router-dom'
import connect from '@/assets/connect-1.9d63aefe.png';
import connect_2 from '@/assets/connect-2.71c0f34c.png';
import connect_3 from '@/assets/connect-3.bdc970b7.png';


const ConnectSection = () => {
  return (
    <div className='relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-50'>
      <div className=' mx-auto px-4 w-full'>

        <div className='flex flex-col gap-8 md:gap-14'>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-secondary-c to-yellow-600 text-lg font-semibold'>Connect</span>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900'>Empowering Your Career Journey</h1>
            <p className='text-gray-600 text-lg max-w-2xl'>Find the right job or candidate in finance with our intelligent matching system.</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>

            <div className='lg:col-span-2 group overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-3xl bg-white border border-gray-100'>
              <div className='grid md:grid-cols-2 h-full'>
                <div className='flex flex-col justify-center gap-6 p-8 md:p-10'>
                  <div className='space-y-4'>
                    <h6 className='text-transparent bg-clip-text bg-gradient-to-r from-secondary-c to-yellow-600 font-semibold'>Jobs</h6>
                    <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>Tailored Opportunities for Everyone</h3>
                    <p className='text-gray-600'>Access exclusive finance job listings and candidates.</p>
                    <Link
                      to='/login'
                      className='group/link inline-flex items-center gap-2 text-secondary-c font-medium hover:bg-secondary-c-hover transition-colors'>Explore
                      <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 transition-transform group-hover/link:translate-x-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path></svg>
                    </Link>
                  </div>

                </div>
                <div className='relative h-full overflow-hidden min-h-[300px] md:min-h-0'>
                  <img alt='connect-image 1'
                    src={connect}
                    className='object-cover rounded-b-3xl group-hover:scale-105 transition-transform duration-300 md:rounded-l-none md:rounded-r-3xl absolute w-full h-full' />
                </div>
              </div>

            </div>
            <div className='group hover:shadow-xl transition-shadow duration-300 rounded-3xl bg-white border border-gray-100 overflow-hidden'>
              <div className='flex flex-col h-full'>
                <div className='flex flex-col gap-6 p-4 md:p-8'>
                  <div className='space-y-4'>
                    <h6 className='text-transparent bg-clip-text bg-gradient-to-r from-secondary-c to-yellow-600 font-semibold'>Employers</h6>
                    <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>Streamlined Hiring Process</h3>
                    <p className='text-gray-600'>Simplify your recruitment with our user-friendly platform.</p>

                  </div>
                  <Link
                    to='/signup/employer'
                    className='group/link inline-flex items-center gap-2 text-secondary-c font-medium hover:bg-secondary-c-hover transition-colors'>Join
                    <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 transition-transform group-hover/link:translate-x-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path></svg>
                  </Link>
                </div>
                <div className='relative overflow-hidden h-48 mt-auto'>
                  <img className='object-cover group-hover:scale-105 transition-transform duration-300 absolute h-full w-full' src={connect_2} /> </div>
              </div>


            </div>
            <div className='group hover:shadow-xl transition-shadow duration-300 rounded-3xl bg-white border border-gray-100 overflow-hidden'>
              <div className='flex flex-col h-full'>
                <div className='flex flex-col gap-6 p-4 md:p-8'>
                  <div className='space-y-4'>
                    <h6 className='text-transparent bg-clip-text bg-gradient-to-r from-secondary-c to-yellow-600 font-semibold'>Candidates</h6>
                    <h3 className='text-2xl md:text-3xl font-bold text-gray-900'>Your Future Awaits</h3>
                    <p className='text-gray-600'>Unlock your potential with tailored job matches.</p>

                  </div>
                  <Link to='/signup/candidate' className='group/link inline-flex items-center gap-2 text-secondary-c font-medium hover:bg-secondary-c-hover transition-colors'>Sign Up
                    <svg stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 transition-transform group-hover/link:translate-x-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path></svg>
                  </Link>
                </div>
                <div className='relative overflow-hidden h-48 mt-auto'>
                  <img className='object-cover group-hover:scale-105 transition-transform duration-300 absolute h-full w-full' src={connect_3} /> </div>
              </div>


            </div>
          </div>
        </div>



      </div>

    </div>
  )
}

export default ConnectSection
