import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Clock, CheckCircle, AlertCircle, Phone, Mail, MapPin, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: assessments, isLoading, refetch } = trpc.assessment.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const updateStatus = trpc.assessment.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-[var(--purple-primary)]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access the admin dashboard.</p>
          <a href={getLoginUrl()}>
            <Button className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white">
              Sign In
            </Button>
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You do not have admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  const filteredAssessments = assessments?.filter(
    (a) => statusFilter === "all" || a.status === statusFilter
  ) || [];

  const counts = {
    all: assessments?.length || 0,
    new: assessments?.filter((a) => a.status === "new").length || 0,
    contacted: assessments?.filter((a) => a.status === "contacted").length || 0,
    in_progress: assessments?.filter((a) => a.status === "in_progress").length || 0,
    completed: assessments?.filter((a) => a.status === "completed").length || 0,
  };

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--purple-primary)]">Care Assessments</h1>
            <p className="text-muted-foreground mt-1">Manage and track submitted care assessment requests</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{counts.new} new requests</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", count: counts.all, filter: "all" },
            { label: "New", count: counts.new, filter: "new" },
            { label: "Contacted", count: counts.contacted, filter: "contacted" },
            { label: "In Progress", count: counts.in_progress, filter: "in_progress" },
            { label: "Completed", count: counts.completed, filter: "completed" },
          ].map((stat) => (
            <button
              key={stat.filter}
              onClick={() => setStatusFilter(stat.filter)}
              className={`p-4 rounded-xl border text-center transition-all ${
                statusFilter === stat.filter
                  ? "border-[var(--purple-primary)] bg-[var(--purple-lightest)] shadow-sm"
                  : "border-border bg-white hover:border-[var(--purple-light)]"
              }`}
            >
              <div className="text-2xl font-bold text-[var(--purple-primary)]">{stat.count}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Assessments List */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading assessments...</div>
        ) : filteredAssessments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <Filter className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No assessments found for this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAssessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-xl border border-border shadow-sm p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{assessment.fullName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[assessment.status]}`}>
                        {statusLabels[assessment.status]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {assessment.phone}</span>
                      {assessment.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {assessment.email}</span>}
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {assessment.location}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs bg-[var(--purple-lightest)] text-[var(--purple-primary)] px-2 py-1 rounded">{assessment.careType}</span>
                      {assessment.urgency && <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">{assessment.urgency}</span>}
                    </div>
                    {assessment.additionalDetails && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{assessment.additionalDetails}</p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Submitted: {new Date(assessment.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["new", "contacted", "in_progress", "completed", "cancelled"].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus.mutate({ id: assessment.id, status: status as any })}
                        disabled={assessment.status === status}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          assessment.status === status
                            ? "bg-[var(--purple-primary)] text-white"
                            : "bg-muted text-muted-foreground hover:bg-[var(--purple-lightest)] hover:text-[var(--purple-primary)]"
                        }`}
                      >
                        {statusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
