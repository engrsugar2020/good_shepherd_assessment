import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const serviceAreas = [
  { name: "Glasgow", description: "City centre and surrounding areas" },
  { name: "East Dunbartonshire", description: "Bishopbriggs, Kirkintilloch, Lenzie" },
  { name: "Partick", description: "Partick & West End" },
  { name: "Bearsden and Milngavie", description: "Including surrounding suburbs" },
];

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--purple-deep)] to-[var(--purple-primary)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We are here to help you navigate this. Choosing home care is a deeply personal decision, and we will guide you through it.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--purple-primary)] mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-[var(--purple-lightest)] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[var(--purple-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a href="tel:+447947962839" className="text-[var(--purple-primary)] font-medium text-lg hover:underline">07947 962839</a>
                    <p className="text-sm text-muted-foreground mt-1">Available 24/7 for emergencies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-[var(--purple-lightest)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[var(--purple-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:info@tsghomecare.com" className="text-[var(--purple-primary)] font-medium hover:underline">info@tsghomecare.com</a>
                    <p className="text-sm text-muted-foreground mt-1">We respond within 2 hours during office hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-[var(--purple-lightest)] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[var(--purple-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                    <p className="text-foreground font-medium">Monday - Friday: 8am - 6pm</p>
                    <p className="text-sm text-muted-foreground mt-1">24/7 emergency support available</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/assessment">
                  <Button className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white font-semibold gap-2">
                    Request Free Care Assessment <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Map & Service Areas */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--purple-primary)] mb-6">Service Areas</h2>
              {/* Embedded Map */}
              <div className="rounded-xl overflow-hidden shadow-sm border border-border mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71598.7!2d-4.35!3d55.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488815562056ceeb%3A0x71e683b805ef511e!2sGlasgow%2C%20UK!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Good Shepherd Home Care Ltd Service Area"
                ></iframe>
              </div>

              {/* Service Areas List */}
              <div className="space-y-3">
                {serviceAreas.map((area) => (
                  <div key={area.name} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-border">
                    <MapPin className="w-5 h-5 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{area.name}</h4>
                      <p className="text-xs text-muted-foreground">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
