import { Dumbbell, Heart, Users, Zap, Target, Timer, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ComplimentarySection } from "@/components/home/ComplimentarySection";

const services = [
  {
    icon: Dumbbell,
    title: "Weight Training",
    description: "Build strength and muscle with premium equipment and expert guidance.",
  },
  {
    icon: Heart,
    title: "Cardio Zone",
    description: "Advanced cardio machines for heart health and endurance.",
  },
  {
    icon: Users,
    title: "Group Classes",
    description: "High-energy Zumba, HIIT, Yoga & more with expert coaches.",
  },
  {
    icon: Target,
    title: "Personal Training",
    description: "1-on-1 coaching with certified trainers for faster results.",
  },
  {
    icon: Zap,
    title: "CrossFit",
    description: "High-intensity functional workouts to push your limits.",
  },
  {
    icon: Timer,
    title: "24/7 Access",
    description: "Train anytime with round-the-clock gym access.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ServicesSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">

      {/* Green Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-green-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-green-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            OUR{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              SERVICES
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to crush your fitness goals under one roof
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              className={cn(
                "group p-8 rounded-2xl border transition-all duration-300",
                "bg-black border-green-500/20 hover:border-green-500/50",
                "hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]"
              )}
            >
              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center mb-6
                           shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <service.icon className="w-7 h-7 text-black" />
              </motion.div>

              {/* Content */}
              <h3 className="text-white text-xl font-bold mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Complimentary Section Added Below Services */}
      <ComplimentarySection />
    </section>
  );
}
