import { Building2, Award, Scale, MapPin, CheckCircle2 } from 'lucide-react';

const WhyNestira = () => {
  const features = [
    {
      icon: Building2,
      title: 'Built for Finance & Accounting',
      description: 'Purpose-built platform exclusively for finance professionals — not a generic job board.',
    },
    {
      icon: Award,
      title: 'Deep Industry Knowledge',
      description: 'We understand roles, certifications (CPA, CFA, ACCA), and ERP systems (SAP, Oracle).',
    },
    {
      icon: Scale,
      title: 'Fair & Skills-Based Matching',
      description: 'Our algorithms focus on skills and potential, not just keywords or connections.',
    },
    {
      icon: MapPin,
      title: 'Designed for Egypt & GCC',
      description: 'Tailored for regional hiring practices, cultures, and market expectations.',
    },
  ];

  const checkpoints = [
    'Specialized finance assessments',
    'Video profile introductions',
    'ERP system proficiency tracking',
    'Certification verification',
    'Salary benchmarking data',
    'Industry-specific matching',
  ];

  return (
    <section id="about" className="section-padding bg-secondary/50">
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Our Difference
            </span>
            <h2 className="section-title mb-6">
              Why Finance Leaders Choose Nestira
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're not just another job platform. Nestira is the specialized hiring ecosystem designed specifically for finance and accounting professionals across Egypt and the GCC region.
            </p>

            {/* Checkpoints Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {checkpoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Features */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNestira;
