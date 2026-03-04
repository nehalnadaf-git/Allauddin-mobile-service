"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Check, X, Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import StarRating from "@/components/ui/StarRating";
import { toast } from "@/components/ui/Toast";

type StatusFilter = "all" | "pending" | "approved" | "rejected";

export default function ReviewsPage() {
    const reviews = useQuery(api.reviews.listAdmin);
    const updateReviewStatus = useMutation(api.reviews.updateStatus);
    const removeMutation = useMutation(api.reviews.remove);
    const logAction = useMutation(api.activityLog.log);

    const [filter, setFilter] = useState<StatusFilter>("all");
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const filtered = reviews?.filter((r: any) => filter === "all" || r.status === filter) || [];

    const pendingCount = reviews?.filter((r: any) => r.status === "pending").length || 0;
    const approvedCount = reviews?.filter((r: any) => r.status === "approved").length || 0;
    const rejectedCount = reviews?.filter((r: any) => r.status === "rejected").length || 0;

    const handleApprove = async (id: string) => {
        try {
            await updateReviewStatus({ id, status: "approved" });
            await logAction({ action: "Review Approved", details: `Review by ${reviews?.find((r: any) => r._id === id)?.customerName}` });
            toast("Review approved!", "success");
        } catch {
            toast("Failed to approve review", "error");
        }
    };

    const handleReject = async (id: string) => {
        try {
            await updateReviewStatus({ id, status: "rejected" });
            await logAction({ action: "Review Rejected", details: `Review by ${reviews?.find((r: any) => r._id === id)?.customerName}` });
            toast("Review rejected", "success");
        } catch {
            toast("Failed to reject review", "error");
        }
    };

    const handleDelete = async (id: string) => {
        await removeMutation({ id: id as any });
        await logAction({ action: "Review Deleted", details: `Review permanently deleted` });
        toast("Review deleted!", "success");
        setDeleteConfirm(null);
    };

    const statusColors: Record<string, string> = {
        pending: "bg-gold/10 text-gold",
        approved: "bg-success/10 text-success",
        rejected: "bg-error/10 text-error",
    };

    const tabs: { label: string; value: StatusFilter; count: number }[] = [
        { label: "All", value: "all", count: reviews?.length || 0 },
        { label: "Pending", value: "pending", count: pendingCount },
        { label: "Approved", value: "approved", count: approvedCount },
        { label: "Rejected", value: "rejected", count: rejectedCount },
    ];

    return (
        <div>
            <h1 className="font-poppins font-bold text-2xl text-deep-text mb-6">Reviews</h1>

            {/* Status Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setFilter(tab.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-poppins font-medium transition-all whitespace-nowrap ${filter === tab.value ? "bg-primary text-white" : "bg-white text-muted hover:bg-light-grey card-shadow"
                            }`}
                    >
                        {tab.label}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.value ? "bg-white/20" : "bg-light-grey"}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-3">
                {filtered.map((review: any) => (
                    <div key={review._id} className="bg-white rounded-xl card-shadow p-5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="font-poppins font-bold text-primary text-sm">
                                    {review.customerName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-dm font-medium text-sm text-deep-text">{review.customerName}</p>
                                    <span className={`text-[10px] font-poppins font-semibold px-2 py-0.5 rounded-full ${statusColors[review.status]}`}>
                                        {review.status}
                                    </span>
                                </div>
                                <StarRating rating={review.starRating} size={14} />
                                <p className="font-dm text-muted text-sm mt-2 leading-relaxed">&ldquo;{review.reviewText}&rdquo;</p>
                                <p className="text-xs text-muted/60 font-dm mt-2">
                                    {new Date(review.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-grey">
                            {review.status !== "approved" && (
                                <button onClick={() => handleApprove(review._id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success text-xs font-dm font-medium rounded-lg hover:bg-success/20 transition-colors">
                                    <Check size={14} /> Approve
                                </button>
                            )}
                            {review.status !== "rejected" && (
                                <button onClick={() => handleReject(review._id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold text-xs font-dm font-medium rounded-lg hover:bg-gold/20 transition-colors">
                                    <X size={14} /> Reject
                                </button>
                            )}
                            <div className="flex-1" />
                            <button onClick={() => setDeleteConfirm(review._id)} className="p-1.5 text-muted hover:text-error transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <p className="text-center py-12 text-muted font-dm text-sm">No reviews found</p>}
            </div>

            {/* Delete Confirm */}
            <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Review">
                <p className="font-dm text-sm text-deep-text mb-4">Permanently delete this review? This cannot be undone.</p>
                <div className="flex gap-3">
                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-light-grey text-deep-text font-poppins font-semibold rounded-xl text-sm">Cancel</button>
                    <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-error hover:bg-error/90 text-white font-poppins font-semibold rounded-xl text-sm">Delete</button>
                </div>
            </Modal>
        </div>
    );
}
