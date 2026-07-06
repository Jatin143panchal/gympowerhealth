import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Dumbbell,
  Heart,
  Users,
  Zap,
  Target,
  Timer,
  Waves,
  Flame,
} from "lucide-react";

import { ComplimentarySection } from "@/components/home/ComplimentarySection"; // ✅ Import added

const services = [
  {
    icon: Dumbbell,
    title: "Weight Training",
    description:
      "Build strength and muscle mass with our comprehensive weight training programs and premium equipment.",
    details: [
      "Free weights & machines",
      "Olympic lifting platforms",
      "Personalized programs",
      "Form correction sessions",
    ],
  },
  {
    icon: Heart,
    title: "Cardio Zone",
    description:
      "State-of-the-art cardio machines for optimal heart health, endurance, and calorie burning.",
    details: [
      "Treadmills & ellipticals",
      "Rowing machines",
      "Spin bikes",
      "Stair climbers",
    ],
  },
  {
    icon: Users,
    title: "Group Classes",
    description:
      "High-energy group sessions led by expert instructors to keep you motivated.",
    details: ["Zumba & dance", "Yoga & Pilates", "Spinning", "Boot camps"],
  },
  {
    icon: Target,
    title: "Personal Training",
    description:
      "One-on-one sessions with certified trainers focused on your personal goals.",
    details: [
      "Custom workout plans",
      "Nutrition guidance",
      "Progress tracking",
      "Goal-based training",
    ],
  },
  {
    icon: Zap,
    title: "CrossFit",
    description:
      "High-intensity functional workouts to build strength, speed, and endurance.",
    details: ["WOD sessions", "Olympic lifts", "Gymnastics", "Metcon training"],
  },
  {
    icon: Timer,
    title: "HIIT Training",
    description:
      "Short, intense workouts designed to burn fat and boost metabolism.",
    details: ["30-min sessions", "Full-body focus", "Fat burn", "Multiple levels"],
  },
  {
    icon: Waves,
    title: "Recovery & Wellness",
    description:
      "Recover faster and feel better with our premium recovery facilities.",
    details: ["Steam & sauna", "Massage therapy", "Stretch zone", "Cold therapy"],
  },
  {
    icon: Flame,
    title: "Nutrition Coaching",
    description:
      "Expert diet planning to fuel workouts and achieve your physique goals.",
    details: ["Custom meal plans", "Macro tracking", "Supplement advice", "Weekly reviews"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-3 mb-4">
              OUR <span className="text-green-400">SERVICES</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Premium training, expert guidance, and world-class facilities —
              everything under one roof.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group p-8 rounded-2xl bg-black border border-green-500/20 hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-8 h-8 text-black" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{service.description}</p>

                      <ul className="grid grid-cols-2 gap-2">
                        {service.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm text-gray-300"
                          >
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ Complimentary Facilities Section */}
        <ComplimentarySection />
      </main>

      <Footer />
    </div>
  );
}
