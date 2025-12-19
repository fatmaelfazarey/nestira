import { Shield, Lock, Award } from 'lucide-react';

const TrustIndicators = () => {
  const badges = [
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security',
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'GDPR compliant',
    },
    {
      icon: Award,
      title: 'Verified Profiles',
      description: 'Credential verification',
    },
  ];

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            Trusted by Finance Leaders
          </span>
          <p className="text-muted-foreground">
            Leading companies in Egypt and the GCC trust Nestira for their finance hiring needs.
          </p>
        </div>

        {/* Partner Logos Placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12 opacity-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-32 h-12 bg-muted rounded-lg flex items-center justify-center"
            >
              <span className="text-muted-foreground text-sm font-medium">
                Partner {i}
              </span>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  {badge.title}
                </div>
                <div className="text-muted-foreground text-xs">
                  {badge.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
