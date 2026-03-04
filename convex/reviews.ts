import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listApproved = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("reviews")
            .withIndex("by_status", (q) => q.eq("status", "approved"))
            .collect()
            .then((reviews) => reviews.sort((a, b) => b.submittedAt - a.submittedAt));
    },
});

export const listAll = query({
    handler: async (ctx) => {
        const reviews = await ctx.db.query("reviews").collect();
        return reviews.sort((a, b) => b.submittedAt - a.submittedAt);
    },
});

export const listByStatus = query({
    args: { status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("reviews")
            .withIndex("by_status", (q) => q.eq("status", args.status))
            .collect()
            .then((reviews) => reviews.sort((a, b) => b.submittedAt - a.submittedAt));
    },
});

export const submit = mutation({
    args: {
        customerName: v.string(),
        reviewText: v.string(),
        starRating: v.number(),
    },
    handler: async (ctx, args) => {
        if (args.starRating < 1 || args.starRating > 5) {
            throw new Error("Star rating must be between 1 and 5");
        }
        return await ctx.db.insert("reviews", {
            customerName: args.customerName,
            reviewText: args.reviewText,
            starRating: args.starRating,
            status: "pending",
            submittedAt: Date.now(),
        });
    },
});

export const approve = mutation({
    args: { id: v.id("reviews") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: "approved",
            reviewedAt: Date.now(),
        });
    },
});

export const reject = mutation({
    args: { id: v.id("reviews") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: "rejected",
            reviewedAt: Date.now(),
        });
    },
});

export const remove = mutation({
    args: { id: v.id("reviews") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const bulkApprove = mutation({
    args: { ids: v.array(v.id("reviews")) },
    handler: async (ctx, args) => {
        for (const id of args.ids) {
            await ctx.db.patch(id, { status: "approved", reviewedAt: Date.now() });
        }
    },
});

export const bulkDelete = mutation({
    args: { ids: v.array(v.id("reviews")) },
    handler: async (ctx, args) => {
        for (const id of args.ids) {
            await ctx.db.delete(id);
        }
    },
});

// Admin aliases
export const listAdmin = listAll;

export const updateStatus = mutation({
    args: {
        id: v.id("reviews"),
        status: v.union(v.literal("approved"), v.literal("rejected"), v.literal("pending")),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: args.status,
            reviewedAt: Date.now(),
        });
    },
});

