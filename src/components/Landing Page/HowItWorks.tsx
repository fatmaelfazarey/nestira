import { FileText, ClipboardCheck, Zap, Handshake } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      step: '01',
      title: 'Post or Browse Roles',
      description: 'Employers post finance roles, candidates browse and apply to matching opportunities.',
    },
    {
      icon: ClipboardCheck,
      step: '02',
      title: 'Complete Assessments',
      description: 'Candidates complete skill assessments and employers review verified credentials.',
    },
    {
      icon: Zap,
      step: '03',
      title: 'Instant Matching',
      description: 'Our AI instantly matches top candidates with the most suitable positions.',
    },
    {
      icon: Handshake,
      step: '04',
      title: 'Interview & Hire',
      description: 'Connect directly, conduct interviews, and make confident hiring decisions.',
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="section-title text-primary-foreground mb-6">
            How Nestira Works
          </h2>
          <p className="section-subtitle text-primary-foreground/70 mx-auto">
            From posting a role to making a hire, our streamlined process saves you time and connects you with the right people.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent/50 to-accent/20" />
              )}

              <div className="relative bg-navy-light/50 border border-primary-foreground/10 rounded-2xl p-8 text-center hover:border-accent/50 transition-all duration-300 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground font-bold text-sm px-4 py-1 rounded-full">
                  Step {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mt-4 mb-6 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-primary-foreground/60">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
