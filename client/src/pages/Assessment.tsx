import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, ArrowLeft, Phone, Shield } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const locations = ["Glasgow City", "East Dunbartonshire", "Partick & West End", "Bearsden & Milngavie", "Other Location"];
const careTypes = ["Dementia Care", "Respite Care", "Companionship", "Live-In Care", "Post-Hospital Recovery", "Complex Clinical Care"];
const urgencyOptions = ["Urgent (within 48 hours)", "This week", "Within 2 weeks", "Just exploring options"];
const contactTimes = ["Morning (9am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)", "Anytime"];

export default function Assessment() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    relationship: "",
    location: "",
    careType: "",
    urgency: "",
    additionalDetails: "",
    preferredContactTime: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitMutation = trpc.assessment.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.phone && !/^[\d\s+()-]{7,}$/.test(formData.phone)) newErrors.phone = "Please enter a valid phone number";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.location) newErrors.location = "Please select a location";
    if (!formData.careType) newErrors.careType = "Please select a care type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = () => {
    submitMutation.mutate(formData);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="container max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--purple-primary)] mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-6">
            Your care assessment request has been submitted successfully. Our Senior Care Coordinator will contact you within 2 hours during office hours.
          </p>
          <div className="bg-[var(--purple-lightest)] rounded-lg p-4 mb-6">
            <p className="text-sm text-[var(--purple-primary)] font-medium">
              Need immediate assistance? Call us directly:
            </p>
            <a href="tel:+447815493302" className="text-lg font-bold text-[var(--purple-primary)] flex items-center justify-center gap-2 mt-1">
              <Phone className="w-5 h-5" /> 07815 493302
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--purple-primary)] mb-3">
            Free Care Assessment
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No obligation. No pressure. Just a friendly conversation to understand your family's needs.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                s <= step
                  ? "bg-[var(--purple-primary)] text-white"
                  : "bg-muted text-muted-foreground"
              }`}>
                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 sm:w-24 h-1 mx-2 rounded transition-all ${
                  s < step ? "bg-[var(--purple-primary)]" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-8">
          <div className="text-sm text-muted-foreground">
            Step {step} of 3: {step === 1 ? "Your Details" : step === 2 ? "Care Needs" : "Review & Submit"}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-border p-6 sm:p-8">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Your Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Jean Smith"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)] ${errors.fullName ? "border-red-400" : "border-input"}`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07xxx xxxxxx"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)] ${errors.phone ? "border-red-400" : "border-input"}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)] ${errors.email ? "border-red-400" : "border-input"}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your Relationship to Client</label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-4 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)]"
                  >
                    <option value="">Select...</option>
                    <option value="Self">I need care for myself</option>
                    <option value="Son/Daughter">Son/Daughter</option>
                    <option value="Spouse/Partner">Spouse/Partner</option>
                    <option value="Other Family">Other Family Member</option>
                    <option value="Professional">Healthcare Professional</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Care Needs */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Care Needs</h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Where is care needed? *</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {locations.map((loc) => (
                    <label
                      key={loc}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.location === loc
                          ? "border-[var(--purple-primary)] bg-[var(--purple-lightest)]"
                          : "border-input hover:border-[var(--purple-light)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="location"
                        value={loc}
                        checked={formData.location === loc}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="accent-[var(--purple-primary)]"
                      />
                      <span className="text-sm">{loc}</span>
                    </label>
                  ))}
                </div>
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Type of care needed? *</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {careTypes.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.careType === type
                          ? "border-[var(--purple-primary)] bg-[var(--purple-lightest)]"
                          : "border-input hover:border-[var(--purple-light)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="careType"
                        value={type}
                        checked={formData.careType === type}
                        onChange={(e) => setFormData({ ...formData, careType: e.target.value })}
                        className="accent-[var(--purple-primary)]"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.careType && <p className="text-xs text-red-500 mt-1">{errors.careType}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">How soon is care needed?</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)]"
                  >
                    <option value="">Select...</option>
                    {urgencyOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Preferred contact time</label>
                  <select
                    value={formData.preferredContactTime}
                    onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
                    className="w-full px-4 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)]"
                  >
                    <option value="">Select...</option>
                    {contactTimes.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Additional Details (Optional)</label>
                <textarea
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  placeholder="Tell us a little about your current situation..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple-primary)]/30 focus:border-[var(--purple-primary)] resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Review Your Details</h2>
              <div className="bg-[var(--purple-lightest)] rounded-lg p-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
                  <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                  {formData.email && <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{formData.email}</span></div>}
                  {formData.relationship && <div><span className="text-muted-foreground">Relationship:</span> <span className="font-medium">{formData.relationship}</span></div>}
                  <div><span className="text-muted-foreground">Location:</span> <span className="font-medium">{formData.location}</span></div>
                  <div><span className="text-muted-foreground">Care Type:</span> <span className="font-medium">{formData.careType}</span></div>
                  {formData.urgency && <div><span className="text-muted-foreground">Urgency:</span> <span className="font-medium">{formData.urgency}</span></div>}
                  {formData.preferredContactTime && <div><span className="text-muted-foreground">Contact Time:</span> <span className="font-medium">{formData.preferredContactTime}</span></div>}
                </div>
                {formData.additionalDetails && (
                  <div className="pt-3 border-t border-[var(--purple-lighter)] text-sm">
                    <span className="text-muted-foreground">Details:</span>
                    <p className="mt-1 font-medium">{formData.additionalDetails}</p>
                  </div>
                )}
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-green-800">Your data is safe with us</p>
                  <p className="text-green-700 mt-0.5">We are fully GDPR compliant. Your information will only be used to arrange your care assessment.</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="bg-[var(--gold-primary)] hover:bg-[var(--gold-dark)] text-[var(--purple-deep)] font-bold gap-2"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Assessment"}
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[var(--gold-primary)]" /> No obligation</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[var(--gold-primary)]" /> Response within 2 hours</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[var(--gold-primary)]" /> GDPR compliant</span>
        </div>
      </div>
    </div>
  );
}
