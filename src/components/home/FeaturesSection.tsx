const features = [
  {
    emoji: "🎮",
    title: "Gamified Learning",
    description: "Progress through levels, earn XP, unlock achievements. Learning feels like playing your favorite game.",
  },
  {
    emoji: "📚",
    title: "Story-Driven Lessons",
    description: "Every concept is wrapped in an engaging story. No dry documentation or boring lectures.",
  },
  {
    emoji: "🗣️",
    title: "Telugu + English",
    description: "Learn in the language you're comfortable with. Mix of Telugu and English for better understanding.",
  },
  {
    emoji: "⚡",
    title: "Bite-sized Content",
    description: "15-20 minute lessons that fit your schedule. Learn during commute, breaks, or before bed.",
  },
  {
    emoji: "🎯",
    title: "Practical Challenges",
    description: "Apply what you learn immediately with hands-on coding challenges and mini-projects.",
  },
  {
    emoji: "🤝",
    title: "Community Support",
    description: "Join thousands of learners. Get help, share progress, and celebrate wins together.",
  },
  {
    emoji: "📱",
    title: "Mobile Friendly",
    description: "Learn on any device. Our platform works perfectly on phones, tablets, and computers.",
  },
  {
    emoji: "🏆",
    title: "Certificates",
    description: "Get verified certificates upon completion. Add them to LinkedIn and impress employers.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">Built Different, </span>
            <span className="text-gradient">Built Better</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed to make your learning journey enjoyable and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.emoji}
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
