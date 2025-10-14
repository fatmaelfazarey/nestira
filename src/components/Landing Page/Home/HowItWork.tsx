import React from 'react'

const HowItWork = () => {
    const steps = [
        {
            title: "Create account",
            description:
                "Sign up in minutes and gain access to a network of top accounting and finance professionals.",
            gradient: "from-orange-500 to-cyan-500",
            icon: "/assets/icon1.png",
        },
        {
            title: "Complete profile",
            description:
                "Provide your details and showcase your skills or hiring needs for better matches.",
            gradient: "from-yellow-500 to-pink-500",
            icon: "/assets/icon2.png",
        },
        {
            title: "Find matches",
            description:
                "Browse and connect with the perfect candidates or job opportunities.",
            gradient: "from-orange-500 to-red-500",
            icon: "/assets/icon3.png",
        },
        {
            title: "Start working",
            description:
                "Collaborate seamlessly and grow your career or business with ease.",
            gradient: "from-green-500 to-emerald-500",
            icon: "/assets/icon4.png",
        },
    ];

    return (
        <div className="relative py-24 md:py-32 overflow-hidden">
            {/* Backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-50 via-transparent to-transparent opacity-40 -z-10"></div>

            <div className="relative  mx-auto px-4">
                <div className="flex flex-col items-center gap-16 md:gap-24">
                    {/* Title */}
                    <h1 className="text-center space-y-4">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-c to-secondary-c-hover text-lg font-semibold">
                            Simple Steps
                        </span>
                        <p className="text-4xl md:text-5xl font-bold text-gray-900">
                            How it works
                        </p>
                    </h1>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative">
                                {/* connecting line for large screens */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/4 left-full w-full h-[2px] bg-gradient-to-r from-gray-200 to-gray-100 -z-10">
                                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-200"></div>
                                    </div>
                                )}

                                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <div className="w-full h-full bg-white rounded-xl p-3">
                                            <img
                                                src={step.icon}
                                                alt={step.title}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-secondary-c group-hover:to-secondary-c-hover transition-all duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWork
