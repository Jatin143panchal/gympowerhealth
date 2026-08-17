import { motion } from "framer-motion";
import founderImage from "@/IMG_9438.JPG";
import trainer2 from "@/assets/trainer-2.jpg";   // Club Manager Sumit
import trainer3 from "@/assets/trainer-3.jpg";   // Assistant Manager Satyam

const trainers = [
  {
    name: "Deepak Sharma",
    role: "Owner • Power Health Gym & Wellness Centre",
    image: founderImage,
    specialties: [
      "15+ Years Experience",
      "Personal Training Specialist",
      "Weight Loss & Post-Natal Weight Loss Expert",
      "Certified Dietician & Nutrition Coach",
      "Mr. North India 2018 Silver Medal (BBSA)",
      "2× Jerai & 4× Sheru Classic Athlete",
      "4× Fit Factor Body Power Finalist",
      "Growth & Strength Exercise Expert for Teenagers",
    ],
  },
  {
    name: "Sumit",
    role: "Club Manager",
    image: trainer2,
    specialties: [
      "Gym Operations Management",
      "Member Experience & Retention",
      "Staff Coordination",
      "Facility & Equipment Oversight",
    ],
  },
  {
    name: "Satyam",
    role: "Assistant Manager",
    image: trainer3,
    specialties: [
      "Daily Operations Support",
      "Member Support & Queries",
      "Class & Schedule Coordination",
      "Front Desk & Service Excellence",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function TrainersSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Green glow background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
            Meet Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4 text-white">
            OUR <span className="text-green-400">TEAM</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Led by our experienced owner and supported by dedicated club managers who ensure smooth operations and the best member experience.
          </p>
        </motion.div>

        {/* Trainers Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.name}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group rounded-2xl overflow-hidden border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.15)] bg-black"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">
                  {trainer.name}
                </h3>
                <p className="text-green-400 text-sm font-semibold mb-3">
                  {trainer.role}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-black border border-green-500/30 text-green-400"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  From beginners to advanced athletes, our team designs safe and
                  effective programs tailored to your goals so you see real progress in
                  strength, stamina and physique.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
