import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Instagram, Twitter, Linkedin } from "lucide-react";

import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";
import trainer3 from "@/assets/trainer-3.jpg";

const trainers = [
  {
    name: "Deepak Sharma",
    role: "Head Coach / Strength Training",
    image: trainer1,
    bio: "With over 15 years of experience in competitive bodybuilding and strength coaching, Marcus has helped hundreds of clients achieve their dream physiques.",
    specialties: ["Powerlifting", "Bodybuilding", "Nutrition", "Competition Prep"],
    certifications: ["NASM-CPT", "CSCS", "Precision Nutrition L2"],
  },
  {
    name: "General Trainer",
    role: "Fitness Director / HIIT Specialist",
    image: trainer2,
    bio: "A former professional dancer turned fitness expert, Sarah brings energy and creativity to every workout. Her dynamic approach keeps clients motivated and engaged.",
    specialties: ["HIIT", "CrossFit", "Dance Fitness", "Group Classes"],
    certifications: ["ACE-CPT", "CrossFit L2", "Zumba Instructor"],
  },
  {
    name: "General Trainer",
    role: "Personal Trainer / Sports Performance",
    image: trainer3,
    bio: "David specializes in athletic performance and has worked with professional athletes across multiple sports. His scientific approach ensures optimal results.",
    specialties: ["Athletic Training", "Conditioning", "Recovery", "Mobility"],
    certifications: ["NSCA-CSCS", "PES", "CES"],
  },
];

export default function Trainers() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-2 mb-4">
              EXPERT <span className="text-green-400">TRAINERS</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our certified professionals are dedicated to helping you reach your
              fitness goals with expert guidance.
            </p>
          </div>
        </section>

        {/* Trainers */}
        <section className="py-16">
          <div className="container mx-auto px-4 space-y-20">
            {trainers.map((trainer, index) => (
              <div
                key={trainer.name}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-2" : ""
                  } flex justify-center`}
                >
                  <div className="relative rounded-2xl overflow-hidden max-w-md border border-green-500/20">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl font-bold mb-1">
                    {trainer.name}
                  </h2>
                  <p className="text-green-400 font-medium mb-4">
                    {trainer.role}
                  </p>

                  <p className="text-gray-400 mb-6">
                    {trainer.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.specialties.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full bg-black border border-green-500/30 text-sm text-green-400"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social */}
                  <div className="flex gap-4">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded-full bg-black border border-green-500/30 flex items-center justify-center hover:bg-green-500 transition-all group"
                      >
                        <Icon className="w-5 h-5 text-green-400 group-hover:text-black" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
