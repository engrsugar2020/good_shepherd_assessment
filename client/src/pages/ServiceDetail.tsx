import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";

const serviceData: Record<string, { title: string; description: string; image: string; features: string[]; longDescription: string }> = {
  "dementia-care": {
    title: "Dementia Care",
    image: "/manus-storage/dementia_care_02fe9ada.png",
    description: "Person-centred dementia care focused on dignity, routine, and cognitive stimulation in a familiar environment.",
    longDescription: "Navigating memory loss is a journey that requires patience, understanding, and specialised support. At Good Shepherd HomeCare Ltd, our Dementia Care services are built around the individual, focusing on dignity and maintaining a familiar, safe environment. Our caregivers undergo mandatory monthly workshops, including specialised training with Dementia UK, to ensure they provide the highest standard of person-centred care.",
    features: [
      "Specialist-trained carers with Dementia UK certification",
      "Person-centred care plans adapted to individual needs",
      "Cognitive stimulation activities and routines",
      "Familiar environment maintenance",
      "Family support and communication",
      "24/7 emergency support available",
      "Regular care plan reviews and updates",
      "Medication management and reminders",
    ],
  },
  "respite-care": {
    title: "Respite Care",
    image: "/manus-storage/respite_care_39d20f5c.png",
    description: "Giving family caregivers the break they deserve while ensuring your loved one remains safe and happy.",
    longDescription: "Being a family caregiver is an act of profound love, but it can also be overwhelming. We understand that you need a break to recharge, and that is exactly what our Respite Care services are designed for. Whether you need a few days to rest or a few weeks to handle personal matters, Good Shepherd HomeCare Ltd is here to step in with the same level of compassion and professionalism your loved one deserves.",
    features: [
      "Flexible scheduling — hours, days, or weeks",
      "Seamless transition with detailed handover",
      "Consistent carer assignment where possible",
      "Full care plan continuation",
      "Regular updates to family members",
      "Emergency cover available at short notice",
      "Personalised activity planning",
      "Medication and health monitoring",
    ],
  },
  "companionship": {
    title: "Companionship",
    image: "/manus-storage/companionship_care_23d4f34f.png",
    description: "Genuine friendship and social connection that makes every day brighter and combats loneliness.",
    longDescription: "Care is so much more than just physical support. It is about connection, laughter, and shared moments that make life rich. At Good Shepherd HomeCare Ltd, our companionship service brings genuine friendship into the homes of those who need it most. Whether it is a chat over tea, looking through old photographs, or simply having someone to listen — our caregivers provide the social connection that makes every day brighter.",
    features: [
      "Meaningful conversation and emotional support",
      "Accompanied outings and social activities",
      "Help with hobbies and interests",
      "Light meal preparation and tea companionship",
      "Accompanied walks in local parks",
      "Support with correspondence and phone calls",
      "Memory sharing and life story work",
      "Connection to community resources",
    ],
  },
  "live-in-care": {
    title: "Live-In Care",
    image: "/manus-storage/park_walk_687bf40e.png",
    description: "24/7 dedicated support in the comfort of home, providing round-the-clock peace of mind.",
    longDescription: "For those who need continuous support, our live-in care service provides a dedicated carer who lives in your home, offering round-the-clock assistance while maintaining your independence and dignity. This is an alternative to residential care that allows you to stay in the place you know and love, surrounded by your own belongings and memories.",
    features: [
      "Dedicated live-in carer matched to your needs",
      "24/7 support and companionship",
      "Full personal care assistance",
      "Meal planning and preparation",
      "Medication management",
      "Household support and light housekeeping",
      "Accompanied appointments and outings",
      "Regular carer rotation for consistency",
    ],
  },
  "post-hospital-recovery": {
    title: "Post-Hospital Recovery",
    image: "/manus-storage/day_in_the_life_b3b6b710.png",
    description: "Expert support to help you recover safely at home after a hospital stay or surgery.",
    longDescription: "Coming home after a hospital stay can be daunting. Our post-hospital recovery service ensures you have the support you need to recover safely and comfortably in your own home. We prioritise hospital discharges and can often arrange care within 24 hours, working closely with NHS discharge teams to ensure a smooth transition.",
    features: [
      "Rapid response — care within 24 hours if needed",
      "NHS discharge team coordination",
      "Mobility support and fall prevention",
      "Medication management and monitoring",
      "Wound care support",
      "Nutritional support and meal preparation",
      "Physiotherapy exercise assistance",
      "Progress monitoring and GP liaison",
    ],
  },
  "complex-clinical-care": {
    title: "Complex Clinical Care",
    image: "/manus-storage/why_i_care_reel_96a8380a.png",
    description: "Specialist nursing-level care delivered with compassion for complex health conditions.",
    longDescription: "For individuals with complex health conditions requiring clinical expertise, our specialist care team delivers nursing-level support in the comfort of home. Our clinically trained carers work alongside healthcare professionals to provide safe, effective care for conditions that require specialist knowledge and skills.",
    features: [
      "Clinically trained specialist carers",
      "PEG feeding and stoma care",
      "Ventilator and tracheostomy support",
      "Catheter and continence management",
      "Complex medication administration",
      "Coordination with healthcare professionals",
      "Detailed clinical record keeping",
      "Regular clinical supervision and training",
    ],
  },
};

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const service = serviceData[params.slug || ""];

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button>View All Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--purple-deep)]/90 to-[var(--purple-primary)]/80 z-10"></div>
        <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="container relative z-20 py-20 lg:py-28 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-lg text-white/90 max-w-2xl">{service.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[var(--purple-primary)] mb-6">About This Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{service.longDescription}</p>

              <h3 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 p-3 bg-[var(--purple-lightest)] rounded-lg">
                    <CheckCircle className="w-5 h-5 text-[var(--gold-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div>
              <div className="sticky top-24 bg-white rounded-xl border border-border shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[var(--purple-primary)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Get Started Today
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Request a free, no-obligation care assessment to discuss your needs.
                </p>
                <Link href="/assessment">
                  <Button className="w-full bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white font-semibold gap-2 mb-3">
                    Free Assessment <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+447815493302" className="block">
                  <Button variant="outline" className="w-full border-[var(--purple-primary)] text-[var(--purple-primary)] gap-2">
                    <Phone className="w-4 h-4" /> 07815 493302
                  </Button>
                </a>
                <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
                  <p>✓ Care Inspectorate Registered</p>
                  <p>✓ Rated 4.8/5 on Homecare.co.uk</p>
                  <p>✓ Response within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
