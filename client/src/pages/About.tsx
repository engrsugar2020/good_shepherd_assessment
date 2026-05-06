import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Shield, Users, ArrowRight } from "lucide-react";

const TEAM_IMAGE = "/manus-storage/meet_the_team_v3_3f4f8fbc.png";
const TRAINING_IMAGE = "/manus-storage/training_workshop_691de047.png";
const WENDY_IMAGE = "/manus-storage/wendy_ejihkeme_f4306ac8.jpg";

const values = [
  { icon: Heart, title: "Compassion", description: "Every interaction is guided by genuine empathy and care for the individual." },
  { icon: Shield, title: "Trust", description: "We build trust through transparency, rigorous vetting, and consistent excellence." },
  { icon: Users, title: "Respect", description: "We honour the dignity and independence of every person we serve." },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--purple-deep)] to-[var(--purple-primary)] py-16 lg:py-20">
        <div className="container text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About The Good Shepherd Home Care Ltd</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Founded on the belief that home care should be built on compassion, trust, and genuine human connection — not just efficiency.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--purple-primary)] mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Good Shepherd Home Care Ltd was founded by Wendy Ejihkeme with a simple but powerful vision: to provide home care that truly adapts to the individual. Having witnessed first-hand the challenges families face when seeking quality care, Wendy set out to create a service that puts people first.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Today, we serve families across Glasgow, East Dunbartonshire, Partick, Bearsden and Milngavie with a diverse team of caregivers who bring warmth, professionalism, and genuine connection to every home they enter.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team reflects the rich diversity of the communities we serve — with English, African, and Asian carers who bring their unique cultural perspectives and shared commitment to exceptional care.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[var(--gold-primary)]/10 rounded-2xl rotate-2"></div>
              <img src={TEAM_IMAGE} alt="Our Diverse Care Team" className="relative rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-[var(--gold-primary)]/10 rounded-2xl rotate-2"></div>
              <img src={WENDY_IMAGE} alt="Wendy Ejihkeme, Founder" className="relative rounded-2xl shadow-lg w-full object-cover aspect-[3/4]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--purple-primary)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Meet Our Founder</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <span className="font-semibold text-foreground">Wendy Ejihkeme</span> founded The Good Shepherd Home Care Ltd with a clear mission: to transform home care by placing genuine human connection at its heart.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With years of experience in the care sector, Wendy recognised that families needed more than just a service provider — they needed a partner they could trust completely. This insight became the foundation of The Good Shepherd Home Care Ltd.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Wendy leads a team of dedicated professionals who share her vision of delivering compassionate, person-centred care that truly adapts to each individual's unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[var(--purple-lightest)]">
        <div className="container">
          <h2 className="text-3xl font-bold text-[var(--purple-primary)] text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8 text-center shadow-sm border border-border">
                <div className="w-16 h-16 rounded-full bg-[var(--purple-lightest)] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[var(--purple-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good Shepherd Vetting Standard */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img src={TRAINING_IMAGE} alt="Good Shepherd Training" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-[var(--purple-lightest)] rounded-full px-4 py-1.5 mb-4">
                <Shield className="w-4 h-4 text-[var(--purple-primary)]" />
                <span className="text-sm font-medium text-[var(--purple-primary)]">Industry-Leading Standards</span>
              </div>
              <h2 className="text-3xl font-bold text-[var(--purple-primary)] mb-6">The Good Shepherd Vetting Standard</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We understand the anxiety of welcoming a stranger into your home. That is why our vetting process is among the strictest in the industry — every applicant must meet the Good Shepherd standard.
              </p>
              <div className="space-y-4">
                {[
                  "Rigorous face-to-face assessments with practical care simulations",
                  "Triple reference checks — past employers and character witnesses",
                  "Enhanced PVG checks through Disclosure Scotland",
                  "Mandatory monthly training workshops on dementia, palliative care, and nutrition",
                  "Ongoing 24/7 supervision and support from our Glasgow-based hub",
                  "Regular performance reviews and client feedback integration",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[var(--purple-deep)] to-[var(--purple-primary)] py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join The Good Shepherd Family</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Whether you need care for a loved one or want to join our exceptional team, we would love to hear from you.
          </p>
          <Link href="/assessment">
            <Button size="lg" className="bg-[var(--gold-primary)] hover:bg-[var(--gold-dark)] text-[var(--purple-deep)] font-bold px-8">
              Request Free Assessment <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
