import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Quote } from "lucide-react";
import { trpc } from "@/lib/trpc";

const fallbackTestimonials = [
  { id: 1, clientName: "Mrs. Thompson", relationship: "Daughter", location: "Glasgow", rating: 5, content: "The care my mum receives is exceptional. It is more than just a service, it is friendship. The carers are always punctual, professional, and genuinely caring. Mum looks forward to their visits every day.", serviceType: "Companionship", createdAt: new Date().toISOString() },
  { id: 2, clientName: "Mr. Robertson", relationship: "Son", location: "East Dunbartonshire", rating: 5, content: "After Dad's stroke, we were terrified about bringing him home from hospital. The Good Shepherd Home Care Ltd made the transition seamless. Their post-hospital recovery service gave us confidence that Dad was safe and well cared for.", serviceType: "Post-Hospital Recovery", createdAt: new Date().toISOString() },
  { id: 3, clientName: "Mrs. Patel", relationship: "Self", location: "Bearsden", rating: 5, content: "I was hesitant about accepting help, but my carer has become like a friend. We go for walks in the park, do puzzles together, and she always brightens my day. I cannot recommend Good Shepherd enough.", serviceType: "Companionship", createdAt: new Date().toISOString() },
  { id: 4, clientName: "Mr. & Mrs. Campbell", relationship: "Family", location: "Partick", rating: 5, content: "The respite care service has been a lifeline for our family. Knowing Mum is in safe, caring hands while we take a break gives us the peace of mind we desperately needed. The carers are wonderful.", serviceType: "Respite Care", createdAt: new Date().toISOString() },
  { id: 5, clientName: "Mrs. Okonkwo", relationship: "Daughter", location: "Glasgow", rating: 5, content: "My mother has dementia and the specialist care she receives is outstanding. The carers are patient, kind, and truly understand how to support someone with memory loss. They treat her with such dignity.", serviceType: "Dementia Care", createdAt: new Date().toISOString() },
  { id: 6, clientName: "Mr. MacLeod", relationship: "Self", location: "Milngavie", rating: 4, content: "Excellent live-in care service. My carer is attentive without being intrusive, and I feel safe knowing someone is always there. The team at Good Shepherd are responsive and professional.", serviceType: "Live-In Care", createdAt: new Date().toISOString() },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-[var(--gold-primary)] text-[var(--gold-primary)]" : "text-muted"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { data: dbTestimonials } = trpc.testimonials.published.useQuery();
  const testimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--purple-deep)] to-[var(--purple-primary)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">What Our Clients Say</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Real stories from real families. Discover why families across Glasgow and East Dunbartonshire trust The Good Shepherd Home Care Ltd.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-[var(--gold-primary)] text-[var(--gold-primary)]" />
              ))}
            </div>
            <span className="text-white/90 font-medium">4.8/5 on Homecare.co.uk</span>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl border border-border shadow-sm p-6 flex flex-col">
                <Quote className="w-8 h-8 text-[var(--purple-lighter)] mb-3" />
                <p className="text-foreground leading-relaxed flex-1 text-sm italic">
                  "{testimonial.content}"
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <StarRating rating={testimonial.rating} />
                  <div className="mt-2">
                    <p className="font-semibold text-foreground text-sm">{testimonial.clientName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      {testimonial.relationship && <span>{testimonial.relationship}</span>}
                      {testimonial.location && <span>• {testimonial.location}</span>}
                    </div>
                    {testimonial.serviceType && (
                      <span className="inline-block mt-2 text-xs bg-[var(--purple-lightest)] text-[var(--purple-primary)] px-2 py-0.5 rounded">
                        {testimonial.serviceType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--purple-lightest)] py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-[var(--purple-primary)] mb-4">Experience the Good Shepherd Difference</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join the families who trust us with the care of their loved ones. Start with a free, no-obligation assessment.
          </p>
          <Link href="/assessment">
            <Button className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white font-semibold gap-2">
              Request Free Assessment <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
