import { ArrowRight } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.png';

const Hero = () => {
  return (
    <section className="relative bg-black min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />

      <div className="container mx-auto container-padding relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/80">
                Egypt & GCC's #1 Finance Hiring Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up animation-delay-100">
              Your Finance Career Starts{' '}
              <span className="text-accent">Here</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
              Find top finance talent or unlock your next career opportunity — faster, smarter, and more specialized.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
              <a href="#employers" className="btn-primary text-lg py-4 px-8 group">
                For Employers
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#candidates" className="btn-outline text-lg py-4 px-8">
                For Candidates
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">500+</div>
                <div className="text-sm text-primary-foreground/60">Finance Roles</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">2000+</div>
                <div className="text-sm text-primary-foreground/60">Candidates</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-primary-foreground/60">Companies</div>
              </div>
            </div>
          </div>

          {/* Right Team Photo */}
          <div className="relative flex items-center justify-center animate-slide-in-right animation-delay-200 lg:-mr-24">
            <img
              src={teamPhoto}
              alt="Finance professionals team"
              className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl scale-110 lg:scale-125"
              style={{
                maskImage: 'radial-gradient(ellipse 95% 90% at center 55%, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at center 55%, black 40%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
