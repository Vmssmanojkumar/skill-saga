import Sensei from "@/components/Sensei";

const steps = [
  {
    number: "01",
    emoji: "🎯",
    title: "Choose Your Skill",
    description: "Pick from Python, MySQL, Web Design, Django, and more. Each skill is a game-like adventure.",
  },
  {
    number: "02",
    emoji: "📖",
    title: "Learn Through Stories",
    description: "No boring lectures. Each concept is taught through engaging stories and real-world scenarios.",
  },
  {
    number: "03",
    emoji: "🎮",
    title: "Complete Challenges",
    description: "Practice with mini-challenges after each lesson. Earn points and unlock new levels.",
  },
  {
    number: "04",
    emoji: "🏆",
    title: "Get Certified",
    description: "Complete the journey and get a certificate. Show off your skills to employers!",
  },
];

const comparisons = [
  { feature: "Price", us: "₹99 - ₹299", others: "₹5,000 - ₹50,000" },
  { feature: "Language", us: "Telugu + English", others: "English Only" },
  { feature: "Format", us: "Story-driven, Gamified", others: "Long Video Lectures" },
  { feature: "Duration", us: "15-30 min/day", others: "2-4 hours/day" },
  { feature: "Support", us: "Sensei + Community", others: "Limited/None" },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">How </span>
            <span className="text-gradient">It Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learning shouldn't feel like a chore. Here's how we make skill-building fun.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <div className="game-card p-6 text-center relative z-10">
                <div className="text-xs text-primary font-bold mb-2">{step.number}</div>
                <div className="text-4xl mb-4">{step.emoji}</div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
              <span className="text-foreground">Why Choose </span>
              <span className="text-gradient">Skill Saga?</span>
            </h3>
            <p className="text-muted-foreground">See how we compare to expensive courses</p>
          </div>

          <div className="game-card overflow-hidden">
            <div className="grid grid-cols-3 bg-primary/10 p-4 font-display font-bold text-sm">
              <div className="text-muted-foreground">Feature</div>
              <div className="text-primary text-center">Skill Saga</div>
              <div className="text-muted-foreground text-center">Others</div>
            </div>
            {comparisons.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 p-4 text-sm ${index % 2 === 0 ? 'bg-card/50' : ''}`}
              >
                <div className="text-foreground font-medium">{row.feature}</div>
                <div className="text-primary text-center font-medium">{row.us}</div>
                <div className="text-muted-foreground text-center">{row.others}</div>
              </div>
            ))}
          </div>

          {/* Sensei Comment */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Sensei expression="thinking" size="sm" showBubble={false} />
            <p className="text-muted-foreground italic text-sm">
              "Quality learning shouldn't cost a fortune ra..."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
