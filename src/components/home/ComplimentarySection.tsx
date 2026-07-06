import { motion } from "framer-motion";
import {
  Dumbbell,
  Clock,
  Flame,
  ShowerHead,
  Car,
  CupSoda,
  HeartPulse,
  Apple,
} from "lucide-react";

const facilities = [
  {
    icon: Flame,
    title: "Modern BCA Machine",
  },
  {
    icon: Dumbbell,
    title: "First 10 Training Sessions Free With Owner",
  },
  {
    icon: Clock,
    title: "24×7 Open | Unlimited Access",
  },
  {
    icon: Dumbbell,
    title: "25+ Strength & 15+ Cardio Machines",
  },
  {
    icon: ShowerHead,
    title: "Shower, Steam & Clean Washrooms",
  },
  {
    icon: Car,
    title: "Pick & Drop Available Within 3 KM",
  },
  {
    icon: CupSoda,
    title: "Healthy Drinks On Us",
  },
  {
    icon: HeartPulse,
    title: "Physiotherapist Support",
  },
  {
    icon: Apple,
    title: "Dietitian Support",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ComplimentarySection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Green Glow Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
            Complimentary Facilities
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4 text-white">
            WHAT YOU <span className="text-green-400">GET FREE</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience premium fitness with exclusive complimentary facilities
            designed to give you the ultimate gym experience.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {facilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-black to-zinc-900 border border-green-500/20 hover:border-green-500 transition-all shadow-[0_0_25px_rgba(34,197,94,0.1)] hover:shadow-[0_0_35px_rgba(34,197,94,0.3)]"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-500/10 border border-green-500/30 mb-5 group-hover:bg-green-500 transition">
                  <Icon className="w-6 h-6 text-green-400 group-hover:text-black transition" />
                </div>

                <h3 className="text-white font-semibold text-lg leading-snug">
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
