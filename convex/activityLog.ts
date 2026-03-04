import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const log = mutation({
    args: {
        action: v.string(),
        details: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("activityLog", {
            action: args.action,
            details: args.details,
            timestamp: Date.now(),
        });

        // Keep only last 100 entries
        const all = await ctx.db.query("activityLog").collect();
        if (all.length > 100) {
            const sorted = all.sort((a, b) => a.timestamp - b.timestamp);
            const toDelete = sorted.slice(0, all.length - 100);
            for (const entry of toDelete) {
                await ctx.db.delete(entry._id);
            }
        }
    },
});

export const getRecent = query({
    handler: async (ctx) => {
        const all = await ctx.db.query("activityLog").collect();
        return all.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
    },
});
