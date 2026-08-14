import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    const whatsappNumber = "919217451307 "; // without +

    const text = `
Hello Power Health Gym,

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
    `;

    const encodedText = encodeURIComponent(text);

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // Direct redirect to WhatsApp (same tab)
    window.location.href = whatsappURL;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <section className="py-20 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-2 mb-4">
              CONTACT <span className="text-green-400">US</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">

              <div>
                <h2 className="text-3xl font-bold mb-8">
                  Get In <span className="text-green-400">Touch</span>
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Our Location",
                      text: `Building No./Flat No.: Flat No. 982, Avenue- 11
Name Of Premises/Building: GC-11
Road/Street: Gaur City 2, GH-03, Sec-16C
Locality/Sub Locality: Greater Noida West
City/Town/Village: Greater Noida
District: Gautambuddha
State: Uttar Pradesh
PIN Code: 201318`,
                    },
                    {
                      icon: Phone,
                      title: "Phone Number",
                      text: " 9217451307",
                    },
                    {
                      icon: Mail,
                      title: "Email Address",
                      text: "info@powerhealthgym.in",
                    },
                    {
                      icon: Clock,
                      title: "Working Hours",
                      text: "Open 24/7 • All Days",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-xl bg-black border border-green-500/20"
                    >
                      <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl overflow-hidden h-64 border border-green-500/20">
                  <iframe
                    src="https://www.google.com/maps?q=Gaur+City+1+Greater+Noida+West&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Power Health Gym Location"
                  />
                </div>
              </div>

              <div className="bg-black rounded-2xl p-8 border border-green-500/20">
                <h2 className="text-3xl font-bold mb-6">
                  Send <span className="text-green-400">Message</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      className="h-12 bg-black border-green-500/30 text-white"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />

                    <Input
                      type="email"
                      className="h-12 bg-black border-green-500/30 text-white"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Input
                    className="h-12 bg-black border-green-500/30 text-white"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  <Textarea
                    className="min-h-32 bg-black border-green-500/30 text-white resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-500 text-black hover:bg-green-600 font-bold"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
