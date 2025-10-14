import React from 'react'
import { Link } from 'react-router-dom'

const Become = () => {
    return (
        <div className="relative py-24 md:py-32 overflow-hidden">
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-20"></div>

            {/* Subtle radial light effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent opacity-40 -z-10"></div>

            <div className="relative  mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Candidate Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-300/5 -z-10"></div>

                        <div className="relative p-8 md:p-10 flex flex-col gap-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Become a Candidate
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Find your dream accounting job with top firms worldwide. Join
                                thousands of professionals who've advanced their careers through
                                our platform.
                            </p>

                            <Link className="w-fit" to="/signup/candidate">
                                <button className="inline-flex items-center gap-2 px-8 py-3 text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-full transition-shadow duration-300 transform hover:scale-105 font-medium">
                                    Register now
                                    <span className="transition-transform">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Employer Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 to-orange-800 shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-400/10 via-transparent to-transparent -z-10"></div>

                        <div className="relative p-8 md:p-10 flex flex-col gap-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                Become an Employer
                            </h1>
                            <p className="text-gray-100 text-lg">
                                Access top accounting talent globally. Streamline your hiring
                                process with our curated network of qualified professionals.
                            </p>

                            <Link className="w-fit" to="/signup/employer">
                                <button className="inline-flex items-center gap-2 px-8 py-3 text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-shadow duration-300 transform hover:scale-105 font-medium">
                                    Register now
                                    <span className="transition-transform">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Become
