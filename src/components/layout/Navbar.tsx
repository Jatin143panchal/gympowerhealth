import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Instagram, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png"; 

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Trainers", path: "/trainers" },
  { name: "Membership", path: "/membership" },
  { name: "Join", path: "/join" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-green-500/20 h-16 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
          : "bg-transparent h-20"
      )}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className={cn(
                "rounded-lg flex items-center justify-center transition-all duration-300",
                scrolled ? "w-9 h-9" : "w-11 h-11",
                "bg-black shadow-[0_0_30px_rgba(34,197,94,0.7)] group-hover:scale-110"
              )}
            >
              <img
                src={logo}
                alt="Power Health Gym & Wellness Centre"
                className="w-7 h-7 object-contain animate-pulse"
              />
            </div>
            <div className="leading-tight">
              <span className="block text-white text-lg font-extrabold tracking-wide">
                POWER HEALTH GYM
              </span>
              <span className="text-xs text-green-400 font-semibold">
                WELLNESS CENTRE · BY DEEPAK SHARMA
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative text-sm font-semibold transition-colors",
                    active
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400"
                  )}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* 24/7 Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
              <Clock className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs font-bold text-green-400">24/7 OPEN</span>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/p/DTcuRWOgRTN/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all group"
            >
              <Instagram className="w-4 h-4 text-green-400 group-hover:text-black" />
            </a>
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <Link to={isAdmin ? "/admin" : "/dashboard"}>
                  <Button
                    size="sm"
                    className="bg-green-500 text-black font-semibold hover:bg-green-600 shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                  >
                    {isAdmin ? "Admin Panel" : "Dashboard"}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/join">
                  <Button
                    size="sm"
                    className="bg-green-500 text-black font-semibold hover:bg-green-600 shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                  >
                    Join
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-green-400"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden text-green-400 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden mt-3 rounded-xl bg-black border border-green-500/20 p-4 shadow-[0_0_30px_rgba(34,197,94,0.25)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-semibold py-2",
                    location.pathname === link.path
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile 24/7 + Instagram */}
              <div className="flex items-center gap-3 py-3 border-t border-green-500/20">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                  <Clock className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-bold text-green-400">24/7 OPEN</span>
                </div>
                <a
                  href="https://www.instagram.com/p/DTcuRWOgRTN/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-bold text-green-400">Instagram</span>
                </a>
              </div>

              <div className="flex gap-3 pt-3 border-t border-green-500/20">
                {user ? (
                  <>
                    <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-green-500 text-black font-semibold hover:bg-green-600">
                        {isAdmin ? "Admin Panel" : "Dashboard"}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 border-red-500/40 text-red-400"
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/join" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button
                        className="w-full bg-green-500 text-black font-semibold hover:bg-green-600"
                      >
                        Join
                      </Button>
                    </Link>
                    <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-green-500/40 text-green-400"
                      >
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
