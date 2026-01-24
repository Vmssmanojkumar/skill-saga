import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Babai from "@/components/Babai";

const faqs = [
  {
    question: "Is this platform really affordable?",
    answer: "Absolutely! Our courses start at just ₹99. We believe quality education shouldn't cost a fortune. Plus, 30-40% of every course is completely FREE.",
  },
  {
    question: "Do I need prior coding experience?",
    answer: "Not at all! Our courses are designed for complete beginners. We start from the basics and build up gradually with story-driven lessons that make learning easy.",
  },
  {
    question: "How is this different from YouTube tutorials?",
    answer: "YouTube videos are often long, unstructured, and lack proper guidance. Our platform offers short, focused lessons with a clear learning path, challenges, and Babai to guide you every step.",
  },
  {
    question: "Can I learn in Telugu?",
    answer: "Yes! All our content is available in a mix of Telugu and English. We use simple language that's easy to understand, regardless of your background.",
  },
  {
    question: "How long does it take to complete a course?",
    answer: "Most courses can be completed in 3-6 weeks if you spend 15-30 minutes daily. But there's no rush – learn at your own pace!",
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes! Upon completing a course, you'll receive a verified certificate that you can add to your LinkedIn profile or resume.",
  },
  {
    question: "What if I get stuck on a lesson?",
    answer: "You can revisit any lesson anytime. Plus, our community forum and Babai's tips are always there to help you out.",
  },
  {
    question: "Can I access the content on mobile?",
    answer: "100%! Our platform is fully responsive. Learn on your phone during commute, on tablet at home, or on computer at work.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-foreground">Common </span>
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Got doubts? We've got answers. Here are the most frequently asked questions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="game-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <span className="font-display font-bold text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 pb-5' : 'max-h-0'
                }`}
              >
                <p className="px-5 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Babai Help */}
        <div className="flex items-center justify-center gap-4 mt-12 p-6 bg-card/50 rounded-2xl border border-border/50">
          <Babai expression="happy" size="sm" showBubble={false} />
          <div>
            <p className="text-foreground font-medium">Still have questions?</p>
            <p className="text-sm text-muted-foreground">
              Babai is always here to help! Join our community for instant support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
