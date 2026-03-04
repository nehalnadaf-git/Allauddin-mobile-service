import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    handler: async (ctx) => {
        const steps = await ctx.db.query("howItWorksSteps").collect();
        return steps.sort((a, b) => a.stepNumber - b.stepNumber);
    },
});

export const update = mutation({
    args: {
        id: v.id("howItWorksSteps"),
        iconName: v.optional(v.string()),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        const updates: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(fields)) {
            if (value !== undefined) updates[key] = value;
        }
        await ctx.db.patch(id, updates);
    },
});

export const seed = mutation({
    handler: async (ctx) => {
        const existing = await ctx.db.query("howItWorksSteps").first();
        if (existing) return;
        const steps = [
            { stepNumber: 1 as const, iconName: "MapPin", title: "Bring Your Phone", description: "Walk into our Hubli shop with your device. No appointment needed." },
            { stepNumber: 2 as const, iconName: "Wrench", title: "We Diagnose & Repair", description: "Our experts quickly diagnose the issue and fix it — most repairs done in under 60 minutes." },
            { stepNumber: 3 as const, iconName: "CheckCircle", title: "Collect Your Phone", description: "Pick up your fully repaired device. Backed by our 90-day warranty." },
        ];
        for (const step of steps) {
            await ctx.db.insert("howItWorksSteps", step);
        }
    },
});
