import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    // In production, this would call an API endpoint
    setSubscribed(true);
    toast.success("Thank you for subscribing!");
  };

  if (subscribed) {
    return (
      <section className="bg-[var(--purple-lightest)] py-12">
        <div className="container max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-[var(--purple-primary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              You're Subscribed!
            </h3>
          </div>
          <p className="text-muted-foreground">
            Thank you for subscribing to The Good Shepherd Home Care Ltd updates. You'll receive care tips, company news, and helpful resources.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--purple-lightest)] py-12">
      <div className="container max-w-2xl text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Mail className="w-6 h-6 text-[var(--purple-primary)]" />
          <h3 className="text-xl font-semibold text-[var(--purple-primary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Stay Connected
          </h3>
        </div>
        <p className="text-muted-foreground mb-6">
          Subscribe to receive care tips, company updates, and helpful resources from The Good Shepherd Home Care Ltd.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)]"
          />
          <Button type="submit" className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white font-semibold px-6">
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
