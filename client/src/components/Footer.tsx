import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

const LOGO_URL = "/manus-storage/good_shepherd_logo_square_e9ed65ad.png";

export default function Footer() {
  return (
    <footer className="bg-[var(--purple-deep)] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Good Shepherd Home Care" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <span className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Good Shepherd
                </span>
                <span className="block text-xs text-[var(--gold-primary)] tracking-wider uppercase">Home Care</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Compassionate, person-centred home care across Glasgow and East Dunbartonshire. Care that adapts to your life.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[var(--gold-primary)] mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/services/dementia-care" className="hover:text-white transition-colors">Dementia Care</Link></li>
              <li><Link href="/services/respite-care" className="hover:text-white transition-colors">Respite Care</Link></li>
              <li><Link href="/services/companionship" className="hover:text-white transition-colors">Companionship</Link></li>
              <li><Link href="/services/live-in-care" className="hover:text-white transition-colors">Live-In Care</Link></li>
              <li><Link href="/services/post-hospital-recovery" className="hover:text-white transition-colors">Post-Hospital Recovery</Link></li>
              <li><Link href="/services/complex-clinical-care" className="hover:text-white transition-colors">Complex Clinical Care</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[var(--gold-primary)] mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--gold-primary)]" />
                <a href="tel:+447815493302" className="hover:text-white transition-colors">07815 493302</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--gold-primary)]" />
                <a href="mailto:thegoodshepherd.net@gmail.com" className="hover:text-white transition-colors">thegoodshepherd.net@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--gold-primary)] mt-0.5" />
                <span>Glasgow, East Dunbartonshire, Partick, Bearsden and Milngavie</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[var(--gold-primary)] mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/assessment" className="hover:text-white transition-colors">Free Care Assessment</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">Care Inspectorate Registered</p>
              <p className="text-xs text-white/50 mt-1">Rated 4.8/5 on Homecare.co.uk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Good Shepherd Home Care. All rights reserved.</p>
          <p>Serving Glasgow &amp; East Dunbartonshire with compassion.</p>
        </div>
      </div>
    </footer>
  );
}
