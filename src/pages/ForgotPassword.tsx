import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://gympowerhealth.com/reset-password",
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      setSubmitted(true);
    }

    setIsLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(34,197,94,0.6)]">
            <Mail className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">Check Your Email</h1>
          <p className="text-gray-400 mb-8">
            We've sent password reset instructions to <span className="text-green-400 font-medium">{email}</span>
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
            className="border-green-500 text-green-400 hover:bg-green-500/10"
          >
            Back to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <img src={logo} alt="Power Health" className="w-10 h-10 object-contain" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-green-400">
              POWER HEALTH
            </span>
            <span className="text-xs text-green-500 font-semibold -mt-1">GYM & WELLNESS</span>
          </div>
        </Link>

        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Forgot Password</h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-black border-green-500/30 focus:border-green-400 text-white"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-500 text-black hover:bg-green-600 font-bold shadow-[0_0_25px_rgba(34,197,94,0.5)]" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Instructions"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
