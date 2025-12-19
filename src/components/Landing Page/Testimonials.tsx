import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Nestira transformed our hiring process. We found a qualified CFO in half the time compared to traditional methods.",
      author: "Ahmed Hassan",
      role: "HR Director",
      company: "Leading Investment Bank, Egypt",
    },
    {
      quote: "As a CPA, I was tired of generic job boards. Nestira matched me with roles that truly fit my expertise and career goals.",
      author: "Sara Al-Rashid",
      role: "Senior Accountant",
      company: "Now at Big Four, Dubai",
    },
    {
      quote: "The skill assessments helped us identify candidates who could hit the ground running. Quality over quantity.",
      author: "Omar Khalil",
      role: "Finance Manager",
      company: "Tech Startup, Cairo",
    },
  ];

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto container-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Success Stories
          </span>
          <h2 className="section-title text-primary-foreground mb-6">
            What Our Users Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="relative bg-navy-light/50 border border-primary-foreground/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-accent" />
              </div>

              {/* Quote Text */}
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-primary-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-primary-foreground/60 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-accent text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
