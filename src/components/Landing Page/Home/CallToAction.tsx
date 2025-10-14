import React from 'react'
import ConnectFinanceJobsRecruitment from '@/assets/ConnectFinanceJobsRecruitment.6f9db31f.png'

const CallToAction = () => {
    return (
        <div className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-c-hover to-secondary-c -z-20"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/5 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-500/5 blur-[120px] rounded-full -z-10"></div>

            {/* Content */}
            <div className="relative  mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">

                    {/* Text Section */}
                    <div className="flex flex-col gap-6 md:gap-8 w-full md:w-1/2">
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            60+ Accounting &amp; Finance Experts
                            <span className="block mt-2 text-white">Trust Our Platform</span>
                        </h1>

                        <div className="space-y-6">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Join a growing network of skilled accountants and finance experts ready to support your business.
                                Whether you're looking for bookkeeping, tax advisory, financial analysis, or auditing services,
                                our platform connects you with top-tier professionals.
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-white text-xl font-medium">
                                    Find the Right Talent for Your Business Today!
                                </h3>
                                <h3 className="inline-flex gap-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 text-lg font-medium">
                                    🚀 Connect • Finance • Jobs • Recruitment
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-yellow-500/20 rounded-3xl blur-2xl"></div>
                            <img
                                alt="Connect Finance Jobs Recruitment"
                                loading="lazy"
                                width={450}
                                height={470}
                                decoding="async"
                                className="relative w-full max-w-[300px] md:max-w-[450px] h-auto rounded-3xl shadow-2xl"
                                src={ConnectFinanceJobsRecruitment}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>)
}

export default CallToAction
