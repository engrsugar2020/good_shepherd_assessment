import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Clock, Star, ArrowRight, Phone, CheckCircle } from "lucide-react";
import Newsletter from "@/components/Newsletter";

const HERO_IMAGE = "/manus-storage/meet_the_team_v3_3f4f8fbc.png";
const COMPANIONSHIP_IMAGE = "/manus-storage/companionship_care_23d4f34f.png";
const DEMENTIA_IMAGE = "/manus-storage/dementia_care_02fe9ada.png";
const RESPITE_IMAGE = "/manus-storage/respite_care_39d20f5c.png";

const services = [
  {
    title: "Dementia Care",
    description: "Person-centred care focused on dignity, routine, and cognitive stimulation in a familiar environment.",
    icon: Heart,
    href: "/services/dementia-care",
    image: DEMENTIA_IMAGE,
  },
  {
    title: "Respite Care",
    description: "Giving family caregivers the break they deserve while ensuring your loved one is safe and happy.",
    icon: Clock,
    href: "/services/respite-care",
    image: RESPITE_IMAGE,
  },
  {
    title: "Companionship",
    description: "Genuine friendship and social connection that makes every day brighter and combats loneliness.",
    icon: Users,
    href: "/services/companionship",
    image: COMPANIONSHIP_IMAGE,
  },
  {
    title: "Live-In Care",
    description: "24/7 dedicated support in the comfort of home, providing round-the-clock peace of mind.",
    icon: Shield,
    href: "/services/live-in-care",
  },
  {
    title: "Post-Hospital Recovery",
    description: "Expert support to help you recover safely at home after a hospital stay or surgery.",
    icon: Heart,
    href: "/services/post-hospital-recovery",
  },
  {
    title: "Complex Clinical Care",
    description: "Specialist nursing-level care delivered with compassion for complex health conditions.",
    icon: Shield,
    href: "/services/complex-clinical-care",
  },
];

const stats = [
  { value: "4.8/5", label: "Homecare.co.uk Rating" },
  { value: "10+", label: "Years Combined Experience" },
  { value: "24/7", label: "Support Available" },
  { value: "100%", label: "Care Inspectorate Compliant" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--purple-deep)] via-[var(--purple-dark)] to-[var(--purple-primary)]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--gold-primary)] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--purple-light)] rounded-full blur-3xl"></div>
        </div>
        <div className="container relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
                <Star className="w-4 h-4 text-[var(--gold-primary)]" />
                <span className="text-sm text-white/90">Rated 4.8/5 on Homecare.co.uk</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Care That Adapts{" "}
                <span className="text-[var(--gold-primary)]">To Your Life</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
                Compassionate, person-centred home care across Glasgow and East Dunbartonshire. 
                We treat every client as if they were our own family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/assessment">
                  <Button size="lg" className="bg-[var(--gold-primary)] hover:bg-[var(--gold-dark)] text-[var(--purple-deep)] font-bold text-base px-8">
                    Free Care Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+447947962839">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 bg-transparent">
                    <Phone className="w-5 h-5 mr-2" />
                    Call 07947 962839
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[var(--gold-primary)]" /> No obligation</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[var(--gold-primary)]" /> Response within 2 hours</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-[var(--gold-primary)]/20 rounded-2xl blur-xl"></div>
                <img
                  src={HERO_IMAGE}
                  alt="Good Shepherd HomeCare Ltd Team"
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[var(--purple-primary)]">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24 bg-[var(--purple-lightest)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--purple-primary)] mb-4">Our Care Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From companionship to complex clinical care, we provide a full spectrum of home care services tailored to your individual needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href}>
                <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border hover:border-[var(--gold-primary)]/50 h-full cursor-pointer">
                  {service.image && (
                    <div className="mb-4 rounded-lg overflow-hidden aspect-[16/9]">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--purple-lightest)] flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-[var(--purple-primary)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-[var(--purple-primary)] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--purple-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--purple-primary)] mb-6">
                Why Families Trust <span className="text-[var(--gold-primary)]">Good Shepherd</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We understand the anxiety of welcoming a carer into your home. That is why our vetting process is among the strictest in the industry — every applicant must meet the Good Shepherd standard.
              </p>
              <div className="space-y-4">
                {[
                  "Face-to-face assessments with practical care simulations",
                  "Triple reference checks — past employers and character witnesses",
                  "Enhanced PVG checks through Disclosure Scotland",
                  "Mandatory monthly training workshops",
                  "24/7 supervision and support team",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline" className="border-[var(--purple-primary)] text-[var(--purple-primary)] hover:bg-[var(--purple-lightest)]">
                    Learn About Our Standards
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[var(--purple-lighter)] rounded-2xl -rotate-3"></div>
              <img
                src="/manus-storage/training_workshop_691de047.png"
                alt="Good Shepherd Training"
                className="relative rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[var(--purple-deep)] to-[var(--purple-primary)] py-16">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Find the Right Care?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start with a free, no-obligation care assessment. Just a friendly conversation to understand your family's needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" className="bg-[var(--gold-primary)] hover:bg-[var(--gold-dark)] text-[var(--purple-deep)] font-bold text-base px-8">
                Request Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+447947962839">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 bg-transparent">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
