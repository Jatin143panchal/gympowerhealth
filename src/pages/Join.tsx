import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Info, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Join() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Create WhatsApp message and redirect directly
    const whatsappMessage = `🏋️‍♂️ *Power Health Gym - Join Request*\n\n*Name:* ${formData.name.trim()}\n*Phone:* ${formData.phone.trim()}\n${formData.email ? `*Email:* ${formData.email.trim()}\n` : ''}${formData.message ? `*Message:* ${formData.message.trim()}\n` : ''}\n\nI'm interested in joining Power Health Gym. Please contact me with membership options and details.`;
    
    // Normalize phone number for WhatsApp
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const whatsappPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    toast({
      title: "Opening WhatsApp",
      description: "Your message is ready to send on WhatsApp!",
    });
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 max-w-2xl">
          {/* Information banner - contact form type */}
          <div className="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/30 flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Info className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-green-400 mb-1">Want to join Power Health Gym?</h2>
              <p className="text-gray-300 text-sm">
                Fill the form below with your details. Our team will contact you with membership options and next steps. No signup required—just share your info and we’ll get back to you.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/30 text-center">
              <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-400 mb-2">Thank you!</h3>
              <p className="text-gray-300">
                Your request has been received. We’ll contact you shortly on the number/email you provided.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl p-8 border border-green-500/20 bg-black/50">
              <h1 className="text-2xl font-bold mb-6">
                Join <span className="text-green-400">request</span>
              </h1>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input
                    id="name"
                    className="h-12 bg-black border-green-500/30 text-white"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                  <Input
                    id="phone"
                    className="h-12 bg-black border-green-500/30 text-white"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-12 bg-black border-green-500/30 text-white"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message (optional)</Label>
                  <Textarea
                    id="message"
                    className="min-h-24 bg-black border-green-500/30 text-white resize-none"
                    placeholder="Any question or preferred plan..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-green-500 text-black hover:bg-green-600 font-bold"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit request
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
