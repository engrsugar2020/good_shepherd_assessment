import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Phone } from "lucide-react";

const faqs = [
  {
    question: "How quickly can care start?",
    answer: "In urgent situations, we can often arrange an assessment within 24 hours and have a care plan active by the following day. We prioritise hospital discharges and sudden changes in health status to ensure safety at home. For non-urgent enquiries, we typically complete the assessment within 3-5 working days and can begin care shortly after.",
  },
  {
    question: "Do you provide 24/7 support?",
    answer: "Yes. We provide around-the-clock live-in care and nocturnal support. Our Glasgow-based hub is staffed 24 hours a day, ensuring a professional is always available to handle emergencies or provide peace of mind. Whether it's a 3am concern or a weekend question, our team is here for you.",
  },
  {
    question: "How are carers vetted?",
    answer: "All our carers undergo a rigorous enhanced PVG (Protecting Vulnerable Groups) check through Disclosure Scotland, provide verified professional references, and complete our intensive proprietary training programme. We also conduct face-to-face assessments with practical care simulations, triple reference checks from past employers and character witnesses, and require mandatory monthly training workshops. Only 4% of applicants meet the Good Shepherd standard.",
  },
  {
    question: "What areas do you cover?",
    answer: "We provide home care services across Glasgow, East Dunbartonshire, Partick, Bearsden and Milngavie. Our local teams understand the communities they serve, from the historic streets of Partick to the leafy suburbs of East Dunbartonshire.",
  },
  {
    question: "How much does home care cost?",
    answer: "Every care package is tailored to individual needs, so costs vary depending on the type and frequency of care required. We provide transparent, no-obligation cost breakdowns during your free care assessment. There are no hidden fees, and we'll help you understand any funding options that may be available to you.",
  },
  {
    question: "Can I choose my carer?",
    answer: "Absolutely. We believe the relationship between carer and client is fundamental to great care. We carefully match carers based on personality, interests, and specific care needs. If for any reason the match isn't right, we'll find an alternative — no questions asked.",
  },
  {
    question: "Are you registered with the Care Inspectorate?",
    answer: "Yes, Good Shepherd Home Care is fully registered with the Care Inspectorate, Scotland's independent regulator for care services. We maintain the highest standards of compliance and welcome regular inspections as an opportunity to demonstrate our commitment to excellence.",
  },
  {
    question: "What happens during a care assessment?",
    answer: "A free care assessment is simply a friendly, no-obligation conversation. Our Senior Care Coordinator will visit you at home (or arrange a phone call if preferred) to understand your situation, discuss your needs, and explain how we can help. There's absolutely no pressure — it's about giving you the information you need to make the right decision for your family.",
  },
  {
    question: "Do you provide specialist dementia care?",
    answer: "Yes, we provide person-centred dementia care delivered by caregivers who undergo specialist training with Dementia UK. Our approach focuses on maintaining dignity, establishing comforting routines, and providing cognitive stimulation in the familiar environment of home. We work closely with families to create care plans that adapt as needs change.",
  },
  {
    question: "What if I need to change or cancel my care?",
    answer: "We understand that circumstances change. You can adjust your care package at any time — whether that means increasing support, reducing visits, or pausing care temporarily. We ask for reasonable notice where possible, but we'll always work with you to find a solution that fits your situation.",
  },
];

export default function FAQ() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--purple-deep)] to-[var(--purple-primary)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We believe in complete transparency. If you have a question not listed here, please call our support line.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl border border-border shadow-sm px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-[var(--purple-primary)] py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions */}
          <div className="mt-12 text-center bg-[var(--purple-lightest)] rounded-xl p-8">
            <h3 className="text-xl font-semibold text-[var(--purple-primary)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is always happy to help. Call us or request a free care assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+447815493302">
                <Button variant="outline" className="border-[var(--purple-primary)] text-[var(--purple-primary)] gap-2">
                  <Phone className="w-4 h-4" /> Call 07815 493302
                </Button>
              </a>
              <Link href="/assessment">
                <Button className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white gap-2">
                  Free Assessment <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
