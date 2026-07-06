import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Clock, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-gym.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="GymHub Fitness"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Green + Black Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-green-950/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-28 max-w-5xl mx-auto">

        {/* Top 24/7 Highlight */}
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full border border-green-500/60 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(34,197,94,0.6)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Clock className="w-5 h-5 text-green-400" />
          <span className="text-sm md:text-base font-extrabold tracking-[0.2em] text-green-400">
            24/7 ACCESS GYM
          </span>
        </motion.div>

        {/* Badges Row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/30 bg-black/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">
              Power Health Gym & Wellness Centre
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">
              Pickup & Drop Service (within 3 km)
            </span>
          </div>
          <a
            href="https://www.instagram.com/p/DTcuRWOgRTN/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/30 bg-black/40 backdrop-blur-md hover:bg-green-500/20 transition-colors"
          >
            <Instagram className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Follow Us</span>
          </a>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-white font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          POWER HEALTH <br />
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            GYM & WELLNESS CENTRE
          </span>
        </motion.h1>

        <motion.p
          className="text-green-400 font-semibold tracking-[0.25em] uppercase text-xs md:text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          BY DEEPAK SHARMA
        </motion.p>

        {/* Sub Text */}
        <motion.p
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Build strength, confidence, and discipline with expert coaching,
          next‑level equipment, and a{" "}
          <span className="text-green-400 font-semibold">
            12‑Month Transformation Plan at ₹27,999
          </span>{" "}
          designed for real results.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/membership">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg shadow-[0_0_25px_rgba(34,197,94,0.5)]">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </Link>

          
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[
            { value: "10K+", label: "Members" },
            { value: "25+", label: "Trainers" },
            { value: "15+", label: "Years" },
            { value: "24/7", label: "Open Always" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400">
                {item.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-green-500/40 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-green-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
