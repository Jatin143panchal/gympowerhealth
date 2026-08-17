import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-green-500/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Power Health Gym"
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-wide">
                  POWER HEALTH
                </span>
                <span className="text-xs text-green-400 font-semibold -mt-1">
                  GYM & WELLNESS
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              Transform your body, transform your life. Train hard. Stay strong. 💪
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/powerhealthgym?igsh=ejllYXFrMzViaXp0&utm_source=ig_contact_invite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-green-500 transition-all group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-black" />
              </a>
              <a
                href="https://www.facebook.com/powerhealthgym"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-green-500 transition-all group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-black" />
              </a>
              <a
                href="https://twitter.com/powerhealthgym"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-green-500 transition-all group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-black" />
              </a>
              <a
                href="https://www.youtube.com/@powerhealthgym"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-green-500 transition-all group"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Trainers", path: "/trainers" },
                { name: "Membership", path: "/membership" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Working Hours</h3>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
              <div className="text-center">
                <span className="text-green-400 font-extrabold text-3xl tracking-wider">
                  24/7
                </span>
                <p className="text-green-400 font-semibold text-sm mt-1">
                  ALWAYS OPEN
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex justify-between items-center">
                <span>Monday – Sunday</span>
                <span className="text-green-400 font-bold">No Off Days</span>
              </li>
              <li className="text-green-400 font-semibold flex items-center gap-1">
                <span>No Holidays</span>•<span>Beast Mode ON 🔥</span>
              </li>
            </ul>

            <a
              href="https://www.instagram.com/p/DTcuRWOgRTN/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
            >
              <Instagram className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-semibold text-pink-300">
                Follow @gympowerhealth_official
              </span>
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                <span className="text-gray-400">
                  10th & 11th Floor, Fusion Lab Building,
                  Gaur City 1, Greater Noida (West),
                  Gautam Buddha Nagar, Uttar Pradesh - 201009
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919217441307"
                    className="text-gray-400 hover:text-green-400"
                  >
                    +91 92174 41307
                  </a>
                  <a
                    href="tel:+919217451307"
                    className="text-gray-400 hover:text-green-400"
                  >
                    +91 92174 51307
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400" />
                <a
                  href="mailto:deepaksharma2020@gmail.com"
                  className="text-gray-400 hover:text-green-400"
                >
                  deepaksharma2020@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Power Health Gym & Wellness Centre. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link
              to="/privacy-policy"
              className="hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="hover:text-green-400 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
