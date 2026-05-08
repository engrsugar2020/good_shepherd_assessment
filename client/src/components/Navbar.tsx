import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOGO_URL = "/manus-storage/good_shepherd_logo_81767f4e.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="bg-[var(--purple-deep)] text-white text-sm py-1.5">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Rated 4.8/5 on Homecare.co.uk</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Care Inspectorate Registered</span>
          </div>
          <a href="tel:+447947962839" className="flex items-center gap-1.5 hover:text-[var(--gold-primary)] transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>07947 962839</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="The Good Shepherd Home Care Ltd" className="h-12 w-12 rounded-full object-cover" />
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-[var(--purple-primary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Good Shepherd
            </span>
            <span className="block text-xs text-muted-foreground tracking-wider uppercase">Home Care Ltd</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--purple-primary)] ${
                location === link.href ? "text-[var(--purple-primary)] border-b-2 border-[var(--gold-primary)] pb-0.5" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/assessment">
            <Button className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white font-semibold px-5">
              Free Care Assessment
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                  location === link.href
                    ? "bg-[var(--purple-lightest)] text-[var(--purple-primary)]"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/assessment" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white font-semibold mt-2">
                Free Care Assessment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
