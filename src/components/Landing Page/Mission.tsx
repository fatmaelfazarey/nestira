import { ArrowRight } from 'lucide-react';

const Mission = () => {
    return (
        <section id="get-started" className="section-padding bg-background">
            <div className="container mx-auto container-padding">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Mission Statement */}
                    <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
                        Our Mission
                    </span>
                    <h2 className="section-title mb-8">
                        Connecting Finance Professionals with the Right Opportunities
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
                        "To connect finance and accounting professionals with the right opportunities and become the <span className="text-accent font-semibold">leading hiring platform</span> in Egypt and the GCC."
                    </p>

                    {/* CTA */}
                    <div className="bg-navy rounded-2xl p-8 md:p-12 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                                Ready to Transform Your Hiring?
                            </h3>
                            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                                Join hundreds of companies and thousands of finance professionals already using Nestira.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#" className="btn-primary text-lg py-4 px-8 group">
                                    Start Hiring Today
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a href="#" className="btn-outline text-lg py-4 px-8">
                                    Find Your Next Role
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
