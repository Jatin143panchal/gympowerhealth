import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MEMBERSHIP_PLANS } from "@/lib/membership";

// All services from the Power Health flyer – included in EVERY package
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
    features: [
      ...commonServices,
    ],
  },
  {
    ...MEMBERSHIP_PLANS[1],
    name: "6 Months",
    description: "Most popular choice",
    popular: true,
    features: [
      ...commonServices,
    ],
  },
  {
    ...MEMBERSHIP_PLANS[2],
    name: "12 Months",
    description: "Best value & maximum results",
    features: [
      ...commonServices,
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function MembershipSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Green Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-green-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-green-400 font-semibold tracking-widest text-sm uppercase">
            Membership Plans
          </span>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mt-3">
            CHOOSE YOUR{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              PLAN
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            All packages include every Power Health service from the official flyer.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -12, scale: plan.popular ? 1.06 : 1.04 }}
              className={cn(
                "relative rounded-2xl p-8 border transition-all duration-300",
                plan.popular
                  ? "border-green-500 bg-gradient-to-b from-black to-green-950 shadow-[0_0_40px_rgba(34,197,94,0.35)]"
                  : "border-green-500/20 bg-black hover:border-green-500/50"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold uppercase bg-green-500 text-black shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-white text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-400 text-sm mt-2">{plan.description}</p>

                <div className="flex justify-center items-end gap-1 mt-4">
                  <span className="text-gray-400">₹</span>
                  <motion.span
                    className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
                    initial={{ scale: 0.7 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {plan.priceFormatted}
                  </motion.span>
                  <span className="text-gray-400 text-sm">/person</span>
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

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.6)] mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-black" />
                    </span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/join">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className={cn(
                      "w-full font-semibold",
                      plan.popular
                        ? "bg-green-500 text-black hover:bg-green-600 shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                        : "border border-green-500/40 text-green-400 bg-black hover:bg-green-500/10"
                    )}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
