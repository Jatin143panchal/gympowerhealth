import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden bg-black">
      {/* Green Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] 
                      bg-green-500/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
            READY TO <span className="text-green-400">TRANSFORM?</span>
          </h2>

          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of members who already started their fitness journey.
            Your transformation starts <span className="text-green-400 font-semibold">today</span>.
          </p>

          <div className="flex justify-center">
            <Link to="/contact">
              <Button
                size="xl"
                variant="outline"
                className="border-green-500/40 text-green-400
                           hover:bg-green-500 hover:text-black
                           transition-all"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
