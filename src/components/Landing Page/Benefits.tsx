import { Clock, Users, Target, Video, Award, Sparkles } from 'lucide-react';

const Benefits = () => {
  const employerBenefits = [
    {
      icon: Clock,
      title: 'Faster Hiring Cycles',
      description: 'Reduce time-to-hire with pre-screened candidates ready for interviews.',
    },
    {
      icon: Users,
      title: 'Pre-Screened Finance Talent',
      description: 'Access a pool of verified finance and accounting professionals.',
    },
    {
      icon: Target,
      title: 'Skill-Based Matching',
      description: 'Our AI matches candidates based on skills, certifications, and experience.',
    },
  ];

  const candidateBenefits = [
    {
      icon: Sparkles,
      title: 'Personalized Job Matches',
      description: 'Get matched with roles that fit your expertise and career goals.',
    },
    {
      icon: Award,
      title: 'Skill Assessments',
      description: 'Showcase your abilities with industry-recognized assessments.',
    },
    {
      icon: Video,
      title: 'Intro Video Profiles',
      description: 'Stand out with video introductions that show your personality.',
    },
  ];

  return (
    <section id="employers" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Why Choose Nestira
          </span>
          <h2 className="section-title mb-6">
            Benefits for Everyone
          </h2>
          <p className="section-subtitle mx-auto">
            Whether you're hiring top talent or searching for your dream role, Nestira delivers specialized solutions for finance professionals.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Employers */}
          <div id="candidates" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">For Employers</h3>
            </div>
            <div className="space-y-6">
              {employerBenefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="card-elevated group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <benefit.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Candidates */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">For Candidates</h3>
            </div>
            <div className="space-y-6">
              {candidateBenefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="card-elevated group"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
