import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, CheckCircle, Mail, ArrowRight } from "lucide-react";

const TRAINING_IMAGE = "/manus-storage/training_workshop_691de047.png";
const TEAM_IMAGE = "/manus-storage/meet_the_team_v3_3f4f8fbc.png";

const benefits = [
  "Competitive pay rates with regular reviews",
  "Flexible working hours to suit your lifestyle",
  "Comprehensive training and development programme",
  "Career progression opportunities",
  "Supportive team environment with 24/7 backup",
  "Pension scheme and holiday pay",
  "Uniform and equipment provided",
  "Mileage allowance for travel between clients",
];

const values = [
  { icon: Heart, title: "Compassion First", description: "We hire for heart. Skills can be taught, but genuine compassion is inherent." },
  { icon: Shield, title: "Professional Excellence", description: "Ongoing training ensures you deliver the highest standard of care." },
  { icon: Users, title: "Team Support", description: "You're never alone — our 24/7 team is always one call away." },
];

export default function Careers() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--purple-deep)] to-[var(--purple-primary)] py-16 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Join Our Caring Team</h1>
              <p className="text-lg text-white/80 mb-6">
                Make a real difference every day. Good Shepherd HomeCare Ltd is looking for compassionate, dedicated individuals to join our growing team across Glasgow and East Dunbartonshire.
              </p>
              <a href="mailto:hr@goodshepherdhomecare.co.uk">
                <Button size="lg" className="bg-[var(--gold-primary)] hover:bg-[var(--gold-dark)] text-[var(--purple-deep)] font-bold gap-2">
                  <Mail className="w-5 h-5" /> Apply Now
                </Button>
              </a>
            </div>
            <div className="hidden lg:block">
              <img src={TEAM_IMAGE} alt="Our Care Team" className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-[var(--purple-primary)] text-center mb-12">Why Join Good Shepherd HomeCare Ltd?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6 bg-white rounded-xl border border-border shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[var(--purple-lightest)] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-[var(--purple-primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[var(--purple-lightest)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--purple-primary)] mb-6">Benefits & Perks</h2>
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={TRAINING_IMAGE} alt="Training at Good Shepherd" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[var(--purple-primary)] mb-6">How to Apply</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We are always looking for compassionate individuals to join our team. Whether you are an experienced carer or looking to start a career in care, we would love to hear from you. Send your CV and a brief cover letter to our HR team.
          </p>
          <div className="bg-white rounded-xl border border-border shadow-sm p-8 inline-block">
            <div className="flex items-center gap-3 justify-center mb-4">
              <Mail className="w-6 h-6 text-[var(--purple-primary)]" />
              <a href="mailto:hr@goodshepherdhomecare.co.uk" className="text-xl font-semibold text-[var(--purple-primary)] hover:underline">
                hr@goodshepherdhomecare.co.uk
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Send your CV and cover letter. We aim to respond within 5 working days.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Good Shepherd HomeCare Ltd is an equal opportunities employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[var(--purple-deep)] to-[var(--purple-primary)] py-12">
        <div className="container text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Make a Difference?</h3>
          <a href="mailto:hr@goodshepherdhomecare.co.uk">
            <Button size="lg" className="bg-[var(--gold-primary)] hover:bg-[var(--gold-dark)] text-[var(--purple-deep)] font-bold gap-2">
              Send Your Application <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
