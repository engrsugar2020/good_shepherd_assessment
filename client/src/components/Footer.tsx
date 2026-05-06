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
              <img src={LOGO_URL} alt="The Good Shepherd Home Care Ltd" className="h-12 w-12 rounded-full object-cover" />
              <div>
                  <span className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Good Shepherd
                </span>
                <span className="block text-xs text-[var(--gold-primary)] tracking-wider uppercase">Home Care Ltd</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Compassionate, person-centred home care across Glasgow and East Dunbartonshire. Care that adapts to your life.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/tgs.homecare/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--gold-primary)] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/tgshomecare" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--gold-primary)] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
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
                <a href="tel:+447947962839" className="hover:text-white transition-colors">07947 962839</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--gold-primary)]" />
                <a href="mailto:info@tsghomecare.com" className="hover:text-white transition-colors">info@tsghomecare.com</a>
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
          <p>&copy; {new Date().getFullYear()} The Good Shepherd Home Care Ltd. All rights reserved.</p>
          <p>Serving Glasgow &amp; East Dunbartonshire with compassion.</p>
        </div>
      </div>
    </footer>
  );
}
