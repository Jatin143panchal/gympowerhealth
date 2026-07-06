import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import founderImage from "@/IMG_9438.JPG";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function FounderSection() {
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
            About The Founder
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4 text-white">
            DEEPAK <span className="text-green-400">SHARMA</span>
          </h2>
        </motion.div>

        {/* Founder Layout */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* LEFT SIDE - IMAGE */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl overflow-hidden border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
          >
            <motion.img
              src={founderImage}
              alt="Deepak Sharma"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* RIGHT SIDE - CONTENT */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-white mb-2">
              Deepak Sharma
            </h3>
            <p className="text-green-400 font-semibold mb-4">
              Owner • Power Health Gym & Wellness Centre
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              With 15+ years of experience, Deepak Sharma is a certified
              personal trainer, dietician and transformation expert
              specializing in weight loss, post-natal fitness and structured
              strength programs for teenagers. He has guided hundreds of
              clients toward safe, sustainable results.
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                "15+ Years Experience",
                "Personal Training Specialist",
                "Weight Loss & Post-Natal Expert",
                "Certified Dietician",
                "Mr. North India 2018 Silver Medalist",
                "Jerai & Sheru Classic Athlete",
                "Fit Factor Body Power Finalist",
              ].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 text-sm rounded-full bg-black border border-green-500/30 text-green-400"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/p/DTcuRWOgRTN/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
