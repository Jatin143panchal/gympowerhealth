import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MEMBERSHIP_PLANS } from "@/lib/membership";

// Common services from Power Health flyer – added to ALL packages
const commonServices = [
  "50+ Premium & Advanced Equipment",
  "8000 Sq. Ft. Spacious Workout Area",
  "2 Floor Access for Better Workout",
  "Steam & Shower Facility",
  "Advanced Treadmill + BMI / Height / Weight & Goal Setting",
  "Free BMI Assessment",
  "Personalized Diet Plan & Workout Plan",
  "One-to-One Personal Training",
  "General Training",
  "Certified & Experienced Trainers",
  "Free Parking",
  "Group Activities – Yoga, Zumba, Aerobics",
  "Advance Fitness Classes – HIIT, Boxing/Plank, Fat Loss/Weight Loss, Flexibility/Mobility, Hyrox Class, Stepper Session",
];

const plans = [
  {
    ...MEMBERSHIP_PLANS[0],
    name: "3 Months",
    description: "Perfect starter plan",
    features: [...commonServices],
  },
  {
    ...MEMBERSHIP_PLANS[1],
    name: "6 Months",
    description: "Most popular choice",
    popular: true,
    features: [...commonServices],
  },
  {
    ...MEMBERSHIP_PLANS[2],
    name: "12 Months",
    description: "Best value & maximum results",
    features: [...commonServices],
  },
];

export default function Membership() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
              Membership Plans
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-3 mb-4">
              CHOOSE YOUR <span className="text-green-400">PLAN</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Flexible membership options designed to fit your lifestyle and
              help you achieve your fitness goals. All packages include every
              Power Health service listed below.
            </p>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative rounded-2xl p-8 transition-all duration-300 bg-black border",
                    plan.popular
                      ? "border-green-500 scale-105 shadow-[0_0_35px_rgba(34,197,94,0.4)]"
                      : "border-green-500/20 hover:border-green-500/50"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-green-500 text-black text-xs font-bold uppercase">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {plan.description}
                    </p>

                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-gray-400">₹</span>
                      <span className="text-5xl font-extrabold text-green-400">
                        {plan.priceFormatted}
                      </span>
                      <span className="text-gray-400">/person</span>
                    </div>

                    {plan.couplePrice && (
                      <p className="text-sm text-gray-400 mt-2">
                        Couple: ₹{plan.couplePrice}
                      </p>
                    )}
                    {plan.groupPrice && (
                      <p className="text-sm text-gray-400">
                        Group (4): ₹{plan.groupPrice}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/join">
                    <Button
                      size="lg"
                      className={cn(
                        "w-full font-bold transition-all duration-300",
                        plan.popular
                          ? "bg-green-500 text-black hover:bg-green-600"
                          : "bg-black border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
                      )}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black border-t border-green-500/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="text-green-400">Questions</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "Can I cancel my membership anytime?",
                  a: "Yes, you can cancel your membership with a 30-day notice.",
                },
                {
                  q: "Is there a joining fee?",
                  a: "A one-time enrollment fee may apply for new members.",
                },
                {
                  q: "Can I freeze my membership?",
                  a: "Yes, you can freeze your membership for medical or travel reasons.",
                },
                {
                  q: "Do you offer family discounts?",
                  a: "Yes! Special discounts are available for family plans.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="p-6 rounded-xl bg-black border border-green-500/20"
                >
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
