import Babai from "@/components/Babai";

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "Hyderabad",
    course: "Python",
    avatar: "👨‍🎓",
    text: "Finally, a platform that teaches in Telugu! I completed Python in 3 weeks. The story-based lessons made coding feel like playing a game.",
    rating: 5,
  },
  {
    name: "Priya Reddy",
    location: "Vijayawada",
    course: "Web Design",
    avatar: "👩‍💻",
    text: "₹99 lo antha value? Unbelievable! I built my first website and got an internship. Babai's motivation kept me going.",
    rating: 5,
  },
  {
    name: "Venkat Rao",
    location: "Warangal",
    course: "MySQL",
    avatar: "👨‍💼",
    text: "YouTube lo hours waste chesevadini. Here, each lesson is short and practical. Got placed as a Junior Developer!",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    location: "Guntur",
    course: "Django",
    avatar: "👩‍🔬",
    text: "From zero coding knowledge to building web apps. The journey map made it easy to track progress. Highly recommend!",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Active Learners" },
  { value: "95%", label: "Completion Rate" },
  { value: "4.8★", label: "Average Rating" },
  { value: "500+", label: "Success Stories" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">Real Stories, </span>
            <span className="text-gradient">Real Success</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from students who transformed their careers.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="game-card p-6 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{item.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-bold text-foreground">{item.name}</h4>
                    <span className="text-xs text-muted-foreground">• {item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      {item.course}
                    </span>
                    <span className="text-warning text-sm">
                      {"★".repeat(item.rating)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Babai Encouragement */}
        <div className="flex flex-col items-center text-center">
          <Babai expression="proud" size="md" showBubble={false} />
          <p className="mt-4 text-lg text-foreground font-medium italic">
            "Next success story neevu kaavali ra! 🌟"
          </p>
          <p className="text-sm text-muted-foreground">— Babai believes in you</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
