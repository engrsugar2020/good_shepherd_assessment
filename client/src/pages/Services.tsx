import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    slug: "dementia-care",
    title: "Dementia Care",
    description: "Person-centred care focused on dignity, routine, and cognitive stimulation. Our specialist-trained carers help maintain independence in a familiar environment.",
    image: "/manus-storage/dementia_care_02fe9ada.png",
  },
  {
    slug: "respite-care",
    title: "Respite Care",
    description: "Giving family caregivers the break they deserve. We step in with compassionate, professional care so you can rest and recharge.",
    image: "/manus-storage/respite_care_39d20f5c.png",
  },
  {
    slug: "companionship",
    title: "Companionship",
    description: "Genuine friendship and social connection that combats loneliness and makes every day brighter. More than care — it's friendship.",
    image: "/manus-storage/companionship_care_23d4f34f.png",
  },
  {
    slug: "live-in-care",
    title: "Live-In Care",
    description: "24/7 dedicated support in the comfort of home. A consistent, trusted carer providing round-the-clock peace of mind.",
    image: "/manus-storage/park_walk_687bf40e.png",
  },
  {
    slug: "post-hospital-recovery",
    title: "Post-Hospital Recovery",
    description: "Expert support to help you recover safely at home after a hospital stay. We prioritise hospital discharges to ensure safety.",
    image: "/manus-storage/day_in_the_life_b3b6b710.png",
  },
  {
    slug: "complex-clinical-care",
    title: "Complex Clinical Care",
    description: "Specialist nursing-level care delivered with compassion for complex health conditions requiring clinical expertise.",
    image: "/manus-storage/why_i_care_reel_96a8380a.png",
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--purple-deep)] to-[var(--purple-primary)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Care Services</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            From companionship to complex clinical care, we provide a full spectrum of home care services tailored to your individual needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg hover:border-[var(--gold-primary)]/50 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-[var(--purple-primary)] transition-colors mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--purple-primary)]">
                      Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--purple-lightest)] py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-[var(--purple-primary)] mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start with a free care assessment. Our team will help you understand what type of care is best suited for your situation.
          </p>
          <Link href="/assessment">
            <Button size="lg" className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white font-semibold gap-2">
              Request Free Assessment <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
