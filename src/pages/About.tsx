              import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Clock, Target } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Members" },
  { icon: Award, value: "50+", label: "Expert Trainers" },
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Target, value: "95%", label: "Success Rate" },
];

const values = [
  {
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from our facilities to our training programs.",
  },
  {
    title: "Community",
    description:
      "We foster a supportive community where everyone feels welcome and motivated.",
  },
  {
    title: "Results",
    description:
      "We are committed to helping our members achieve real, lasting results.",
  },
  {
    title: "Innovation",
    description:
      "We continuously evolve our methods and facilities to stay at the forefront of fitness.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-2 mb-4">
              ABOUT <span className="text-green-400">GYM POWER HEALTH</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              More than just a gym – we're a community dedicated to helping you
              become the best version of yourself.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  OUR <span className="text-green-400">MISSION</span>
                </h2>
                <p className="text-gray-400 mb-4">
                  Founded in 2009, Gym Power Health started with a simple vision:
                  to create a fitness environment that combines world-class
                  facilities with genuine care for each member's success.
                </p>
                <p className="text-gray-400 mb-4">
                  Over the past 15 years, we've grown into a trusted fitness
                  destination, helping 10,000+ members transform their lives.
                </p>
                <p className="text-gray-400 mb-6">
                  Our certified trainers provide personalized guidance,
                  cutting-edge equipment, and a motivating environment.
                </p>
                <Link to="/membership">
                  <Button className="bg-green-500 text-black font-bold hover:bg-green-600">
                    Join Our Community
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-2xl bg-black border border-green-500/30 text-center hover:border-green-500 transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                      <stat.icon className="w-6 h-6 text-black" />
                    </div>
                    <div className="text-3xl font-extrabold text-green-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              OUR <span className="text-green-400">VALUES</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl bg-black border border-green-500/20 hover:border-green-500 transition"
                >
                  <h3 className="text-xl font-bold mb-3 text-green-400">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {value.description}
                  </p>
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
